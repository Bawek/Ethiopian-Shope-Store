"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Loader, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import CustomDataTable from "@/components/ui/my-components/my-table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { imageViewer } from "../lib/imageViewer";
import { useGetAllShopsQuery, useUpdateByIdMutation } from "@/lib/features/shop/shop";
import { toast } from "react-toastify";

const ManageShops = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()
  const { data, isLoading, isError, error } = useGetAllShopsQuery()
  const [updateById, { isError: isUpdateError, error: updateError }] = useUpdateByIdMutation()
  useEffect(() => {
    if (data?.shops) {
      setShops(data.shops)
    }
  }, [data])
  // columns
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "logoUrl",
      header: "Shop Logo",
      cell: ({ row }) => {
        const logoUrl = row.original.logoUrl;
        return (
          <div className="w-10 h-10 rounded-md overflow-hidden border">
            <img
              src={imageViewer(logoUrl) || '/placeholder-product.png'}
              alt={'logo-url'}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.src = '/placeholder-product.png';
              }}
            />
          </div>);
      }

    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shop Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "merchant",
      header: () => <div className="text-right">Shop Owner</div>,
      cell: ({ row }) => {
        const merchant = row.original.merchant;

        return <div className="text-right font-medium">{merchant?.ownerName}</div>
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-right">Shop status</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">
          <Badge variant={row.getValue("status") === "Active" ? "default" : row.getValue("status") === "Inactive" ? "destructive" : "warning"}>
            {row.getValue("status")}
          </Badge>
        </div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const shop = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Shop Actions</DropdownMenuLabel>

              <DropdownMenuItem
                className="cursor-pointer hover:bg-amber-100"
                onClick={() => {
                  navigator.clipboard.writeText(shop.shopId);
                  toast({
                    title: "Copied",
                    description: <p className="text-black">{shop?.shopId}</p>,
                    variant: "default"
                  });
                }}
              >
                Copy Shop ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => openEditModal(shop)}
              >
                Edit Status
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/system-admin/manage-shops/${shop.id}`)}
              >
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        );
      },
    }
  ]
  // Open edit modal
  const openEditModal = (shop) => {
    setSelectedShop(shop);
    setIsEditing(true);
  };
  console.log(shops, 'shops here')
  // Save edited shop
  const saveShopChanges = async (shop) => {
    console.log('hello it comes', selectedShop, data)
    setIsSubmitting(true)
    try {
      const response = await updateById(selectedShop).unwrap()
      console.log(response, 'response')
      if (response.status !== 'success') {
        return toast.success(response.message)
      }
      setShops(shops.map(shop => (shop.id === selectedShop.id ? response.shop : shop)));
      setIsEditing(false);
    } catch (error) {
      console.log('update shop status error', error)
      toast.error('sorry something go wrong.Tray again.')
    }
    finally {
      setIsSubmitting(false)
    }
  };
  if (isLoading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    )
  }
  if (isError) {
    return (
      <div>
        <h1>sorry Something went wrong. we can not load the shops.</h1>
      </div>
    )
  }

  return (
    <div className="">
      {/* Edit Shop Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogTitle>Edit Shop Details</DialogTitle>
          {
            isUpdateError &&
            <DialogDescription>
              {updateError?.message}
            </DialogDescription>
          }
          {selectedShop && (
            <div className="space-y-3">
              <input
                type="text"
                value={selectedShop.name}
                disabled
                onChange={(e) => setSelectedShop({ ...selectedShop, name: e.target.value })}
                className="border p-2 w-full rounded dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                value={selectedShop?.merchant?.ownerName}
                disabled
                onChange={(e) => setSelectedShop({ ...selectedShop, owner: e.target.value })}
                className="border p-2 w-full rounded dark:bg-gray-800 dark:text-white"
              />
              <select
                value={selectedShop.status}
                onChange={(e) => setSelectedShop({ ...selectedShop, status: e.target.value })}
                className="border p-2 w-full rounded dark:bg-gray-800 dark:text-white"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="SUSPENDED">SUSPENDED</option>
              </select>
              <Button onClick={saveShopChanges} className="w-full dark:bg-gray-800 dark:text-white">
                {
                  isSubmitting &&
                  <Loader className="w-6 h-6 animate-spin" />
                }
                {
                  isSubmitting ? ' Saving' : 'Save changes'
                }
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl mx-auto font-semibold text-gray-800">Manage Shops</h1>
        </div>
        <CustomDataTable
          data={shops}
          columns={columns}
          searchColumen="name"
        />
      </div>
    </div>
  );
};

export default ManageShops;
