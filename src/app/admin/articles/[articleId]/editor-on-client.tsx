"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Editor, JSONContent } from '@tiptap/core';
import { Loader } from "lucide-react";
import { Editor as NovelEditor } from "novel";
import { useState } from "react";
import { updateContentAction } from "../article-actions";
import Link from "next/link";

type Props = {
    articleId: string
    initialContent: string
}

export default function NovelOnClient({ articleId, initialContent }: Props) {

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState<string>(initialContent)

    function onUpdate(editor: Editor | undefined) {
        if (!editor) {
            return
        }
        setContent(JSON.stringify(editor.getJSON()))
    }

    function save() {
        setLoading(true);
        updateContentAction(articleId, content)
        .then(() => {
            toast({ title: "Content saved"})
        })
        .catch(() => {
            toast({ title: "Failed to save content"})
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return (
        <main className="flex h-full min-w-[1000px] flex-col items-center gap-4 justify-between sm:p-4 xl:p-8">
            <div className="flex justify-end w-full">
                <Button variant="default" className="w-32 ml-2" onClick={save}>
                {loading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                ) : (
                    <p>Save</p>
                )}
                </Button>
                <Link href={`/admin/articles/${articleId}/preview`} target="_blank">
                    <Button variant="default" className="w-32 ml-2">                    
                        <p>Preview</p>
                    </Button>
                </Link>

            </div>
            <NovelEditor
                defaultValue={content ? JSON.parse(content) : {}}
                onUpdate={onUpdate}      
                disableLocalStorage
            />
        </main>
    )
}


const defaultEditorContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Introducción a Tinta Blog" }],
      },
      {
        type: "paragraph",
        content: [
            {
                type: "text",
                text: "Tinta Blog utiliza Novel, un editor WYSIWYG al estilo de Notion con autocompletado impulsado por IA.",
            },
        ],
      },
      {
        type: "paragraph",
        content: [
            {
                type: "text",
                text: "Prueba digitando la barra diagonal / al inicio de un párrafo para ver las opciones de autocompletado.",
            },
        ],
      },    ],
  };