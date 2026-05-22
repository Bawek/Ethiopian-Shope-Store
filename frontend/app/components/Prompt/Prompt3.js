"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { setShopName } from "@/lib/features/prompt";

const Prompt3 = () => {
  const [shopNameInput, setShopNameInput] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const unique_id = localStorage.getItem("unique_id");
  const uid = localStorage.getItem("uid");

  const handleChange = (event) => {
    setShopNameInput(event.target.value);
  };
  const prompt1 = useSelector((state) => state.prompt.promptForm);
  const prompt2 = useSelector((state) => state.prompt.prompt2Form);
  const formData = { ...prompt1, ...prompt2 };
  const sendData = async (shop_name) => {
    try {
      // Replace with your API endpoint
      const response = await fetch(
        `http://localhost:8000/auth/merchant/update/${unique_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, ...shop_name, uid: uid }),
        }
      );

      if (response.ok) {
        console.log("success");
        localStorage.setItem("shopName", shopNameInput);
      } else {
        console.error("Failed to submit form data");
        router.push("/auth/register");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(shopNameInput);
    dispatch(setShopName(shopNameInput));
    await sendData({ physical_shop_name: shopNameInput });
    console.log(formData);
    router.push("/selecttheme");
  };

  return (
    <div className="bg-white shadow-xl border-[1px] border-slate-1 rounded-sm p-6 max-w-md mx-auto">
      <form className="mt-4" onSubmit={handleSubmit}>
        <label className="text-xl">
          Tell us the shop name you want to create
        </label>
        <input
          type="text"
          value={shopNameInput}
          onChange={handleChange}
          id="shop-name"
          className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
        />
        <Button type="submit" className="block w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Prompt3;
