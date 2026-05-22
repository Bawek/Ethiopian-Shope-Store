"use client";

import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRegisterMerchantMutation } from "@/lib/features/merchant/registrationApi";
import { useRegisterLocationMutation } from "@/lib/features/location/locationapi";
import { useSelector } from "react-redux";
import ShopRegistration from "./prompt2";

const REGIONS = [
    "Addis Ababa", "Afar", "Amhara", "Benishangul-Gumuz", "Dire Dawa",
    "Gambela", "Harari", "Oromia", "Sidama", "Somali", "South West Ethiopia",
    "Southern Nations, Nationalities, and Peoples' Region (SNNPR)", "Tigray"
];

const BUSINESS_CATEGORIES = [
    "Books",
    "Clothing",
    "Cosmetics",
    "Electronics",
    "Food & Beverage",
    "Shoes"
];
const phoneSchema = z.string().regex(/\+2519\d{8}/, "Invalid Ethiopian phone number");
const cbeAccountSchema = z.string().regex(/^1000\d{9}$/, "CBE account must start with 1000");

const baseSchema = z.object({
    id: z.string().optional(),
    businessName: z.string().min(2),
    businessPhone: phoneSchema,
    businessEmail: z.string().email(),
    businessType: z.string().min(1),
    ownerName: z.string().min(2),
    cbeAccountNo: cbeAccountSchema,
});

const createSchema = baseSchema.extend({
    identityCard: z.instanceof(File, { message: "ID required" })
        .refine(file => file.size <= 5_000_000, "File must be under 5MB"),
    town: z.string().min(2),
    woreda: z.string().min(1),
    region: z.enum(REGIONS),
    kebele: z.string().min(1),
});

export default function MerchantFullRegistration({ existingData, onSuccess, mStatus }) {
    const { toast } = useToast();
    const [editMode, setEditMode] = useState(false);
    const accountId = useSelector(state => state.account.id);
    const [registerMerchant] = useRegisterMerchantMutation();
    const [registerLocation] = useRegisterLocationMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formSchema = useMemo(() => existingData ? baseSchema : createSchema, [existingData]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: existingData || {
            businessName: "", businessPhone: "", businessEmail: "", businessType: "",
            ownerName: "", town: "", woreda: "", region: undefined, kebele: "", cbeAccountNo: ""
        }
    });

    useEffect(() => {
        if (existingData) form.reset(existingData);
    }, [existingData]);

    const handleSubmit = async values => {
        try {
            setIsSubmitting(true)
            const formData = new FormData();
            let locationId = "";

            if (!existingData) {
                const locationRes = await registerLocation(values).unwrap();
                if (locationRes.status !== "success") throw new Error("Location failed");
                locationId = locationRes.location?.id;
                formData.append("locationId", locationId);
            }

            Object.entries(values).forEach(([k, v]) => {
                if (v instanceof File) formData.append(k, v);
                else if (v) formData.append(k, String(v));
            });

            formData.append("mode", existingData ? "update" : "register");
            formData.append("accountId", accountId);

            const response = await registerMerchant(formData).unwrap();
            if (response.status !== "success") throw new Error("Merchant failed");

            toast({
                title: existingData ? "Update Successful" : "Registration Successful",
                description: existingData
                    ? "The information has been successfully updated."
                    : "You have been successfully registered.",
                variant: "success",
                duration: 5000,
            });
            if (!existingData) form.reset();
            onSuccess?.();

        } catch (err) {
            console.log(err)
            toast({ title: "Error", description: err.message || "Failed", variant: "destructive" });
        }
        finally {
            setIsSubmitting(false)
        }
    };

    const renderField = (name, label, renderControl, required = true) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}{required && <span className="text-red-500">*</span>}</FormLabel>
                    <FormControl>{renderControl(field)}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    return (
        <div className="w-full min-h-screen p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {existingData ? "Edit Merchant" : "New Merchant Registration"}
                </h1>
                {existingData && (
                    <div className="flex items-center space-x-2">
                        <label>Edit Mode</label>
                        <Switch
                            checked={editMode}
                            onCheckedChange={checked => {
                                if (mStatus !== "PENDING") {
                                    setEditMode(checked);
                                    if (!checked) form.reset(existingData);
                                }
                            }}
                        />
                    </div>
                )}
            </div>

            <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">Business Info</TabsTrigger>
                    <TabsTrigger value="shopInfo" disabled={mStatus !== "ACTIVE"}>Shop Info</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    {mStatus === "PENDING" ? (
                        <div className="bg-orange-100 border-b border-orange-400 text-orange-700 text-center p-4">
                            🚨 Thank you for your registration. We will inform you within 12 hours.
                        </div>
                    ) : (
                        <Card className="mt-6 p-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                    {renderField("businessName", "Business Name", field => (
                                        <Input {...field} disabled={!!existingData && !editMode} />
                                    ))}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {renderField("businessPhone", "Phone", field => (
                                            <Input {...field} disabled={!!existingData && !editMode} placeholder="+251900000000" />
                                        ))}
                                        {renderField("businessEmail", "Email", field => (
                                            <Input {...field} disabled={!!existingData && !editMode} type="email" className="dark:text-white dark:bg-gray-950" />
                                        ))}
                                    </div>

                                    {renderField("businessType", "Category", field => (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={!!existingData && !editMode}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {BUSINESS_CATEGORIES.map(category => (
                                                        <SelectItem
                                                            key={category}
                                                            value={category.toLowerCase().replace(/ & /g, "-")}
                                                        >
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    ))}

                                    <div className="pt-6 space-y-4">
                                        <h3 className="text-lg font-semibold">Owner Details</h3>
                                        {renderField("ownerName", "Owner Name", field => (
                                            <Input {...field} disabled={!!existingData && !editMode} />
                                        ))}

                                        {!existingData && renderField("identityCard", "ID Document", ({ onChange }) => (
                                            <Input
                                                type="file"
                                                accept="image/*,application/pdf"
                                                onChange={e => onChange(e.target.files?.[0])}
                                            />
                                        ))}
                                    </div>

                                    {!existingData && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {renderField("region", "Region", field => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select region" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {REGIONS.map(region => (
                                                            <SelectItem key={region} value={region}>{region}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ))}
                                            {renderField("town", "Town", field => <Input {...field} />)}
                                            {renderField("woreda", "Woreda", field => <Input {...field} />)}
                                            {renderField("kebele", "Kebele", field => <Input {...field} />)}
                                        </div>
                                    )}

                                    {renderField("cbeAccountNo", "CBE Account Number", field => (
                                        <Input {...field} disabled={!!existingData && !editMode} placeholder="1000xxxxxxxxx" />
                                    ))}

                                    {/* Form Actions */}
                                    {(editMode || !existingData) && (
                                        <div className="flex justify-end gap-4">
                                            {existingData && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        form.reset(existingData);
                                                        setEditMode(false);
                                                    }}
                                                    disabled={isSubmitting}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                            <Button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-700"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? "Processing..."
                                                    : existingData
                                                        ? "Save Changes"
                                                        : "Register Merchant"}
                                            </Button>
                                        </div>
                                    )}
                                </form>
                            </Form>
                        </Card>
                    )}
                </TabsContent>
                <TabsContent value='shopInfo'>
                    <ShopRegistration
                        accountId={accountId}
                        editMode={editMode}
                        setEditMode={setEditMode}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
