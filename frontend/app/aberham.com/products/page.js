'use client'
import React, { useEffect, useState } from 'react';
import { useTemplate } from '../layout';

const Products = () => {
  const { domain, data, isLoading } = useTemplate();
  const [currentTemplate, setCurrentTemplate] = useState({
    html: '<div class="products-loading">Loading products...</div>',
    css: `.products-loading { padding: 2rem; text-align: center; }`
  });

  useEffect(() => {
    if (!isLoading && data?.template?.customPages) {
      const productsPage = data.template.customPages.find(page => page.name === "products");
      if (productsPage) setCurrentTemplate(productsPage);
    }
  }, [data, isLoading]);

  return (
    <div className="products-page">
      <style>{currentTemplate.css}</style>
      <div dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
    </div>
  );
};

export default Products;