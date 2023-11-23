export const defaultEditorContent = {
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