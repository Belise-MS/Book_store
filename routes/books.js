const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// ─────────────────────────────────────────────
// POST /api/books  — Add a new book
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const book = new Book({ title, author, price });
    const savedBook = await book.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: savedBook,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ─────────────────────────────────────────────
// GET /api/books  — Return all books
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ─────────────────────────────────────────────
// GET /api/books/:id  — Return one book by ID
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    // Invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid book ID format" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ─────────────────────────────────────────────
// PUT /api/books/:id  — Update a book
// ─────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price },
      {
        new: true,           // return the updated document
        runValidators: true, // run schema validators on update
      }
    );

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid book ID format" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/books/:id  — Delete a book
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid book ID format" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
