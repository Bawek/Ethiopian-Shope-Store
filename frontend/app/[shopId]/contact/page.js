"use client";
import React, { useState, useEffect } from "react";
import { useGetshopQuery } from "@/lib/features/shop/publicShopSlice";
// import Loading from "@/app/[locale]/loading";
import { useRouter } from "next/navigation";
import MenuBar from "../../components/MenuBar/MenuBar";
import Loading from "@/app/customers/loading";

export default function ContactPage({ params }) {
  const shopId = params.shopId;
  const [contactPage, setContactPage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const [message, setMessage] = useState("");
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
      const homePageData = data.find((page) => page.name === "Contact");
      setContactPage(homePageData);
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
  }, [cartItems, contactPage.html]);

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

    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      if (cartItems.length !== 0) {
        cartItemNumber.textContent = cartItems.length;
      } else {
        cartItemNumber.textContent = "";
      }
    }

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
    const submitButton = document.getElementById("contact-submit-button");
    if (submitButton) {
      submitButton.addEventListener("click", handleContactUs);
    }
    // Cleanup event listener on component unmount
    return () => {
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }
    };
  }, [router, shopId, contactPage?.html, message]);

  const handleContactUs = (event) => {
    event.preventDefault();

    const name = document.getElementById("contact-form-name").value;
    const email = document.getElementById("contact-form-email").value;
    const message = document.getElementById("contact-form-message").value;

    const contactData = {
      name: name,
      email: email,
      message: message,
    };
    console.log("contact us message", contactData);
    const successMessageElement = document.getElementById(
      "contactus-submit-message"
    );
    if (successMessageElement) {
      successMessageElement.textContent =
        "Message will be delivered to merchant!";
      setMessage("Message will be delivered to merchant!");

      // Hide the message after 2 seconds
      setTimeout(() => {
        successMessageElement.textContent = "";
      }, 2000);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!contactPage) {
    return <div>No home page found.</div>;
  }

  return (
    <div className="relative">
      <div className="fixed rounded-full  z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: contactPage.html }} />
      <style>{contactPage.css}</style>
      <script>{contactPage.js}</script>
    </div>
  );
}
