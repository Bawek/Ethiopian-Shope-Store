"use client";
import { useGetTemplateByIdQuery } from "@/lib/features/templates/templateApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
export default function AllShopsLayout({ children }) {
  const params = useParams()
  const [headerPage, setHeaderPage] = useState({
    html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
    css: `h1{text-align:center;color:red;}`
  })
  const [footerPage, setFooterpage] = useState({
    html: '<p className="text-center text-red-600"> loading the page ... </p>',
    css: `h1{text-align:center;color:red;}`
  })
  const { data, isLoading } = useGetTemplateByIdQuery('74c94774-ae9f-4d1f-acbd-7680250aaa72');
  const [hasMounted, setHasMounted] = useState(false);
  console.log(data,'new data here')
  useEffect(() => {
    setHasMounted(true)
    if (hasMounted && !isLoading) {
      console.log(data, 'total data')
      setTimeout(() => {
        data?.template.pages.map((page) => {
          if (page.name === "header") {
            setHeaderPage(page)
          }
          if (page.name === 'footer') {
            setFooterpage(page)
          }
        })
      }, 3000)
    }
  }, [data]);
  return (
    <div className="min-h-screen min-w-full">
      <style>{headerPage?.css}</style>
      <style>{footerPage?.css}</style>
      {/* Header */}
      <header className="w-full shadow-sm sticky top-0 z-50">
        <div
          dangerouslySetInnerHTML={{ __html: headerPage.html }}
        />
      </header>
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer */}
      <footer className="mt-12">
        <div
          dangerouslySetInnerHTML={{ __html: footerPage.html }}
        />
      </footer>
    </div>
  );
}