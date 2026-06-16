require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/books");

const app = express();
const books = [];

// ── Connect to MongoDB ──────────────────────
connectDB();

// ── Middleware ──────────────────────────────
app.use(express.json());

// ── Routes ──────────────────────────────────
app.use("/api/books", bookRoutes);

// ── Root health-check ────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "📚 Welcome to Mugisha's Bookstore API — Kigali",
    endpoints: {
      "POST   /api/books":     "Add a new book",
      "GET    /api/books":     "Get all books",
      "GET    /api/books/:id": "Get a book by ID",
      "PUT    /api/books/:id": "Update a book by ID",
      "DELETE /api/books/:id": "Delete a book by ID",
    },
  });
});

// ── 404 handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler ─────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// ── Start server ─────────────────────────────
app.listen(3000, () => {
  console.log(`🚀 Mugisha's Bookstore API running on http://localhost:3000`);
});