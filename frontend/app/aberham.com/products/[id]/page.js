'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTemplate } from '../../layout';

const ProductDetail = () => {
  const { domain, data, isLoading } = useTemplate();

  const { id } = useParams();
  const [currentTemplate, setCurrentTemplate] = useState({
    html: `<div class="product-detail-loading">Loading product ${id}...</div>`,
    css: `.product-detail-loading { padding: 2rem; }`
  });

  useEffect(() => {
    if (!isLoading && data?.template?.customPages) {
      const productDetailPage = data.template.customPages.find(page => page.name === "product-detail");
      if (productDetailPage) {
        // You can dynamically insert the product ID into the template
        let customizedHtml = productDetailPage.html.replace(/{productId}/g, id);
        setCurrentTemplate({
          ...productDetailPage,
          html: customizedHtml
        });
      }
    }
  }, [data, isLoading, id]);

  return (
    <div className="product-detail-page">
      <style>{currentTemplate.css}</style>
      <div dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
    </div>
  );
};

export default ProductDetail;