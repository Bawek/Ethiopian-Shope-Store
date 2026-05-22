'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { fields } from '../../lib/template-uload-form-controls'
import { pageSchema } from '../../lib/templateValidation'
import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { CustomForm } from '@/app/components/forms/common-form/my-form'

const EditTemplate = () => {
    const params = useParams()
    const { toast } = useToast()
    const router = useRouter()
    const [file, setFile] = useState()
    const handleSubmit = async (data) => {
        console.log('form data', data)
        const formData = new FormData()
        formData.append('status', data.status)
        formData.append('name', data.name)
        formData.append('basePrice', data.basePrice)
        formData.append('previewUrls', data.previewUrls)
        formData.append('description', data.description)
        try {
            const response = await axios.put(`http://localhost:8000/api/templates/update/${templateId}`, formData)
            if (response.data.status !== 'success') {
                return toast({
                    title: "Error",
                    description: <code className="text-black"> {response?.data?.message || 'something go wrong'}</code>,
                    variant: "destructive",
                    duration: 3000,
                });

            }
            toast({
                title: 'Success',
                description: <p className="text-black"> {response?.data?.message || 'Successfully add the Template'}</p>,
                variant: "default",
                duration: 3000,
            })
            router.push('/system-admin/manage-template')

        } catch (error) {
            console.log('template creation error', error)
            toast({
                title: "Error",
                description: <p className="text-black"> {"sorry something go wrong"}</p>,
                variant: "destructive",
                duration: 3000,
            });
        }
    }
    const templateId = params.templateId
    const [template, setTemplate] = useState(null)
    const fetchTemplate = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/templates/get/${templateId}`)
            if (response.data.status !== "success") {
                return console.log('some error ocur')
            }
            setTemplate(response.data?.template)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (templateId) {
            fetchTemplate()
        }
    }, [templateId])
    return (
        <div className='pb-5 flex flex-col items-center justify-center w-full'>
            <h1 className='text-2xl font-bold mb-4'>Edit Template</h1>
            <div className='max-w-md'>
                <CustomForm
                    fields={fields}
                    onSubmit={handleSubmit}
                    schema={pageSchema}
                    file={file}
                    setFile={setFile}
                    data={template}

                />
            </div>
        </div>
    )
}

export default EditTemplate
