import React from "react";

export default function NoteView({ selectedNote, setView }) {
  return (
    <div className="bg-indigo-50 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700">
        {selectedNote.title}
      </h2>
      <p className="mt-4 text-gray-700 whitespace-pre-line">
        {selectedNote.content}
      </p>
      <button
        onClick={() => setView("all")}
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
}
