"use client"

import { Editor as NovelEditor } from "novel";
import { defaultEditorContent } from "./default-content";
import { Editor } from '@tiptap/core'


export default function NovelOnClient() {

    function onUpdate(editor: Editor | undefined) {
        console.log(editor?.getJSON())
        
    }

    return (
        <main className="flex h-full flex-col items-center justify-between sm:p-4 xl:p-8">
        <NovelEditor
            defaultValue={defaultEditorContent}
            onUpdate={onUpdate}
        />
        </main>
    )
}