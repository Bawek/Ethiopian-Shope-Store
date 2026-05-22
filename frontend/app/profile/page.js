"use client";
import React from "react";
import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";
import Link from "next/link";
import { Admin } from "../layouts/Admin.js";
import ProfileContainer from "../components/ClientProfile/ProfileContainer.js";
export default function profile() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ProfileContainer />
        </div>
      </div>
      <Footer />
    </>
  );
}
