"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import MenuBar from "../components/MenuBar/MenuBar";
import { useGetShopQuery } from "@/lib/features/shop/shop";

export default function Shop() {
  const params = useParams()
  const shopId = params.shopId;
  const [homepage, setHomepage] = useState({});
  const { data, error, isLoading } = useGetShopQuery(shopId);
  const router = useRouter();
  const [cart, setCart] = useState(() => {
    // Initialize cart from local storage if available
    const savedCart = [];
    return savedCart;
  });
  const [numberOfItems, setNumberOfItems] = useState(0);

  useEffect(() => {
    if (data) {
      console.log("website data ", data);
      const homePageData = data.find((page) => page.name === "Home");
      setHomepage(homePageData);
    }
  }, [data]);

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
      }
    };

    const blogLink = document.getElementById("blog");
    const contactLink = document.getElementById("contact");
    const aboutLink = document.getElementById("about");
    const shopCartLink = document.getElementById("shopping-cart");
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

    const addToCartButtons = document.querySelectorAll(
      ".product-cart .add-to-cart-button"
    );
    addToCartButtons.forEach((button, index) => {
      button.id = `${index}`;
      console.log("attached event to ", index);
      button.addEventListener("click", addToCart);
    });

    const productDetailButton = document.querySelectorAll(
      ".product-cart .product-detail-button"
    );
    productDetailButton.forEach((button) => {
      button.addEventListener("click", handleProductDetail);
    });

    // Cleanup event listener on component unmount
    // return () => {
    //   const blogLink = document.getElementById("blog");
    //   if (blogLink) {
    //     blogLink.removeEventListener("click", handleClick);
    //   }
    //   const addToCartButtons = document.querySelectorAll(
    //     ".product-cart button"
    //   );
    //   addToCartButtons.forEach((button, index) => {
    //     button.id = `${index}`;
    //     console.log("removed event to ", index);
    //     return button.removeEventListener("click", addToCart);
    //   });
    // };
  }, [router, shopId, homepage?.html, cart, numberOfItems]);

  useEffect(() => {
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      cartItemNumber.textContent = cart.length;
    }
  }, [cart, numberOfItems]);

  const handleProductDetail = (event) => {
    event.preventDefault();

    const productCart = event.currentTarget.closest(".product-cart");

    if (!productCart) {
      console.log("product not found");
      return;
    }
    const productId = productCart.id;
    console.log("product id", productId);
    const productName = productCart.querySelector(".name").textContent.trim();
    const productPrice = productCart
      .querySelector(".price-value")
      .textContent.trim();
    const imgElement = productCart.querySelector("img");
    const url = new URL(imgElement.src);
    const imagePath = url.pathname;

    const productItem = {
      id: productId,
      name: productName,
      price: productPrice,
      image: imagePath,
      quantity: 1,
    };
    console.log("product added detail item ", productItem);
    localStorage.setItem("productDetailItem", JSON.stringify(productItem));
    router.push(`/${shopId}/product-detail`);
  };

  const addToCart = (event) => {
    event.preventDefault();

    const productCart = event.currentTarget.closest(".product-cart");

    if (!productCart) {
      console.log("product not found");
      return;
    }
    const productId = productCart.id;
    console.log("product id", productId);
    const productName = productCart.querySelector(".name").textContent.trim();
    const productPrice = productCart
      .querySelector(".price-value")
      .textContent.trim();
    const imgElement = productCart.querySelector("img");
    const url = new URL(imgElement.src);
    const imagePath = url.pathname;

    const existingProduct = cart.find((item) => item.id === productId);
    if (!existingProduct) {
      if (cart.length === 0) {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: imagePath,
          quantity: 1,
        });
        setCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        setNumberOfItems(cart.length);
      } else {
        const updatedCart = [
          ...cart,
          {
            id: productId,
            name: productName,
            price: productPrice,
            image: imagePath,
            quantity: 1,
          },
        ];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setNumberOfItems(cart.length);
      }

      console.log("this what inside cart", cart);
      console.log(
        "Updated cart in local storage:",
        JSON.parse(localStorage.getItem("cart"))
      ); // Test local storage
    } else {
      console.log(`Product already in cart: ${productName}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!homepage) {
    return <div>No home page found.</div>;
  }

  return (
    <div className="relative">
      <div className="fixed rounded-full  z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: homepage.html }} />

      <style>{homepage.css}</style>
      <script>{homepage.js}</script>
    </div>
  );
}