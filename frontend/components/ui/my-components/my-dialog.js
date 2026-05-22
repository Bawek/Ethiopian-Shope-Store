'use client'
import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from '../button'
import { Input } from '../input'
const CustomDialog = () => {
    const form = useForm()
    const isLoading = false
    const handleRegister = (data) => {

    }
    return (
        <Dialog>
            <DialogTrigger>
                <div className="items-center flex">
                    <span className="w-10 h-12 text-sm text-black capitalize bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full rounded-full align-middle border-none shadow-lg"
                            src="/img/team-1-800x800.jpg"
                        />
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle> Manage Profile</DialogTitle>
                <Tabs defaultValue='account'>
                    <TabsList className="w-full">
                        <TabsTrigger className="w-1/2" value="account">Account</TabsTrigger>
                        <TabsTrigger className="w-1/2" value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firestName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium">
                                                    First Name <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="John"
                                                        {...field}
                                                        className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500 text-sm" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium">
                                                    Last Name <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Doe"
                                                        {...field}
                                                        className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500 text-sm" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Email <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    {...field}
                                                    className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Password <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl transition-all hover:shadow-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="animate-pulse">Creating Account...</span>
                                    ) : (
                                        <>🚀 Get Started Now</>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="password">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">
                                                Password <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl transition-all hover:shadow-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="animate-pulse">Creating Account...</span>
                                    ) : (
                                        <>🚀 Get Started Now</>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
