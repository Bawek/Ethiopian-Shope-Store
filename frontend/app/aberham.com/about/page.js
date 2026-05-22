'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from '../layout';

const About = () => {
    const { domain, data, isLoading } = useTemplate();
  const [currentTemplate, setCurrentTemplate] = useState({
    html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
    css: `h1{text-align:center;color:red;}`
  });
  const containerRef = useRef(null);

  console.log(data, isLoading, domain,'data')
  // Set the custom template once data is loaded
  useEffect(() => {
    if (!isLoading && data?.template?.customPages) {
      const aboutpage = data.template.customPages.find((page) => page.name === "about");
      if (aboutpage) {
        setCurrentTemplate(aboutpage);
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

export default About;
