'use client'

import { useToast } from "@/hooks/use-toast"

const MyToast = ({
    title,
    description,
    varriant
}) => {
    const { toast } = useToast()
    console.log(title,description,varriant,'toasting')
    return (
        toast({
            title,
            description,
            varriant
        })
    )
}

export default MyToast
