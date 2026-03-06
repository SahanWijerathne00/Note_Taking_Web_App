import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function AddNote({ onAdd, existingNote }) {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: existingNote?.content || "",
  });

  useEffect(() => {
    if (existingNote) setTitle(existingNote.title);
  }, [existingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !editor) return;

    const content = editor.getHTML(); // Get HTML content from editor
    onAdd({ title, content });
    setTitle("");
    editor.commands.setContent(""); // Clear editor
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {existingNote ? "Edit Note" : "Add Note"}
      </h2>

      <input
        type="text"
        placeholder="Note Title"
        className="w-full border p-2 rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="border p-2 rounded mb-3">
        <EditorContent editor={editor} />
      </div>

      <button className="bg-indigo-600 text-white px-4 py-2 rounded">
        {existingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
