'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const contactSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    message: z.string().min(5, "Message must be at least 5 characters")
})

const ContactSection = () => {
    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: ""
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (values) => {
        try {
            setIsSubmitting(true);
            // Show loading toast
            // const loadingToast = toast.loading('Submitting form...');
            // Make API call
            const response = await axios.post('http://localhost:5000/api/contact', values);

            // Handle success
            if (response.data.success) {
                toast.success('Message sent successfully!');
                form.reset();
            } else {
                toast.error(`Submission failed Please try again.`);
            }
        } catch (error) {
            // Handle errors
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'An unexpected error occurred';

            toast.error(`Submission failed: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen">
            <div className="container px-4 mx-auto max-w-4xl">
                <h1 className="bg-EthioBack bg-clip-text text-transparent text-5xl md:text-6xl font-extrabold text-center p-4 tracking-tight">
                    You Can Reach Us By:
                </h1>
                <div className="p-8 md:p-12 container mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="md:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
                                <p className="text-muted-foreground text-lg">
                                    Feel free to use the form or drop us an email. Old-fashioned phone calls work too.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 mt-1 text-primary" />
                                    <div>
                                        <p className="text-lg font-medium">+251925334258</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 mt-1 text-primary" />
                                    <div>
                                        <p className="text-lg font-medium">info@ethiocomerce.com</p>
                                        <p className="text-muted-foreground">Typically replies within 24hrs</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 mt-1 text-primary" />
                                    <div>
                                        <p className="text-lg font-medium">Debremarkos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Full name" {...field} className="h-12 text-base" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="example@email.com" {...field} className="h-12 text-base" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone <span className="text-muted-foreground">(optional)</span></FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="xxx-xxx-xxxx" {...field} className="h-12 text-base" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Type your message..." {...field} className="min-h-[150px] text-base" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full text-base bg-EthioBack text-black hover:bg-orange-500"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection