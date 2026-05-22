"use client";
import React from "react";
import Link from "next/link";
import {DropdownMenuRadioGroupDemo} from "./AddPage/dropDown.js";
import { usePathname, useRouter } from 'next/navigation'
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LeftSidebar({ handleSidebarClick }) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const pathname = usePathname();
  const router = useRouter()
  const buttons = [
    { id: "header", label: "Header", icon: "fas fa-heading" },
    { id: "mainBanner", label: "Main Banner", icon: "far fa-bookmark" },
    {
      id: "emailNewsletter",
      label: "Email Newsletter",
      icon: "fas fa-mail-bulk",
    },
    { id: "footer", label: "Footer", icon: "far fa-window-maximize" },
  ];
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-80 z-10 py-4 px-4">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <Button variant="outline" onClick={() => router.back()}>
					{" "}
					<i className="fas fa-sign-out-alt fa-lg"></i>
				</Button>
          {/* Brand */}
          <div className="flex items-center space-x-4 justify-items-start my-4">
            {/* Input select */}
            
            <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Home" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Home</SelectItem>
    <SelectItem value="dark">Product detail</SelectItem>
    <SelectItem value="system">Checkout</SelectItem>
    <SelectItem value="payment">Payment method</SelectItem>
  </SelectContent>
</Select>
            {/* Settings icon */}
            <Button variant="outline">
              {" "}
              <i className="fas fa-cog fa-lg"></i>
            </Button>
            <DropdownMenuRadioGroupDemo />
          </div>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="rounded-md bg-slate-100 px-2 py-2">
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                {buttons.map((button) => (
                  <li
                    key={button.id}
                    className="items-center rounded-md hover:bg-slate-400 px-3"
                  >
                    <button
                      className="text-xs uppercase py-3 font-bold block w-full text-left border-none outline-none focus:outline-none"
                      onClick={() => handleSidebarClick(button.label)}
                    >
                      <i className={button.icon + " mr-2 text-sm"}></i>
                      {button.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Heading */}
            <div className="mt-20">
              <button
                className="w-full bg-slate-100 p-3 rounded-md hover:bg-slate-400"
                onClick={() => handleSidebarClick("Add Section")}
              >
                <i className="fas fa-plus mr-3"></i>
                Add Section
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
