import React from "react";

export default function NavButtons({ setView }) {
  return (
    <div className="flex justify-center gap-6 mb-6">
      <button
        onClick={() => setView("all")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
      >
        All Notes
      </button>
      <button
        onClick={() => setView("add")}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold text-lg"
      >
        Add Note
      </button>
    </div>
  );
}
