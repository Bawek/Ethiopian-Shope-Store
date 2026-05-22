'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCreateShopMutation, useGetShopByAccountQuery } from "@/lib/features/shop/shop";
import Link from "next/link";
import { useGetMerchantTemplateByAccountQuery } from "@/lib/features/templates/templateApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { imageViewer } from "@/app/system-admin/lib/imageViewer";
import { toast } from "react-toastify";

// Validation schema
const shopSchema = z.object({
  description: z.string().max(500, "description must be less than 500 characters").optional(),
  domain: z.string()
    .min(3, "shop domain must be at least 3 characters")
    .max(15, "shop domain must be less than 15 characters"),
  logoImageUrl: z.instanceof(File, "Shop logo is required")
    .refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      "Only JPEG, PNG & WEBP files are allowed")
    .refine(file => file.size <= 2 * 1024 * 1024, "File size must be less than 2MB")
});

export default function ShopRegistration({ accountId, editMode, setEditMode }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState("");
  const router = useRouter();

  // API queries
  const { data: shopData, isLoading, isError, error } = useGetShopByAccountQuery(accountId);
  const { data: customTemplate } = useGetMerchantTemplateByAccountQuery(accountId);
  const [createShop] = useCreateShopMutation();

  const mode = shopData?.shop?.id ? 'update' : 'create';
  const hasTemplate = !!customTemplate?.merchantTemplate?.id;

  const shop = shopData?.shop || {};
  console.log(shopData, customTemplate, 'shop data')
  // Initialize form
  const form = useForm({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      domain: shop.domain || "",
      description: shop.description || "",
      logoImageUrl: undefined
    }
  });

  // Reset form when shop data changes
  React.useEffect(() => {
    if (shop.domain) {
      form.reset({
        domain: shop.domain,
        description: shop.description,
        logoImageUrl: undefined
      });
    }
  }, [shop]);

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size before processing
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({
        title: "Invalid File Type",
        variant: "destructive",
        description: "Please upload a JPEG, PNG, or WEBP image",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    field.onChange(file);
    setImagePreview(URL.createObjectURL(file));
  };

const prepareFormData = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value); // only once for files
    } else {
      formData.append(key, value); // only once for other values
    }
  });

  formData.append('merchantTemplateId', customTemplate?.merchantTemplate?.id);
  formData.append('accountId', accountId);
  formData.append('mode', mode);

  return formData;
};


  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const validatedData = shopSchema.parse(formData);
      const formPayload = prepareFormData(validatedData);
      
      console.log(formPayload, 'mode')
      await createShop(formPayload).unwrap();
        toast.success( `Shop ${mode === "create" ? 'created' : 'updated'} successfully`)
     
      if (mode === "create") {
        form.reset();
        setImagePreview("");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error('Sorry something went wrong. please try again.')

    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="w-full flex justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );

  if (isError) return (
    <div className="text-red-500 p-4 border border-red-200 rounded">
      Error loading shop data: {error?.message || "Unknown error"}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {!hasTemplate && (
        <div className="p-6 rounded-xl shadow-md border">
          <p className="text-lg leading-relaxed">
            🎉 <strong>Congratulations!</strong> Your registration has been approved!
            <br />
            <span className="block mt-2">
              <strong>Ready to launch your business?</strong>
            </span>
            Choose from customizable, mobile-friendly designs at an affordable price!
            <br />
            <Link
              href="/customers/templates"
              className="inline-block mt-2 font-semibold underline hover:underline-offset-4 text-orange-400 hover:text-orange-300"
            >
              Explore Our Shop Templates
            </Link>
          </p>

          <Button
            onClick={() => router.push('/customers/templates')}
            className="mt-6 w-full sm:w-auto text-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Purchase Starter Template 🚀'
            )}
          </Button>
        </div>
      )}

      {hasTemplate && (
        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {mode === "create" ? "Register New Shop" : "Edit Shop Details"}
            </h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop Slug <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!shop.slug && !editMode}
                          placeholder="my-shop-slug"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem
                    className={`${editMode ? 'hidden' :""}`}
                    >
                      <FormLabel>Shop Domain <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!shop.domain && !editMode}
                          placeholder="my-shop-domain"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={3}
                          disabled={!!shop.description && !editMode}
                          placeholder="Describe your shop..."
                          className="w-full p-2 rounded-md resize-none dark:text-white dark:bg-gray-950"
                        />
                      </FormControl>
                      <div className="text-sm border-none text-gray-500 text-right">
                        {field.value?.length || 0}/500
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="businessHours"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Business Hours</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!!shop.businessHours && !editMode}
                          placeholder='{"monday": {"open": "09:00", "close": "18:00"}}'
                          className="font-mono text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="text-sm text-gray-500 mt-1">
                        Use JSON format. Example:{" "}
                        <Link href="/examples/business-hours" target="_blank" className="text-blue-600 underline">
                          View format example
                        </Link>
                      </div>
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="logoImageUrl"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Shop Logo <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, field)}
                              disabled={!!shop.logoImageUrl && !editMode}
                              className="w-fit cursor-pointer"
                            />
                            <span className="text-sm text-gray-500 ml-2">
                              Max 2MB (JPEG, PNG, WEBP)
                            </span>
                          </div>
                          {(imagePreview || shop.logoImageUrl) && (
                            <div className="relative w-20 h-20">
                              <img
                                src={imagePreview || imageViewer(shop.logoImageUrl)}
                                alt="Logo preview"
                                className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                                onError={() => setImagePreview("")}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  className="bg-orange-700 hover:bg-orange-800 min-w-[150px]"
                  disabled={isSubmitting || !editMode}
                >
                  {isSubmitting ? (
                    <div className="flex gap-2 items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting
                    </div>
                  ) : mode === "create" ? (
                    "Register Shop"
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      )}
    </div>
  );
}