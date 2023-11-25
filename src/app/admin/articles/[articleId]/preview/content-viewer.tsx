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
        // content: {
        //     type: 'doc',
        //     content: JSON.parse(content),
        // },        
        content: content,
        editable: false,
      })

    const editorProps = {
        editable: () => false
    }

    return (
        <div className="flex h-full min-w-[1000px] border rounded-lg flex-col items-center gap-4 justify-between sm:p-4 xl:p-8">
            <NovelEditor
                className="h-full w-full"
                defaultValue={JSON.parse(content)}
                disableLocalStorage
                editorProps={editorProps}
            />
        </div>
    )
}
