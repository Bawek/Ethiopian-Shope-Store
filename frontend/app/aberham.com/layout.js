"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useGetMerchantTemplateByDomainQuery } from "@/lib/features/merchantTemplates/buyedTemplateApi";
import { usePathname } from "next/navigation";
const TemplateContext = createContext();

export function useTemplate() {
  return useContext(TemplateContext);
}
export default function AberhamLayout({ children }) {
  const pathname = usePathname();
  const firstSegment = pathname.split('/')[1];
  const [domain, setDomain] = useState(firstSegment);
  const [headerPage, setHeaderPage] = useState({
    html: '<button id="contactBtn">Contact</button>',
    css: "#contactBtn { color: blue; }",
  });
  const [footerPage, setFooterPage] = useState({
    html: '<button id="subscribeBtn">Subscribe</button>',
    css: "#subscribeBtn { color: green; }",
  });
  // useEffect(() => {
  //   setDomain(window.location.pathname.slice(1));
  // }, []);

  const { data, isLoading } = useGetMerchantTemplateByDomainQuery(domain);
  console.log(domain, 'domain')
  useEffect(() => {
    if (!isLoading && data?.template?.customPages?.length > 0) {
      const pages = data.template.customPages;
      const header = pages.find((p) => p.name === "header");
      const footer = pages.find((p) => p.name === "footer");
      if (header) setHeaderPage(header);
      if (footer) setFooterPage(footer);
    }
  }, [isLoading, data]);

  useEffect(() => {
    // Handle user dropdown toggle
    const userMenuBtn = document.getElementById("user-menu-button");
    const dropdownMenu = document.getElementById("dropdown-menu");

    const handleUserMenuToggle = () => {
      if (dropdownMenu) {
        dropdownMenu.classList.toggle("hidden");
      }
    };

    if (userMenuBtn) {
      userMenuBtn.addEventListener("click", handleUserMenuToggle);
    }

    // Handle mobile menu toggle
    const mobileToggleBtn = document.querySelector(".mobile-menu-toggle");
    let mobileNav = document.getElementById("mobile-nav");

    // Optional: fallback if not found initially
    if (!mobileNav) {
      mobileNav = document.createElement("div");
      mobileNav.id = "mobile-nav";
      mobileNav.className = "hidden md:hidden px-4 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800";
      mobileNav.innerHTML = `
      <a href="#dashboard" class="block text-white rounded-md px-3 py-2 text-base font-medium">Dashboard</a>
      <a href="#team" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Team</a>
      <a href="#projects" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Projects</a>
      <a href="#calendar" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Calendar</a>
      <a href="#reports" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Reports</a>
    `;
      const nav = document.querySelector("nav");
      if (nav) nav.appendChild(mobileNav);
    }

    const handleMobileToggle = () => {
      if (mobileNav) {
        mobileNav.classList.toggle("hidden");
      }
    };

    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener("click", handleMobileToggle);
    }

    return () => {
      if (userMenuBtn) {
        userMenuBtn.removeEventListener("click", handleUserMenuToggle);
      }
      if (mobileToggleBtn) {
        mobileToggleBtn.removeEventListener("click", handleMobileToggle);
      }
    };
  }, [headerPage.html, footerPage.html]); // re-run on GrapesJS updates

  return (
    <TemplateContext.Provider value={{ domain, data, isLoading }}>
      <div className="min-h-screen min-w-full">
        <style>{headerPage.css}</style>
        <style>{footerPage.css}</style>

        <header className="w-full shadow-sm sticky top-0 z-50">
          <div dangerouslySetInnerHTML={{ __html: headerPage.html }} />
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="">
          <div dangerouslySetInnerHTML={{ __html: footerPage.html }} />
        </footer>
      </div>
    </TemplateContext.Provider>
  );
}
