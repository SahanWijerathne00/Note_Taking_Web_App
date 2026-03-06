import { useState, useEffect } from "react";
import RichEditor from "./RichEditor";

export default function AddNote({ onAdd, existingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
    }
  }, [existingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      title,
      content,
    });

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Add Note</h2>

      <input
        type="text"
        placeholder="Note Title"
        className="w-full border p-2 rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <RichEditor value={content} onChange={setContent} />

      <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
        {existingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
