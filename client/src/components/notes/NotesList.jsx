import React from "react";

export default function NotesList({
  notes,
  currentNotes,
  setSelectedNote,
  setView,
  setEditingNote,
  handleDelete,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setCurrentPage,
}) {
  return (
    <>
      <div className="space-y-4">
        {currentNotes.length === 0 && (
          <p className="text-gray-500">No notes found.</p>
        )}

        {currentNotes.map((note) => (
          <div
            key={note._id}
            className="bg-indigo-50 p-5 rounded-xl shadow hover:shadow-md flex justify-between"
          >
            <div className="flex-1">
              <h3
                onClick={() => {
                  setSelectedNote(note);
                  setView("view");
                }}
                className="font-semibold text-lg text-indigo-800 cursor-pointer"
              >
                {note.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {note.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
              </p>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => {
                  setEditingNote(note);
                  setView("edit");
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setSelectedNote(note);
                  setView("share");
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-gray-300 px-4 py-2 rounded font-semibold disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 px-4 py-2 rounded font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
