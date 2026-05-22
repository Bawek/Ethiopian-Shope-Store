"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./RightSidbar.module.css";
import Footer from "./Footer/Footer";
import Header from "./Header/header";
import Banner from "./Banner/Banner";
import EmailNewsLetter from "./EmailNewsLetter/EmailNewLetter";
import AddSection from "./Section/AddSection";
export default function RightSidebar({ Clickedbutton }) {
  return (
    <nav className="md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-80 z-10 py-4 px-8">
      {Clickedbutton === "Header" && <Header />}
      {Clickedbutton === "Main Banner" && <Banner />}
      {Clickedbutton === "Email Newsletter" && <EmailNewsLetter />}
      {Clickedbutton === "Footer" && <Footer />}
      {Clickedbutton === "Add Section" && <AddSection />}
    </nav>
  );
}
