'use client'
import { useGetTemplateByIdQuery } from '@/lib/features/templates/templateApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// const [currentTemplate] = useState({
//   html: `
//     <main class="main-content">
//       <section class="hero">
//         <h1>Welcome to Our Store</h1>
//         <p>Discover amazing products at great prices</p>
//         <button class="cta-button">Shop Now</button>
//       </section>

//       <section class="features">
//         <div class="feature-card">
//           <h3>Free Shipping</h3>
//           <p>On all orders over $50</p>
//         </div>
//         <div class="feature-card">
//           <h3>24/7 Support</h3>
//           <p>Dedicated customer service</p>
//         </div>
//         <div class="feature-card">
//           <h3>Easy Returns</h3>
//           <p>30-day return policy</p>
//         </div>
//       </section>
//     </main>

//     <footer class="footer">
//       <div class="footer-content">
//         <p>&copy;${new Date().getFullYear()} All rights reserved.</p>
//         <div class="social-links">
//           <a href="#"><i class="fab fa-facebook"></i></a>
//           <a href="#"><i class="fab fa-twitter"></i></a>
//           <a href="#"><i class="fab fa-instagram"></i></a>
//         </div>
//       </div>
//     </footer>
//   `,
//   css: ` 
//     .main-content {
//       max-width: 1200px;
//       margin: 2rem auto;
//       padding: 0 1rem;
//     }

//     .hero {
//       text-align: center;
//       padding: 4rem 0;
//       background-color: var(--light-bg);
//       border-radius: 8px;
//       margin-bottom: 2rem;
//     }

//     .hero h1 {
//       font-size: 2.5rem;
//       color: var(--text-color);
//       margin-bottom: 1rem;
//     }

//     .cta-button {
//       background-color: var(--primary-color);
//       color: white;
//       padding: 0.75rem 2rem;
//       border: none;
//       border-radius: 4px;
//       cursor: pointer;
//       transition: background-color 0.2s;
//     }

//     .cta-button:hover {
//       background-color: var(--secondary-color);
//     }

//     .features {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//       gap: 1.5rem;
//     }

//     .feature-card {
//       padding: 1.5rem;
//       background-color: white;
//       border-radius: 8px;
//       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//       text-align: center;
//     }

//     .footer {
//       background-color: var(--text-color);
//       color: white;
//       padding: 2rem 0;
//       margin-top: auto;
//     }

//     .footer-content {
//       max-width: 1200px;
//       margin: 0 auto;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//     }

//     .social-links {
//       display: flex;
//       gap: 1rem;
//     }

//     .social-links a {
//       color: white;
//       font-size: 1.25rem;
//     }

//     @media (max-width: 768px) {
//       .navbar {
//         flex-direction: column;
//         gap: 1rem;
//       }

//       .hero h1 {
//         font-size: 2rem;
//       }
//     }
//   `
// });
const EcommerceTemplate = () => {
  const params = useParams()
  // const status = useSelector((state) => state.status.status);
  const [currentTemplate, setCurrentTemplate] = useState({
    html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
    css: `h1{text-align:center;color:red;}`
  })
  const templateId = params.templateId;
  const { data, isLoading } = useGetTemplateByIdQuery('74c94774-ae9f-4d1f-acbd-7680250aaa72');
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true)
    if (hasMounted && !isLoading) {
      console.log(data, 'total data')
      setTimeout(() => {
        data?.template.pages.map((page) => {
          if (page.name === "home") {
            setCurrentTemplate(page)
          }
        })
      }, 3000)
    }
  }, [data]);
  console.log(currentTemplate, 'current page')
  return (
    <div className="w-full">
      <style>{currentTemplate.css}</style>
      <div dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
    </div>
  );
};

export default EcommerceTemplate;