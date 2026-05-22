'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    ChevronLeft,
    Download,
    Printer,
    Truck,
    Mail,
    RefreshCw,
    ArrowUpRight,
    MoreVertical,
    XCircle,
    XCircleIcon,
    User,
    Delete
} from 'lucide-react'
import { format } from 'date-fns'
// import { toast } from '@/components/ui/use-toast'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog'
// import { StatusIndicator } from './status-indicator' // Your custom component
import { useToast } from '@/hooks/use-toast'
import { baseUrl } from '@/lib/features/cart/cartSlice'
import { imageViewer } from '@/app/system-admin/lib/imageViewer'
import { formatCurrency } from '@/util/currency'
XCircle
const sampleOrder = {
    id: 'ORD12345',
    createdAt: '2025-05-18T10:30:00Z',
    status: 'PROCESSING',
    paymentMethod: 'Credit Card',
    paymentStatus: 'PAID',
    customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+251912345678',
    },
    shippingAddress: {
        line1: '123 Main St',
        line2: 'Apt 4B',
        city: 'Addis Ababa',
        state: 'AA',
        postalCode: '1000',
        country: 'Ethiopia',
    },
    subtotal: 150.00,
    shippingCost: 10.00,
    tax: 15.00,
    total: 175.00,
    items: [
        {
            id: 'PROD001',
            product: {
                name: 'Wireless Headphones',
                images: ['https://example.com/images/headphones.jpg'],
            },
            quantity: 1,
            price: 100.00,
            discountPrice: 90.00,
        },
        {
            id: 'PROD002',
            product: {
                name: 'Smartwatch',
                images: ['https://example.com/images/smartwatch.jpg'],
            },
            quantity: 2,
            price: 50.00,
        },
    ],
}

export default function OrderDetailPage() {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [statusDialogOpen, setStatusDialogOpen] = useState(false)
    const [newStatus, setNewStatus] = useState('')
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const { toast } = useToast()
    console.log(order, 'orders of matter')
    // Fetch order data
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${baseUrl}/orders/get/${orderId}`)
                const data = await response.json()
                console.log(data, 'order data')
                setOrder(data.order)
                setNewStatus(data.order.status)
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to fetch order details',
                    variant: 'destructive'
                })
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [orderId])

    useEffect(() => {
        setOrder(sampleOrder);
        setLoading(false);
    }, []);


    const handleStatusUpdate = async () => {
        try {
            const response = await fetch(`${baseUrl}/orders/update/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            })

            if (response.ok) {
                setOrder({ ...order, status: newStatus })
                toast({
                    title: 'Success',
                    description: 'Order status updated successfully',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update order status',
                variant: 'destructive'
            })
        } finally {
            setStatusDialogOpen(false)
        }
    }

    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`${baseUrl}/orders/delete/${orderId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                window.history.back()
                toast({
                    title: 'Success',
                    description: 'Order Deleted successfully',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete order',
                variant: 'destructive'
            })
        } finally {
            setCancelDialogOpen(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>Order not found</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                </Button>

                <div className="flex items-center space-x-2">
                    {/* <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button> */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setStatusDialogOpen(true)}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setCancelDialogOpen(true)}
                                className="text-red-600"
                            >
                                <Delete className="h-4 w-4 mr-2" />
                                Delete Order
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Order ID</span>
                                    <span className="font-medium">{order.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Date</span>
                                    <span className="font-medium">
                                        {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <Badge variant={order.status.toLowerCase()}>
                                        {order.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Payment Method</span>
                                    <span className="font-medium">{order.paymentMethod}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Payment Status</span>
                                    <span className="font-medium">{order.paymentStatus}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-md overflow-hidden border">
                                            <img
                                                src={imageViewer(item.product.images[0]) || '/placeholder-product.png'}
                                                alt={item.product.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{item.product.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.quantity} × {formatCurrency(item.price)}
                                            </div>
                                            {item.discountPrice && (
                                                <div className="text-sm text-red-600">
                                                    Discount: {formatCurrency(item.price - item.discountPrice)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="font-medium">
                                            {formatCurrency(item.discountPrice || item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Totals and Customer Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="font-medium text-gray-800">{order.customer.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                    <a
                                        href={`mailto:${order.customer.email}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {order.customer.email}
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border">
                                <h3 className="font-medium text-sm text-gray-900">Shipping Address</h3>
                                <div className="text-sm text-gray-700 space-y-1">
                                    {order.shippingAddress?.kebele && (
                                        <div className="flex">
                                            <span className="w-24 text-gray-500">Kebele:</span>
                                            <span>{order.shippingAddress.kebele}</span>
                                        </div>
                                    )}
                                    {order.shippingAddress?.woreda && (
                                        <div className="flex">
                                            <span className="w-24 text-gray-500">Woreda:</span>
                                            <span>{order.shippingAddress.woreda}</span>
                                        </div>
                                    )}
                                    <div className="flex">
                                        <span className="w-24 text-gray-500">Town:</span>
                                        <span>{order.shippingAddress?.town}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-500">Region:</span>
                                        <span>{order.shippingAddress?.region}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="w-24 text-gray-500">Country:</span>
                                        <span>{order.shippingAddress?.country}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Totals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{formatCurrency(order.shippingCost)}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{formatCurrency(order.total)}</span>
                                </div>
                            </div>
                        </CardContent>
                        {/* <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                <Truck className="h-4 w-4 mr-2" />
                                Track Order
                            </Button>
                            <Button size="sm">
                                <ArrowUpRight className="h-4 w-4 mr-2" />
                                View Invoice
                            </Button>
                        </CardFooter> */}
                    </Card>
                </div>
            </div>

            {/* Status Update Dialog */}
            <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Order Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-2">
                                    {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                                        <Button
                                            key={status}
                                            variant={newStatus === status ? 'default' : 'outline'}
                                            onClick={() => setNewStatus(status)}
                                        >
                                            {/* <StatusIndicator status={status} className="mr-2" /> */}
                                            {status}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleStatusUpdate}>
                            Update Status
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Cancel Order Dialog */}
            <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will cancel the order and notify the customer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancelOrder}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Confirm Cancellation
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}