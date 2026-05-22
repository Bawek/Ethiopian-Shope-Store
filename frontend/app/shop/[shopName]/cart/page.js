'use client'
import { useGetTemplateByIdQuery } from '@/lib/features/templates/templateApi';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const CartPage = () => {
    const params = useParams()
    const [currentTemplate, setCurrentTemplate] = useState({
        html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
        css: `h1{text-align:center;color:red;}`
    })
    const { data, isLoading } = useGetTemplateByIdQuery('74c94774-ae9f-4d1f-acbd-7680250aaa72');
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true)
        if (hasMounted && !isLoading) {
            console.log(data, 'total data')
            setTimeout(() => {
                data?.template.pages.map((page) => {
                    if (page.name === "cart") {
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

export default CartPage;