'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useTemplate } from '../layout';

const Contact = () => {
  const { domain, data, isLoading } = useTemplate();
  const [currentTemplate, setCurrentTemplate] = useState({
    html: '<div class="contact-loading">Loading contact form...</div>',
    css: `.contact-loading { padding: 2rem; text-align: center; color: #666; }`
  });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isLoading && data?.template?.customPages) {
      const contactPage = data.template.customPages.find(page => page.name === "contact");
      if (contactPage) setCurrentTemplate(contactPage);
    }
  }, [data, isLoading]);

  // Handle form submissions
  useEffect(() => {
    if (containerRef.current) {
      const forms = containerRef.current.querySelectorAll('form');
      forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Contact form submitted!');
          // Add your form submission logic here
        });
      });
    }
  }, [currentTemplate]);

  return (
    <div className="contact-page">
      <style>{currentTemplate.css}</style>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
    </div>
  );
};

export default Contact;