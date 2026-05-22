"use client";
import React, { useState, useEffect } from "react";
import WithGrapesjs from "./GrapesjsMain";
import Loader from "../Prompt/Loader";
import useCheckUnauthorized from "@/lib/features/auth/unauthorise";
import { useGetMerchantTemplateByIdQuery } from "@/lib/features/templates/templateApi";

const dynamicConfiguration = {
  plugin: [
    // Define your plugins here
  ],
};

const Card = ({ templetId, ...props }) => {
  const [initAppData, setInitAppData] = useState(null);
  const [pages, setPages] = useState([]);
  const [displayPage, setDisplayPage] = useState(false);

  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch
  } = useGetMerchantTemplateByIdQuery(templetId, {
    skip: !templetId, // skip query if no id
  });

  useCheckUnauthorized(error);

  useEffect(() => {
    if (isSuccess && data?.template?.customPages?.length) {
      const pageConfigs = data.template.customPages.map((pageItem) => ({
        name: pageItem?.name || "Unnamed Page",
        brand_url: "",
        canonical: null,
        slug: "",
        configuration: dynamicConfiguration,
        content: {
          html: pageItem?.html || "",
          css: pageItem?.css || "",
        },
      }));

      setInitAppData(pageConfigs);
      setPages(data.template.customPages);
      setDisplayPage(true);

      if (process.env.NODE_ENV === "development") {
        console.log("Loaded custom template pages", data);
      }
    }
  }, [data, isSuccess]);

  // Show loader while loading
  if (isLoading) {
    return (
      <div className="loader-container">
        {/* <Loader /> */}
        <h1>Loading ... </h1>
      </div>
    );
  }

  // Show error UI
  if (isError) {
    return (
      <div className="error-container text-red-600 text-center py-4">
        <h2>Error loading template. Please try again.</h2>
        {process.env.NODE_ENV === "development" && (
          <pre>{JSON.stringify(error, null, 2)}</pre>
        )}
      </div>
    );
  }

  // Show fallback UI if no template found
  if (!displayPage || !initAppData) {
    return (
      <div className="text-center text-gray-500 py-4">
        <h2>No template data found.</h2>
      </div>
    );
  }

  return (
    <div>
      <WithGrapesjs
        templateId={templetId}
        page={pages}
        {...props}
        data={initAppData}
        setData={setInitAppData}
        refetch = {refetch}
      />
    </div>
  );
};

export default Card;
