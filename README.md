<<<<<<< HEAD

# 📚 Mugisha's Bookstore API — Kigali

A RESTful API built with **Express** and **MongoDB (Mongoose)** to manage books in Mugisha's bookstore.

---

## 🗂 Project Structure

```
bookstore/
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   └── Book.js        # Mongoose Book schema
├── routes/
│   └── books.js       # All CRUD routes
├── .env.example       # Environment variable template
├── package.json
└── server.js          # Express app entry point
```

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mugisha_bookstore
```

### 3. Start the server

```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| POST   | /api/books     | Add a new book   |
| GET    | /api/books     | Get all books    |
| GET    | /api/books/:id | Get a book by ID |
| PUT    | /api/books/:id | Update a book    |
| DELETE | /api/books/:id | Delete a book    |

---

## 🧪 Example Requests

### Add a book

```http
POST /api/books
Content-Type: application/json

{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "price": 2500
}
```

### Get all books

```http
GET /api/books
```

### Get one book

```http
GET /api/books/64f1a2b3c4d5e6f7a8b9c0d1
```

### Update a book

```http
PUT /api/books/64f1a2b3c4d5e6f7a8b9c0d1
Content-Type: application/json

{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "price": 3000
}
```

### Delete a book

```http
DELETE /api/books/64f1a2b3c4d5e6f7a8b9c0d1
```

---

## 📦 Book Model

| Field  | Type   | Required | Notes       |
| ------ | ------ | -------- | ----------- |
| title  | String | ✅ Yes   | Book title  |
| author | String | ✅ Yes   | Author name |
| price  | Number | ✅ Yes   | Must be ≥ 0 |

Mongoose automatically adds `createdAt` and `updatedAt` timestamps.

---

## 🔁 Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

# Errors return `"success": false` with an appropriate HTTP status code (`400`, `404`, `500`).
