"use client";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import OrderHistory from "./OrderHistory";

const ClientProfile = () => {
  return (
    <>
      <div className="w-full mx-auto lg:w-[75%]  px-4">
        <ProfileInfo />
      </div>
      <div>
        <OrderHistory />
      </div>
    </>
  );
};

export default ClientProfile;
