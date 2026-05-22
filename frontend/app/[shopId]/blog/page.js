"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "../../loading";
import MenuBar from "../../components/MenuBar/MenuBar";
import { useGetShopQuery } from "@/lib/features/shop/shop";

export default function BlogPage() {
  const params = useParams()
  const shopId = params.shopId;
  const [blogpage, setBlogpage] = useState({});
  const { data, error, isLoading } = useGetShopQuery(shopId);
  const router = useRouter();

  const storedData = localStorage.getItem("cart");
  let initialCartItems;

  try {
    initialCartItems = storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    initialCartItems = [];
  }
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    if (data) {
      const homePageData = data.find((page) => page.name === "Blog");
      setBlogpage(homePageData);
    }
  }, [data]);

  useEffect(() => {
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      if (cartItems.length !== 0) {
        cartItemNumber.textContent = cartItems.length;
      } else {
        cartItemNumber.textContent = "";
      }
    }
  }, [cartItems]);

  useEffect(() => {
    const handleClick = (event, link) => {
      event.preventDefault();
      if (link === "contact") {
        router.push(`/${shopId}/contact`);
        return;
      } else if (link === "blog") {
        router.push(`/${shopId}/blog`);
        return;
      } else if (link === "about") {
        router.push(`/${shopId}/about`);
      } else if (link === "shopping-cart") {
        router.push(`/${shopId}/shopping-cart`);
      } else if (link === "checkout") {
        router.push(`/${shopId}/checkout`);
      } else if (link == "home") {
        router.push(`/${shopId}`);
      }
    };
    const checkOutLink = document.getElementById("checkout");
    const homeLink = document.getElementById("home");
    const blogLink = document.getElementById("blog");
    const contactLink = document.getElementById("contact");
    const aboutLink = document.getElementById("about");
    const shopCartLink = document.getElementById("shopping-cart");

    if (checkOutLink) {
      checkOutLink.addEventListener("click", (event) =>
        handleClick(event, "checkout")
      );
    }
    if (homeLink) {
      homeLink.addEventListener("click", (event) => handleClick(event, "home"));
    }

    if (blogLink) {
      blogLink.addEventListener("click", (event) => handleClick(event, "blog"));
    }
    if (contactLink) {
      contactLink.addEventListener("click", (event) =>
        handleClick(event, "contact")
      );
    }
    if (aboutLink) {
      aboutLink.addEventListener("click", (event) =>
        handleClick(event, "about")
      );
    }
    if (shopCartLink) {
      shopCartLink.addEventListener("click", (event) =>
        handleClick(event, "shopping-cart")
      );
    }
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      if (cartItems.length !== 0) {
        cartItemNumber.textContent = cartItems.length;
      } else {
        cartItemNumber.textContent = "";
      }
    }

    // Cleanup event listener on component unmount
    return () => {
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }
    };
  }, [router, shopId, blogpage.html, cartItems]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!blogpage) {
    return <div>No home page found.</div>;
  }

  return (
    <div className="relative">
      <div className="fixed rounded-full  z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: blogpage.html }} />
      <style>{blogpage.css}</style>
      <script>{blogpage.js}</script>
    </div>
  );
}
