'use client'
import React, { useEffect, useState } from "react";
import "bootstrap";
import '../../../styles/bootstrap.scss'
import '../../../styles/mystyle.css'
import axios from "axios";
import geditorConfig from "../../system-admin/api_urls/geditor_config";
import PageSection from "../../system-admin/components/PageSection";
import Sidebar from "../../system-admin/components/Sidebar";
import TopNav from "../../system-admin/components/TopNav";
import { API_HOST } from "../../system-admin/api_urls/geditor_utils";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Editor = () => {
    const [editor, setEditor] = useState(null);
    const [assets, setAssets] = useState([]);
    const currentPage = useSelector((state) => state.currentPage)
    const { templateId } = useParams();
    const [pages, setPages] = useState([])
    const fetchPages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/pages/get-all')
            console.log(response)
            if (response.data.status === 'success') {
                setPages(response.data?.pages)
            }
        } catch (error) {
            console.log('template creation error', error)
            toast.error('something go wrong')
        }
    }
    useEffect(() => {
        fetchPages()
    }, [currentPage, editor])

    useEffect(() => {
        async function getAllAssets() {
            try {
                const response = await axios.get(`${API_HOST}assets/`);
                setAssets(response.data);
            } catch (error) {
                setAssets(error.message);
            }
        }
        // getAllAssets();
    }, []);
    useEffect(() => {
        const editor = geditorConfig(assets, currentPage);
        setEditor(editor);
    }, [currentPage, assets]);
    const onLoad = () => {
        if (editor) {
            editor.setComponents(currentPage?.html);
            editor.setStyle(currentPage?.css);
        }
        else {
            console.log(editor, 'editor')
        }
    };
    useEffect(() => {

        if (editor) {
            onLoad(editor)
        }
    }, [editor, currentPage]);
    return (
        <div className="App">
            <div
                id="navbar"
                className="sidenav d-flex flex-column overflow-scroll position-fixed"
            >
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h3 logo">Admin Builder</span>
                    </div>
                </nav>
                <PageSection templateId={templateId} />
                <Sidebar />
            </div>
            <div
                className="main-content position-relative w-85 start-15"
                id="main-content"
            >
                <TopNav />
                <div id="editor"></div>
            </div>
        </div>
    );
};

export default Editor;


