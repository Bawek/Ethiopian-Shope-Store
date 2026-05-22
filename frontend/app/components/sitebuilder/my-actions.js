'use client'
import axios from "axios"
import MyToast from "./my-toast"
import { useToast } from "@/hooks/use-toast"

export const saveContent = async (editor) => {
    try {
        const response = await axios.post('http://localhost:8000/api/pages/register', {
            html: editor.getHtml(),
            css: editor.getCss(),
            js: editor.getJs(),
            name: 'Home'
        })
        if (response.data?.status === 'success') {
            alert(response.data.message)
        }

    } catch (error) {
        console.log(error, 'create page')
        alert(error.message)
    }
}