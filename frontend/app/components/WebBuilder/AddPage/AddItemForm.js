"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  image: z.any().optional(),
});

export function AddItemForm({ product }) {
  const {toast} = useToast()
  console.log(product);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemType: product.name || "",
      stock: product.stock ? product?.stock?.toString() : "",
      itemTitle: product.slug || "",
      itemPrice: product.price ? product?.price?.toString() : "",
      description: product.description || "",
      image: product.image || "",
    },
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
                {product.image ? (
                  <Image
                    src={product.image}
                    alt="Product Image"
                    className=" ml-11"
                    width={100}
                    height={100}
                  />
                ) : (
                  <p>No image available</p>
                )}
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
                <Input placeholder="coat..." {...field} readOnly />
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
                <FormLabel>Product Categorie </FormLabel>
                <FormDescription>required</FormDescription>
              </div>
              <FormControl>
                <Input placeholder="cloth..." {...field} readOnly />
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
                <Input
                  //   type="number"
                  placeholder="0.00 ETB"
                  {...field}
                  readOnly
                />
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
                <Input
                  //   type="number"
                  placeholder="0.00 ETB"
                  {...field}
                  readOnly
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
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description of your menu item"
                  className="resize-none"
                  {...field}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
