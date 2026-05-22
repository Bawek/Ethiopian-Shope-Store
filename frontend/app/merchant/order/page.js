"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllOrdersQuery, useUpdateOrderMutation, useCancelOrderMutation, useUpdateOrderStatusMutation, useDeleteOrderMutation } from '@/lib/features/orders/ordersApi';
// import { Checkbox, Badge, Button } from '@/components/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MoreHorizontal, Eye, RefreshCw, FileText, XCircle } from 'lucide-react';
import CustomDataTable from "@/components/ui/my-components/my-table";
import CardBarChart from "@/app/components/Cards/CardBarChart";
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
const ORDER_STATUS_CONFIG = {
  PENDING: { color: "bg-amber-100 text-amber-800", label: "Pending", actions: ['PROCESSING', 'CANCELLED'] },
  PROCESSING: { color: "bg-blue-100 text-blue-800", label: "Processing", actions: ['SHIPPED', 'CANCELLED'] },
  SHIPPED: { color: "bg-purple-100 text-purple-800", label: "Shipped", actions: ['DELIVERED'] },
  DELIVERED: { color: "bg-green-100 text-green-800", label: "Delivered", actions: [] },
  CANCELLED: { color: "bg-red-100 text-red-800", label: "Cancelled", actions: [] },
};

const OrdersPage = () => {
  const router = useRouter();
  const { data: ordersData, isLoading, isError, refetch } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const { toast } = useToast()
  const [dialogState, setDialogState] = useState({
    open: false,
    orderId: null,
    actionType: null,
    newStatus: null
  });

  const handleDialogOpen = (orderId, actionType, newStatus = null) => {
    setDialogState({
      open: true,
      orderId,
      actionType,
      newStatus
    });
  };

  const handleDialogClose = () => {
    setDialogState({
      open: false,
      orderId: null,
      actionType: null,
      newStatus: null
    });
  };

  const handleStatusUpdate = async () => {
    if (!dialogState.newStatus) return;

    try {
      await updateOrderStatus({
        id: dialogState.orderId,
        status: dialogState.newStatus
      }).unwrap();

      toast({
        title: 'Success',
        description: `Order status updated to ${dialogState.newStatus}`,
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive'
      });
    } finally {
      handleDialogClose();
    }
  };

  const handleCancelOrder = async () => {
    try {
      await deleteOrder(dialogState.orderId).unwrap();

      toast({
        title: 'Success',
        description: 'Order cancelled successfully',
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel order',
        variant: 'destructive'
      });
    } finally {
      handleDialogClose();
    }
  };

  const handleActionConfirm = () => {
    if (!dialogState.orderId || !dialogState.actionType) return;

    if (dialogState.actionType === 'status') {
      handleStatusUpdate();
    } else if (dialogState.actionType === 'cancel') {
      handleCancelOrder();
    }
  };

  const orderColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all orders"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select order"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "items",
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.original.items || [];
        return (
          <div className="flex items-center gap-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <img
                  src={item?.product?.images?.[0] ? imageViewer(item.product.images[0]) : '/placeholder.png'}
                  alt={item?.product?.name || 'Product image'}
                  className="w-8 h-8 rounded"
                />
                <span className="text-sm font-medium">{item?.product?.name || 'Unknown Product'}</span>
                <span className="text-sm text-gray-500">x{item?.quantity || 0}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusInfo = ORDER_STATUS_CONFIG[status] || { color: 'bg-gray-100', label: status };
        return (
          <Badge className={`${statusInfo.color} rounded-full px-2.5 py-0.5 text-xs`}>
            {statusInfo.label}
          </Badge>
        );
      },
      filterFn: (row, status, value) => {
        return value.includes(row.getValue(status));
      },
    },
    {
      accessorKey: "createdAt",
      header: "Order Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="text-sm">
            {date.toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        const statusInfo = ORDER_STATUS_CONFIG[order.status] || {};

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/merchant/order/${order.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDialogOpen(order.id, 'status')}
                disabled={!statusInfo.actions || statusInfo.actions.length === 0}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Update Status
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDialogOpen(order.id, 'cancel')}
                disabled={!statusInfo.actions?.includes('CANCELLED')}
                className="text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen">Error loading orders.</div>;
  }

  return (
    <div className="flex flex-col flex-wrap">
      <CustomDataTable
        data={ordersData?.orders || []}
        columns={orderColumns}
        searchColumn="createdAt"
      />

      <div className="w-full xl:w-4/12 px-4">
        <CardBarChart data={ordersData?.performance || {
          labels: [],
          datasets: []
        }} />
      </div>

      {/* Status Update Dialog */}
      <AlertDialog open={dialogState.open && dialogState.actionType === 'status'} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Order Status</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                  <Button
                    key={status}
                    variant={dialogState.newStatus === status ? 'default' : 'outline'}
                    onClick={() => setDialogState(prev => ({ ...prev, newStatus: status }))}
                  >
                    {ORDER_STATUS_CONFIG[status]?.label || status}
                  </Button>
                ))}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleActionConfirm}
              disabled={!dialogState.newStatus}
            >
              Update Status
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Order Dialog */}
      <AlertDialog open={dialogState.open && dialogState.actionType === 'cancel'} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Order Cancellation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel order #{dialogState.orderId}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleActionConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirm Cancellation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrdersPage;