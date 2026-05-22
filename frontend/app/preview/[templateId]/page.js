"use client";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation"; // Import useRouter from next/router
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTemplateByIdQuery } from "@/lib/features/templates/templateApi";
function PreviewPage() {
    const params = useParams()
    const status = useSelector((state) => state.status.status);
    const [currentTemplate, setCurrentTemplate] = useState({
        html: '<h1 className="text-center text-red-600"> loading the page ... </h1>',
        css: `h1{text-align:center;color:red;}`
    })
    const [header, setHeader] = useState('')
    const [footer, setFooter] = useState('')
    console.log(params, 'parms')
    const templateId = params.templateId;
    const { data, isLoading, isError } = useGetTemplateByIdQuery(templateId);
    console.log(data, isError, templateId, 'preview')
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
                    if (page.name === "header") {
                        setHeader(page)
                    }
                    if (page.name === "footer") {
                        setFooter(page)
                    }
                })
            }, 3000)
        }
    }, [data]);
    return (
        <>
            <style>{header?.css}</style>
            <style>{currentTemplate?.css}</style>
            <style>{footer?.css}</style>
            {/* {finalContent ? ( */}
            <header>
                <div dangerouslySetInnerHTML={{ __html: header.html }} />
            </header>
            <main>
                <div dangerouslySetInnerHTML={{ __html: currentTemplate.html }} />
            </main>
            <footer>
                <div dangerouslySetInnerHTML={{ __html: footer.html }} />
            </footer>
            {/* ) : (
         <div dangerouslySetInnerHTML={{ __html: data?.html }} />
         )}{" "} */}
            {/* <div dangerouslySetInnerHTML={{ __html: modifiedHtml }} /> */}
        </>
    );
}

export default PreviewPage;
