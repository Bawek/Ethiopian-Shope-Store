"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { setPromptFormData } from "@/lib/features/prompt";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const items = [
  {
    id: "Jewelry_cosmetics",
    label: "Jewelry and cosmetics",
    imgUrl: "/cosmotics.png",
  },
  {
    id: "electronics",
    label: "Electronics",
    imgUrl: "/electronics.jpg",
  },
  {
    id: "clothing",
    label: "Cloth",
    imgUrl: "/cloth.jpg",
  },
  {
    id: "Shoes",
    label: "Shoes",
    imgUrl: "/shoes.jpg",
  },
];

const FormSchema = z.object({
  online_shop_type: z.string().optional(),
});

export function PromptForm({ link }) {
  const dispatch = useDispatch();
  const {toast} = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      online_shop_type: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(setPromptFormData(data));
    console.log(data);
    toast({
      title: "You selected the following items:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {items.map((item) => (
        <Button
          key={item.id}
          asChild
          className="w-80 flex justify-start"
          onClick={() => {
            form.setValue("online_shop_type", item.id);
            form.handleSubmit(onSubmit)();
          }}
        >
          <Link href={link} className="flex justify-start gap-x-6">
            <Image
              src={item.imgUrl}
              width={20}
              height={20}
              alt={item.label}
              className="mr-2 h-8 w-8 rounded-full"
            />
            <p>{item.label}</p>
          </Link>
        </Button>
      ))}
    </div>
  );
}
