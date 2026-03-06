import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

function MenuBar({ editor }) {
  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b p-2 bg-gray-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="btn"
      >
        <b>B</b>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="btn"
      >
        <i>I</i>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="btn"
      >
        <u>U</u>
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className="btn"
      >
        S
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className="btn"
      >
        {"{ }"}
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="btn"
      >
        • List
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="btn"
      >
        1. List
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className="btn"
      >
        ⬅
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className="btn"
      >
        ⬌
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className="btn"
      >
        ➡
      </button>

      <button type="button" onClick={addImage} className="btn">
        🖼
      </button>

      <button
        type="button"
        onClick={() => {
          const url = prompt("Enter URL");
          editor.chain().focus().setLink({ href: url }).run();
        }}
        className="btn"
      >
        🔗
      </button>
    </div>
  );
}

export default function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Begin typing...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value) {
      editor.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />

      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
}
