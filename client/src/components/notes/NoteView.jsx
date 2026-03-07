import React from "react";

export default function NoteView({ selectedNote, setView }) {
  return (
    <div className="bg-indigo-50 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700">
        {selectedNote.title}
      </h2>
      <p className="mt-4 text-gray-700 whitespace-pre-line">
        {selectedNote.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
      </p>

      <h3 className="font-semibold mt-4">Collaborators</h3>

      <ul className="list-disc ml-6">
        {selectedNote.collaborators?.length > 0 ? (
          selectedNote.collaborators.map((c) => (
            <li key={c._id}>{c.email || c.name}</li>
          ))
        ) : (
          <li>No collaborators</li>
        )}
      </ul>

      <button
        onClick={() => setView("all")}
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
}
