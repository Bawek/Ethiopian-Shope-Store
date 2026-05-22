"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setPrompt2FormData } from "@/lib/features/prompt";

const schema = z.object({
  physical_shop_name: z.string().min(1, "Name is required").optional(),
  physical_shop_phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional(),
  physical_shop_address: z.string().min(1, "Address is required").optional(),
  kebele: z.string().min(1, "Kebele is required").optional(),
  physical_shop_city: z.string().min(1, "City is required").optional(),
});

const Prompt2 = ({ link }) => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setPrompt2FormData(data));
    router.push(link);
  };

  return (
    <div className="bg-white shadow-xl border-[1px] border-slate-1 rounded-sm p-6 max-w-md mx-auto">
      <input
        checked={isChecked}
        type="checkbox"
        onChange={handleCheckboxChange}
        label="Use client"
        id="physical-shop"
      />
      <label htmlFor="physical-shop" className="text-xl">
        Do you have a physical shop?
      </label>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {isChecked ? (
          <>
            <div>
              <label htmlFor="userName">Name</label>
              <Input id="userName" name="userName" {...register("userName")} />
              {errors.physical_shop_name && (
                <p>{errors.physical_shop_name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="kebele">Kebele</label>
              <Input id="kebele" name="kebele" {...register("kebele")} />
              {errors.kebele && <p>{errors.kebele.message}</p>}
            </div>
            <div>
              <label htmlFor="physical_shop_city">City</label>
              <Input
                id="physical_shop_city"
                name="physical_shop_city"
                {...register("physical_shop_city")}
              />
              {errors.physical_shop_city && (
                <p>{errors.physical_shop_city.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="physical_shop_phone_number">Phone Number</label>
              <Input
                id="physical_shop_phone_number"
                name="physical_shop_phone_number"
                {...register("physical_shop_phone_number")}
              />
              {errors.physical_shop_phone_number && (
                <p>{errors.physical_shop_phone_number.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="physical_shop_name">physical shop name</label>
              <Input
                id="physical_shop_name"
                name="physical_shop_name"
                {...register("physical_shop_name")}
              />
              {errors.physical_shop_name && (
                <p>{errors.physical_shop_name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="physical_shop_phone_number">Phone Number</label>
              <Input
                id="physical_shop_phone_number"
                name="physical_shop_phone_number"
                {...register("physical_shop_phone_number")}
              />
              {errors.physical_shop_phone_number && (
                <p>{errors.physical_shop_phone_number.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="physical_shop_address">Address</label>
              <Input
                id="physical_shop_address"
                name="physical_shop_address"
                {...register("physical_shop_address")}
              />
              {errors.physical_shop_address && (
                <p>{errors.physical_shop_address.message}</p>
              )}
            </div>
          </>
        )}
        <Button type="submit" className="block w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Prompt2;
