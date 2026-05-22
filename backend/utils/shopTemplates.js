// utils/shopTemplates.js
const shopTemplates = {
  // Root files
  layout: (domain) => `// app/${domain}/layout.js
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

  const { data, isLoading } = useGetMerchantTemplateByDomainQuery(domain);

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

    if (!mobileNav) {
      mobileNav = document.createElement("div");
      mobileNav.id = "mobile-nav";
      mobileNav.className = "hidden md:hidden px-4 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800";
      mobileNav.innerHTML = \`
        <a href="#dashboard" class="block text-white rounded-md px-3 py-2 text-base font-medium">Dashboard</a>
        <a href="#team" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Team</a>
        <a href="#projects" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Projects</a>
        <a href="#calendar" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Calendar</a>
        <a href="#reports" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Reports</a>
      \`;
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
  }, [headerPage.html, footerPage.html]);

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
}`,
  loading: (domain) => `// app/${domain}/loading.js
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}`,

  error: (domain) => `// app/${domain}/error.js
'use client'

export default function Error({ error, reset }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">${domain} Error</h2>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}`,

  page: (domain) => `// app/${domain}/page.js
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from './layout';

const Home = () => {
  const { domain, data, isLoading } = useTemplate();
  const [currentTemplate, setCurrentTemplate] = useState({
    html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
    css: \`h1{text-align:center;color:red;}\`
  });
  const containerRef = useRef(null);

  // Set the custom template once data is loaded
  useEffect(() => {
    if (!isLoading && data?.template?.customPages) {
      const homePage = data.template.customPages.find((page) => page.name === "home");
      if (homePage) {
        setCurrentTemplate(homePage);
      }
    }
  }, [data, isLoading]);

  // Control buttons or elements inside the rendered HTML
  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button');

      buttons.forEach((button) => {
        const handler = () => {
          alert(\`Button clicked: \${button.innerText}\`);
        };

        button.removeEventListener('click', handler);
        button.addEventListener('click', handler);
      });
    }
  }, [currentTemplate]);

  return (
    <div className="w-full">
      <style>{currentTemplate.css}</style>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
    </div>
  );
};

export default Home;
`,
  // Subpage templates
  subpage: (domain, pageName) => `// app/${domain}/${pageName}/page.js
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useGetMerchantTemplateByDomainQuery } from '@/lib/features/merchantTemplates/buyedTemplateApi';

const ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page = () => {
  const [domain, setDomain] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState({
    html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
    css: \`h1{text-align:center;color:red;}\`
  });
  const containerRef = useRef(null);

  // Extract domain from URL
  useEffect(() => {
    const path = window.location.pathname;
    const extractedDomain = path.split('/')[1]; // Get the domain from /domain/pageName
    setDomain(extractedDomain);
  }, []);

  const { data, isLoading } = useGetMerchantTemplateByDomainQuery(domain);

  // Set the custom template once data is loaded
  useEffect(() => {
    if (!isLoading && data?.template?.customPages) {
      const page = data.template.customPages.find((page) => page.name === "${pageName}");
      if (page) {
        setCurrentTemplate(page);
      }
    }
  }, [data, isLoading]);

  // Control buttons or elements inside the rendered HTML
  useEffect(() => {
    if (containerRef.current) {
      const buttons = containerRef.current.querySelectorAll('button');

      buttons.forEach((button) => {
        const handler = () => {
          alert(\`Button clicked: \${button.innerText}\`);
        };

        button.removeEventListener('click', handler);
        button.addEventListener('click', handler);
      });
    }
  }, [currentTemplate]);

  return (
    <div className="w-full">
      <style>{currentTemplate.css}</style>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
    </div>
  );
};

export default ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page;
`,
  // Dynamic routes
  dynamicRoute: (domain, routeName) => `// app/${domain}/${routeName}/[id]/page.js
'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetMerchantTemplateByDomainQuery } from '@/lib/features/merchantTemplates/buyedTemplateApi';

const ${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Page = () => {
  const { id } = useParams();
  const [domain, setDomain] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState({
    html: \`<div class="loading-message">Loading ${routeName} page for ID: \${id}...</div>\`,
    css: \`.loading-message { padding: 2rem; color: gray; font-size: 1.25rem; }\`
  });

  // Extract domain from the pathname
  useEffect(() => {
    const path = window.location.pathname;
    const extractedDomain = path.split('/')[1]; // Assumes structure /domain/routeName/id
    setDomain(extractedDomain);
  }, []);

  const { data, isLoading } = useGetMerchantTemplateByDomainQuery(domain);

  useEffect(() => {
    if (!isLoading && data?.template?.customPages) {
      const dynamicPage = data.template.customPages.find(page => page.name === "${routeName}");
      if (dynamicPage) {
        const customizedHtml = dynamicPage.html.replace(/{productId}/g, id); // or use {id} if generic
        setCurrentTemplate({
          ...dynamicPage,
          html: customizedHtml
        });
      }
    }
  }, [data, isLoading, id]);

  return (
    <section className="w-full">
      <style>{currentTemplate.css}</style>
      <div dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
    </section>
  );
};

export default ${routeName.charAt(0).toUpperCase() + routeName.slice(1)}Page;
`,
  // Support files
  notFound: (domain) => `// app/${domain}/not-found.js
export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">${domain} Page Not Found</h2>
      <p className="text-lg text-gray-600">The requested resource doesn't exist</p>
    </div>
  )
}`
};

module.exports = shopTemplates;