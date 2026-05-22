'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from './layout';
const EcommerceTemplate = () => {
  const { domain, data, isLoading } = useTemplate();
  const [currentTemplate, setCurrentTemplate] = useState({
    html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
    css: `h1{text-align:center;color:red;}`
  });
  console.log(data)
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
      // Example: Add click event to all buttons inside the loaded HTML
      const buttons = containerRef.current.querySelectorAll('button');

      buttons.forEach((button) => {
        const handler = () => {
          alert(`Button clicked: ${button.innerText}`);
          // You can also add conditional logic here:
          // if (button.id === 'buy-now') { ... }
        };

        // Avoid multiple bindings
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

export default EcommerceTemplate;
