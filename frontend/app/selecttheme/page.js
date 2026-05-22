"use client";
import React, { useEffect, useState } from "react";
import Theme from "../components/theme/Theme";
import SelectedTheme from "../components/theme/SelectedTheme";
import Footer from "../components/Footers/Footer";
import { useGetWebBuildersQuery } from "@/lib/features/webBuilder/webBuilder";
import useCheckUnauthorized from "@/lib/features/auth/unauthorise";

const SelectTheme = () => {
  const { data, error, isLoading } = useGetWebBuildersQuery();

  useCheckUnauthorized(error);

  // Ensure data is always an array
  const themes = data?.templates || [];
  // all of the 
  return (
    <div className="mt-24">
      {/* <SelectedTheme /> */}
      <div className="flex flex-col m-8 mb-24">
        <div className="flex flex-col justify-center items-center mb-4">
          <h2 className="font-bold">Popular Themes</h2>
          <p>Made with core features you can easily customize -- no coding needed</p>
        </div>
        <div className="flex w-full h-full gap-6 flex-wrap justify-center">
          {isLoading ? (
            <p className="text-white">Loading themes...</p>
          ) : themes.length > 0 ? (
            themes.map((theme) => <Theme key={theme.id} theme={theme} />)
          ) : (
            <p className="text-white">No themes found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelectTheme;
