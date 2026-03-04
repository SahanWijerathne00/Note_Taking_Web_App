const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createNote, getNotes } = require("../controllers/noteController");

router.post("/", protect, createNote);
router.get("/", protect, getNotes);

module.exports = router;
