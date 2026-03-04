const Note = require("../models/Note");

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      owner: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET MY NOTES (with search + pagination)
exports.getNotes = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const query = {
      isDeleted: false,
      $or: [{ owner: req.user._id }, { collaborators: req.user._id }],
      title: { $regex: search, $options: "i" },
    };

    const notes = await Note.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note || note.isDeleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Only owner or collaborator can update
    if (
      note.owner.toString() !== req.user._id.toString() &&
      !note.collaborators.includes(req.user._id)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// SOFT DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.isDeleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Only owner can delete
    if (note.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can delete" });
    }

    note.isDeleted = true;
    await note.save();

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
