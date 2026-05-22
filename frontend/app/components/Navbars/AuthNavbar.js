"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useSelector } from "react-redux";
import { selectAll } from "@/lib/features/auth/accountSlice";

export default function Navbar() {
  const [uniqueId, setUniqueId] = useState();
  const account = useSelector(selectAll);
  const [role, setRole] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems] = useState(3); // Mock cart items count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (account?.id) {
      setUniqueId(account.id);
      setRole(account.role);
    }
  }, [account]);

  const navLinks = [
    ...(uniqueId
      ? [
        {
          name: "Profile",
          href: role === "merchant" ? "/admin/settings" : "/profile",
          icon: <User className="w-4 h-4 mr-2" />,
        },
        ...(role === "merchant"
          ? [{ name: "Dashboard", href: "/admin/dashboard", icon: <span>📊</span> }]
          : []),
      ]
      : [
        {name: "Cart", href: "/shopping-cart", icon: <ShoppingCart className="w-4 h-4 mr-2 text-black" /> },
        { name: "Login", href: "/auth/login", icon: <User className="w-4 h-4 mr-2" /> },
        { name: "Register", href: "/auth/register", icon: <span>🎁</span> },
      ]),
  ];

  return (
    <header
      className={cn(
        "w-full backdrop-blur-lg fixed top-0 z-50",
        isScrolled ? "shadow-xl" : "bg-gray-100"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center no-underline gap-2 font-bold hover:scale-105 transition-transform"
        >
          <span className="text-2xl text-orange-400">🛒</span>
          <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 text-xl font-extrabold">
            E-commerce
          </span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-7 w-7 text-orange-400 hover:text-orange-300 transition-colors" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-800/95 border-r-gray-700">
            <SheetTitle className="text-orange-400">Explore NextShop</SheetTitle>
            <div className="flex flex-col gap-4 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center px-4 py-3 no-underline hover:bg-gray-700/50 rounded-lg transition-all"
                >
                  {link.icon}
                  <span className="font-medium text-black">{link.name}</span>
                </Link>
              ))}
              <div className="mt-4 border-t border-gray-700 pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-4">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center  text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 px-4 py-2 no-underline hover:text-orange-400 hover:bg-gray-700/30 rounded-full transition-all duration-200">
                    {link.icon}
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* <button className="relative p-2 hover:text-orange-400 transition-colors">
            <Heart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-pink-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <button className="relative p-2 hover:text-orange-400 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems}
            </span>
          </button> */}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}