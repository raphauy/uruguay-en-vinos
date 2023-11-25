"use client"

import { toast } from "@/components/ui/use-toast"
import { Download, Upload } from "lucide-react"
import { CldUploadButton } from "next-cloudinary"
import { useEffect, useState } from "react"
import { addFileAction, getArticleDAOAction, getFilesDAOAction } from "../article-actions"
import { FileDAO, FileFormValues } from "@/services/article-services"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
    articleId: string
}

export default function FilesSection({ articleId }: Props) {

    const [files, setFiles] = useState<FileDAO[]>([])

    useEffect(() => {
        getFilesDAOAction(articleId)
        .then((files) => {
            if (!files) {
                return
            }
            console.log("Files: " + files);
            
            setFiles(files)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [articleId])
    

    function handleUpload(result: any) {
        const fileInfo: string = result.info
        console.log(fileInfo);
        console.log("public_id: " + result.info.public_id);
        console.log("original_filename: " + result.info.original_filename);
        console.log("bytes: " + result.info.bytes);
        console.log("format: " + result.info.format);
        console.log("secure_url: " + result.info.secure_url);
        console.log("thumbnail_url: " + result.info.thumbnail_url);
        const file: FileFormValues = {
            public_id: result.info.public_id,
            original_filename: result.info.original_filename,
            bytes: result.info.bytes,
            format: result.info.format,
            secure_url: result.info.secure_url,
            thumbnail_url: result.info.thumbnail_url,
        }
        

        addFileAction(articleId, file)
        .then((file) => {
            if (!file) {
                return
            }
            setFiles([...files, file])
            toast({ title: "File uploaded"})
        })
        .catch((err) => {
            console.error(err)
            toast({ title: "Error uploading file"})
        })
    }
    
    return (
        <div className="w-full border rounded-lg p-5 space-y-10">
            <div className="flex gap-5 ">
                <p>Files:</p>
                <div className="grid gap-2">
                    {
                        files.map((file) => {
                            const format= file.format ? "." + file.format : ""
                            const fileName = file.original_filename + format
                            return (
                            <Link key={file.id} href={file.secure_url} target="_blank">
                                <Button className="space-x-2 w-full">
                                    <p>{fileName}</p>
                                    <Download />
                                </Button>
                            </Link>              
                        )})
                    }

                    <CldUploadButton
                        options={{maxFiles: 1, tags: ["uruguay-in-wines-files",]}}
                        onUpload={handleUpload}
                        uploadPreset="uruguay-en-vinos"
                    >
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <Upload size={24} /> Upload file
                        </div>
                    </CldUploadButton>
                </div>
            </div>


        </div>
  )
}
