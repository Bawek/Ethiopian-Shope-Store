"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/app/[locale]/loading";
import { useRouter } from "next/navigation";
import { useGetshopQuery } from "@/lib/features/shop/publicShopSlice";
import MenuBar from "../../components/MenuBar/MenuBar";

export default function Shop({ params }) {
  const shopId = params.shopId;
  const [productDetailPage, setProductDetailPage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const router = useRouter();

  const [productItem, setProductItem] = useState({});

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
      console.log("website data ", data);
      const productDetailPage = data.find(
        (page) => page.name === "product-detail"
      );
      setProductDetailPage(productDetailPage);
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
    const storedProductItem = JSON.parse(
      localStorage.getItem("productDetailItem")
    );
    console.log("product item populate storedProductItem", storedProductItem);

    const productImageElement = document.getElementById("product-detail-image");
    const productPriceElement = document.getElementById("product-detail-price");
    const productNameElement = document.getElementById("product-detail-name");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.id === storedProductItem.id
    );
    const addToCartButton = document.getElementById(
      "product-detail-add-to-cart-button"
    );

    if (existingProduct) {
      if (addToCartButton) {
        addToCartButton.textContent = "Added to Cart";
        addToCartButton.disabled = true;
      }
    } else {
      if (addToCartButton) {
        addToCartButton.addEventListener("click", handleAddToCart);
      }
    }

    if (
      storedProductItem &&
      productImageElement &&
      productNameElement &&
      productPriceElement
    ) {
      productImageElement.src = `http://localhost:8000/${storedProductItem.image}`;
      productNameElement.textContent = storedProductItem.name;
      productPriceElement.textContent = storedProductItem.price;
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
      const blogLink = document.getElementById("blog");
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }
      const addToCartButtons = document.querySelectorAll(
        ".product-cart button"
      );
      addToCartButtons.forEach((button, index) => {
        button.id = `${index}`;
        console.log("removed event to ", index);
      });
    };
  }, [router, shopId, productDetailPage?.html, cartItems]);

  const handleAddToCart = () => {
    console.log("add to cart");
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!productDetailPage) {
    return <div>No home page found.</div>;
  }

  return (
    <div className="relative">
      <div className="fixed rounded-full  z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: productDetailPage.html }} />
      <style>{productDetailPage.css}</style>
      <script>{productDetailPage.js}</script>
    </div>
  );
}
