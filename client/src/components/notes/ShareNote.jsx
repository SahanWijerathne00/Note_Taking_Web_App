import { useState } from "react";
import { shareNote } from "../../services/noteService";
import { toast } from "react-toastify";

export default function ShareNote({ note, token, setView }) {
  const [email, setEmail] = useState("");

  const handleShare = async () => {
    try {
      await shareNote(note._id, email, token);
      toast.success("Collaborator added!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sharing note");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Share Note</h2>

      <input
        type="email"
        placeholder="Enter collaborator email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleShare}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>

        <button
          type="button"
          onClick={() => setView("all")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
