import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AddNote from "../components/notes/AddNote";
import NotesList from "../components/notes/NotesList";
import Header from "../components/Header";
import NavButtons from "../components/notes/NavButtons";
import SearchBar from "../components/notes/SearchBar";
import NoteView from "../components/notes/NoteView";
import ShareNote from "../components/notes/ShareNote";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [notes, setNotes] = useState([]);
  const [view, setView] = useState("all");
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const notesPerPage = 3;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchNotes = async () => {
    const res = await getNotes(token);
    setNotes(res.data);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, []);

  const handleAddNote = async (noteData) => {
    try {
      await createNote(noteData, token);
      await fetchNotes();
      setView("all");
      toast.success("Note added successfully!");
    } catch {
      toast.error("Failed to add note");
    }
  };

  const handleUpdate = async (noteData) => {
    try {
      await updateNote(editingNote._id, noteData, token);
      await fetchNotes();
      setView("all");
      toast.success("Note updated successfully!");
    } catch {
      toast.error("Update failed");
    }
  };

  /* OPEN DELETE MODAL */
  const handleDelete = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  /* CONFIRM DELETE */
  const confirmDelete = async () => {
    if (!noteToDelete) return;

    await deleteNote(noteToDelete, token);
    fetchNotes();
    toast.success("Note deleted successfully!");

    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  /* SEARCH & PAGINATION */
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;

  const currentNotes = filteredNotes.slice(
    startIndex,
    startIndex + notesPerPage,
  );

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div>
      <div className="min-h-screen bg-black/30 backdrop-blur-sm p-4">
        <Header user={user} onLogout={handleLogout} />

        <div className="max-w-4xl mx-auto bg-white/90 shadow-xl rounded-2xl p-8 border border-gray-200">
          <NavButtons setView={setView} />

          {view === "all" && (
            <SearchBar search={search} setSearch={setSearch} />
          )}

          {view === "add" && <AddNote onAdd={handleAddNote} />}

          {view === "edit" && editingNote && (
            <AddNote onAdd={handleUpdate} existingNote={editingNote} />
          )}

          {view === "share" && selectedNote && (
            <ShareNote note={selectedNote} token={token} setView={setView} />
          )}

          {view === "view" && selectedNote && (
            <NoteView selectedNote={selectedNote} setView={setView} />
          )}

          {view === "all" && (
            <NotesList
              notes={notes}
              currentNotes={currentNotes}
              setSelectedNote={setSelectedNote}
              setView={setView}
              setEditingNote={setEditingNote}
              handleDelete={handleDelete}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Delete Note</h3>

            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this note?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
