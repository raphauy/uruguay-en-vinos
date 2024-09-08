"use client"

import { useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import { Editor as NovelEditor } from "novel";

type Props = {
    content: string
}
export default function ContentViewer({ content }: Props) {

    const editor = useEditor({
        extensions: [
          StarterKit,
        ],
        content: content,
        editable: false,
      })

    const editorProps = {
        editable: () => false
    }

    return (
        <div className="flex h-full border rounded-lg justify-center p-1 md:p-4 xl:p-8 w-full">
            <NovelEditor
                className="h-full w-full"
                defaultValue={JSON.parse(content)}
                disableLocalStorage
                editorProps={editorProps}
            />
        </div>
    )
}
