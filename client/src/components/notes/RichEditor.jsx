import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";

import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

function MenuBar({ editor }) {
  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Enter Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const setColor = () => {
    const color = prompt("Enter color (red, blue, #ff0000)");
    if (color) editor.chain().focus().setColor(color).run();
  };

  return (
    <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
      {/* BASIC */}
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

      {/* HEADINGS */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="btn"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="btn"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="btn"
      >
        H3
      </button>

      {/* LISTS */}
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

      {/* ALIGN */}
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

      {/* BLOCKS */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="btn"
      >
        ❝
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="btn"
      >
        {"</>"}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="btn"
      >
        ―
      </button>

      {/* COLORS */}
      <button type="button" onClick={setColor} className="btn">
        🎨
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className="btn"
      >
        🖍
      </button>

      {/* MEDIA */}
      <button type="button" onClick={addImage} className="btn">
        🖼
      </button>
      <button type="button" onClick={addLink} className="btn">
        🔗
      </button>

      {/* TABLE */}
      <button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className="btn"
      >
        Table
      </button>

      {/* UNDO REDO */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="btn"
      >
        ↶
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="btn"
      >
        ↷
      </button>
    </div>
  );
}

export default function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Link,
      Image,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />

      <EditorContent
        editor={editor}
        className="min-h-[200px] p-4 focus:outline-none prose max-w-none"
      />
    </div>
  );
}
