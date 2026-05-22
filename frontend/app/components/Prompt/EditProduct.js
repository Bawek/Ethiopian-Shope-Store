"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useUpdateProductMutation } from "@/lib/features/products/products";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  itemType: z.string({
    required_error: "Please select an Item type to display.",
  }),
  itemTitle: z.string({
    required_error: "Required",
  }),
  itemPrice: z.preprocess((val) => parseFloat(val), z.number().nonnegative()),
  description: z.string(),
  stock: z.preprocess((val) => parseInt(val, 10), z.number().nonnegative()),
  image: z.any().optional(),
});

export function EditProductForm({ product }) {
  const {toast} = useToast()
  const [updateProduct, { isLoading, isError }] = useUpdateProductMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemType: product.name || "",
      stock: product.stock ? product.stock.toString() : "",
      itemTitle: product.slug || "",
      itemPrice: product.price ? product.price.toString() : "",
      description: product.description || "",
    },
  });

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("itemType", data.itemType);
      formData.append("itemTitle", data.itemTitle);
      formData.append("itemPrice", data.itemPrice);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await updateProduct({ id: product.id, data: formData });
      toast({
        title: "Success",
        description: "Product updated successfully.",
        variant: "default", // You can use "destructive" for errors
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "default", // You can use "destructive" for errors
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div>
                  {product.image && (
                    <Image
                      src={product.image}
                      alt="Product Image"
                      className="mb-4"
                      width={100}
                      height={100}
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemType"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between w-full">
                <FormLabel>Product Name</FormLabel>
                <FormDescription>required</FormDescription>
              </div>
              <FormControl>
                <Input placeholder="coat..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemTitle"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between w-full">
                <FormLabel>Product Category</FormLabel>
                <FormDescription>required</FormDescription>
              </div>
              <FormControl>
                <Input placeholder="cloth..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00 ETB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description of your menu item"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Update Product
        </Button>
      </form>
    </Form>
  );
}
