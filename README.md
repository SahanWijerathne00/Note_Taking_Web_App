# MERN Collaborative Notes App

A full-stack **collaborative notes application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.

Users can create notes, edit them using a **rich text editor**, search notes, paginate results, and **share notes with collaborators**.

---

# Features

## Authentication

- User registration
- User login
- JWT authentication
- Protected API routes

## Notes Management

- Create notes
- Edit notes
- Delete notes
- Rich text editor for formatting content

## Search & Pagination

- Search notes by title
- Paginated notes list

## Collaboration

- Share notes with other users
- Collaborators can access shared notes

---

# Tech Stack

## Frontend (`client`)

- React
- React Router
- Axios
- Rich Text Editor

## Backend (`server`)

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# Project Structure

```bash
Note_Taking_Web_App
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
└── README.md
```

---

# Environment Variables

Create a `.env` file inside the **server folder**.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

---

# `.env.example`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

---

# Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/SahanWijerathne00/Note_Taking_Web_App.git
cd Note_Taking_Web_App
```

---

# 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

Run backend server:

```bash
npm run dev
```

or

```bash
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

# 3️⃣ Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Overview

## Authentication

POST `/api/auth/register`
POST `/api/auth/login`

## Notes

GET `/api/notes`
POST `/api/notes`
PUT `/api/notes/:id`
DELETE `/api/notes/:id`

## Collaboration

POST `/api/notes/:id/share`
GET `/api/notes/shared`

---

# Assumptions

Some assumptions were made during development:

- Only the **note owner** can delete a note
- Collaborators can **view & edit shared notes**. Can't **delete & share notes**.
- Authentication is required for all note operations

---

# Author

Developed - **Sahan Wijerathne**.
