"use client"

import { toast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"
import { useEffect, useState } from "react"
import { addImageAction, getArticleDAOAction } from "../article-actions"

type Props = {
    articleId: string
}

export default function ImageSection({ articleId }: Props) {

    const [image, setImage] = useState("")

    useEffect(() => {
        getArticleDAOAction(articleId)
        .then((article) => {
            if (!article) {
                return
            }
            const image= article.image
            if (!image) {
                return
            }            
            setImage(image)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [articleId])
    

    function handleUpload(result: any) {
        const imageUrl: string = result.info.secure_url        

        addImageAction(articleId, imageUrl)
        .then((article) => {
            if (!article?.image) {
                return
            }
            setImage(article.image)
            toast({ title: "Image uploaded"})
        })
        .catch((err) => {
            console.error(err)
            toast({ title: "Error uploading image"})
        })
    }
    
    return (
        <div className="hidden md:block min-w-[150px]">

            <CldUploadButton
                options={{maxFiles: 1, tags: ["uruguay-in-wines-files",]}}
                onUpload={handleUpload}
                uploadPreset="uruguay-en-vinos"
            >
                <Image src={image} width={150} height={100} alt="Article Image" className="rounded-lg"/>

            </CldUploadButton>

        </div>
  )
}
