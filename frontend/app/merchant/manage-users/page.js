'use client'
import { useState, useEffect } from 'react';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDelete } from '@/hooks/use-delete';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import CustomDataTable from '@/components/ui/my-components/my-table';

const sampleUsers = [
    {
        id: "user_001",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "admin",
        createdAt: "2023-05-15T09:32:00Z",
        status: "active"
    },
    {
        id: "user_002",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        role: "user",
        createdAt: "2023-06-20T14:15:00Z",
        status: "active"
    },
    {
        id: "user_003",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        firstName: "Robert",
        lastName: "Johnson",
        email: "robert.j@example.com",
        role: "moderator",
        createdAt: "2023-07-10T11:05:00Z",
        status: "active"
    },
    {
        id: "user_004",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        firstName: "Emily",
        lastName: "Williams",
        email: "emily.w@example.com",
        role: "user",
        createdAt: "2023-08-05T16:45:00Z",
        status: "pending"
    },
    {
        id: "user_005",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.b@example.com",
        role: "user",
        createdAt: "2023-09-12T10:20:00Z",
        status: "inactive"
    },
    {
        id: "user_006",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        firstName: "Sarah",
        lastName: "Davis",
        email: "sarah.d@example.com",
        role: "user",
        createdAt: "2023-10-18T13:10:00Z",
        status: "suspended"
    },
    {
        id: "user_007",
        avatar: "https://randomuser.me/api/portraits/men/82.jpg",
        firstName: "David",
        lastName: "Miller",
        email: "david.m@example.com",
        role: "moderator",
        createdAt: "2023-11-22T08:30:00Z",
        status: "active"
    },
    {
        id: "user_008",
        avatar: "https://randomuser.me/api/portraits/women/19.jpg",
        firstName: "Jessica",
        lastName: "Wilson",
        email: "jessica.w@example.com",
        role: "user",
        createdAt: "2023-12-05T15:55:00Z",
        status: "pending"
    }
];

const MerchantManageUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { deleteItem } = useDelete
    const handleDelete = async (id) => {
        try {
            deleteItem({
                endpoint: `/api/inventory/${id}`, // Adjust the endpoint as needed
                itemId: id,
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setInventory((prev) => prev.filter((item) => item.id !== id));
                    toast.success('Order deleted successfully!'); // Show success message
                },
                onError: (error) => {
                    console.error('Error deleting order:', error);
                    toast.error('Error deleting the order.'); // Show error message
                },
            })
            // Update the inventory state after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Error deleting the order.'); // Show error message
        }
    };
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
                    className="translate-y-[2px]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[2px]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "avatar",
            header: "Avatar",
            cell: ({ row }) => {
                const avatarUrl = row.getValue("avatar") || '/placeholder-user.jpg';
                return (
                    <div className="w-10 h-10 rounded-full overflow-hidden border">
                        <img
                            src={avatarUrl}
                            alt="User"
                            className="object-cover w-full h-full"
                            onError={(e) => {
                                e.target.src = '/placeholder-user.jpg';
                            }}
                        />
                    </div>
                );
            },
            enableSorting: false,
        },
        {
            accessorKey: "firstName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-0 hover:bg-transparent"
                    >
                        First Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="font-medium">
                    {row.getValue("firstName")}
                </div>
            ),
        },
        {
            accessorKey: "lastName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="px-0 hover:bg-transparent"
                    >
                        Last Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="font-medium">
                    {row.getValue("lastName")}
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {row.getValue("email")}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Registered",
            cell: ({ row }) => {
                const date = new Date(row.getValue("createdAt"));
                const formatted = date.toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                return <div className="text-sm">{formatted}</div>;
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original;
                const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={() => {
                                    navigator.clipboard.writeText(user.id);
                                    toast.success('User ID copied to clipboard!');
                                }}
                            >
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-600 cursor-pointer focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                                onClick={(e) => handleDelete(user.id)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete {user.firstName} {user.lastName}? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenu>
                );
            },
        }
    ];
    return (
        <div className="min-h-screen pt-0 mt-0">
            <main className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Manage Users</h1>
                {/* Inventory Table */}
                <div className="relative">

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                        </div>
                    ) : (
                        <CustomDataTable
                            data={sampleUsers}
                            columns={columns}
                            searchColumen={"firstName"}
                        />
                    )}
                </div>
            </main>
        </div>
    )
}

export default MerchantManageUser
