"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { imageViewer } from "@/app/system-admin/lib/imageViewer";
import { Loader } from "lucide-react";

// Reusable Form Component
export function CustomForm({ fields, schema, onSubmit, file, setFile, data }) {
    const [updating, setUpdating] = useState(false)
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {}),
    });
    useEffect(() => {
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'previewImage') {
                    setFile(value)
                    console.log('file preview', file, value)
                }
                form.setValue(key, value);
            });
        }
    }, [data, form]);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                {/* Dynamically Render Fields */}
                {fields.map((field, index) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={field.name}
                        render={({ field: formField }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>{field.label}</FormLabel>
                                <FormControl>
                                    {/* Render the appropriate input type */}
                                    {field.type === "select" ? (
                                        <select {...formField} className="dark:bg-gray-900">
                                            {field.options?.map((option, idx) => (
                                                <option key={idx} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === "checkbox" ? (
                                        <input {...formField} type="checkbox" className="input-class" />
                                    )
                                        : field.type === 'file' ? (
                                            <div>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(event) => {
                                                        const file = event.target.files?.[0];
                                                        if (file) {
                                                            formField.onChange(file);
                                                            setFile(file);
                                                        }
                                                    }}
                                                />
                                                {
                                                    file ?
                                                        Array.isArray(file) ?
                                                            <img src={imageViewer(file[0])} alt="template" />
                                                            :
                                                            <img src={URL.createObjectURL(file || './computer.png')} alt="privew" />
                                                        :
                                                        ""
                                                }
                                            </div>
                                        )
                                            : (
                                                <Input
                                                    {...formField}
                                                    placeholder={field.placeholder || ""}
                                                    type={field.type || "text"}
                                                    className='dark:bg-gray-900'
                                                />
                                            )}
                                </FormControl>
                                {field.description && (
                                    <FormDescription>{field.description}</FormDescription>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                {/* Submit Button with loading */}
                <Button type="submit"    
                className={`w-full bg-orange-700 flex gap-2 items-center hover:bg-orange-300  ${form.formState.isSubmitting ? "":""} `}>
                   {
                    form.formState.isSubmitting &&
                    <Loader className="w-6 h-6 animate-spin" />
                   }
                   {
                    form.formState.isSubmitting ? 
                    "Submitting" :
                    'Submit'
                   }
                </Button>
            </form>
        </Form>
    );
}
