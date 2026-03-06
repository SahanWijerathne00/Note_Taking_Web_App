import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AddNote from "../components/notes/AddNote";
import NotesList from "../components/notes/NotesList";
import Header from "../components/Header";
import NavButtons from "../components/notes/NavButtons";
import SearchBar from "../components/notes/SearchBar";
import NoteView from "../components/notes/NoteView";

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
    await createNote(noteData, token);
    fetchNotes();
    setView("all");
    toast.success("Note added successfully!");
  };

  const handleUpdate = async (noteData) => {
    await updateNote(editingNote._id, noteData, token);
    fetchNotes();
    setView("all");
    toast.success("Note updated successfully!");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    await deleteNote(id, token);
    fetchNotes();
  };

  /* -------- SEARCH & PAGINATION -------- */
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

  useEffect(() => setCurrentPage(1), [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <Header user={user} onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <NavButtons setView={setView} />
        {view === "all" && <SearchBar search={search} setSearch={setSearch} />}
        {view === "add" && <AddNote onAdd={handleAddNote} />}
        {view === "edit" && editingNote && (
          <AddNote onAdd={handleUpdate} existingNote={editingNote} />
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
  );
}
