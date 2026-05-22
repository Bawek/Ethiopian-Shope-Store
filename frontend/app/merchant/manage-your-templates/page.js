'use client'
import React from "react";
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import CustomDataTable from "@/components/ui/my-components/my-table";
import Loader from "@/app/components/Prompt/Loader";
import { Badge } from "@/components/ui/badge";
import { useChangeMerchantTemplateMutation, useGetMerchantTemplatesByAccountQuery } from "@/lib/features/merchantTemplates/buyedTemplateApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const MerchantTemplates = () => {
    const router = useRouter()
    const account = useSelector((state) => state.account)
    console.log(account.id, 'accountid')
    const { data, isLoading, isError, refetch } = useGetMerchantTemplatesByAccountQuery(account.id)
    const [changeMerchantTemplate, { isError: changeError, isSuccess: changeSuccess }] = useChangeMerchantTemplateMutation()
    const handleUseIt = async (id) => {
        try {
            await changeMerchantTemplate(id).unwrap()
            console.log(changeError, changeSuccess)
            if (changeError) {
                return toast.error("Sorry, something went wrong. Please try again.")
            }
            if (changeSuccess) {
                toast.success("Template changed Successfully. Starting from now Your shop use this template.")
                // after this make the useGetAllmerchanttempaltequery to refetch
                refetch()

            }

        } catch (error) {
            console.log(error)
            return toast.error("Sorry, something went wrong on the server. Please try again.")

        }
    }
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
            accessorKey: "id",
            header: "Template Id",
            cell: ({ row }) => (
                <div className="text-sm" >
                    {
                        row.getValue("id")

                    }
                </div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        // {
        //     accessorKey: "description",
        //     header: () => <div className="text-right">Description</div>,
        //     cell: ({ row }) => {
        //         // make only first 20 characters visible by using tail wind css on the div
        //         return <div className="text-right font-medium truncate">{row.getValue("description")}</div>
        //     },
        // },
        {
            accessorKey: "expiresAt",
            header: () => <div className="text-right">Expires At</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">{row.getValue("expiresAt")}</div>
            },
        },
        {
            accessorKey: "isInUse",
            header: "isInUse",
            cell: ({ row }) => {
                const status = row.getValue("isInUse") ? 'Yes' : "NO"
                return <Badge className={`capitalize ${row.getValue("isInUse") ? 'bg-green-700' : 'bg-orange-500'} `}>{status}</Badge>
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const template = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Template Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(template.id)
                                    return toast.success('Template id is Copied')
                                }}
                            >
                                Copy template Id
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleUseIt(template.id)}
                            >
                                Use It
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.push(`/site-builder/${template.id}`)}
                            >
                                Edit By tool
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        }

    ]
    if (isLoading) {
        return <div className="flex items-center justify-center">
            <Loader />
        </div>
    }
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-2xl font-semibold dark:text-white">Manage Your Template</h1>
            </div>
            <CustomDataTable
                data={data?.templates || []}
                columns={columns}
                searchColumen="name"
            />
        </div>
    );
};

export default MerchantTemplates;
