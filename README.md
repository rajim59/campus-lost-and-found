# 🎓 Campus Lost & Found Management System

A full-stack web application designed for university campuses to help students report lost items, find found belongings, and reconnect items with their rightful owners through a verified and secure platform.

---

## 📋 Table of Contents

* [Project Overview](#project-overview)
* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [API Documentation](#api-documentation)
* [User Roles](#user-roles)
* [Team Members](#team-members)
* [Project Status](#project-status)
* [License](#license)

---

## 📌 Project Overview

**Campus Lost & Found** is a secure platform that helps university students report lost or found belongings and reconnect them with their rightful owners.

Verified university students can:

* Report items they have **lost** or **found**
* Search and filter available posts
* Submit claims for found items
* Track their claim status
* Manage their own posts

To maintain trust and security, every student registration requires **admin approval**. Only verified students can create posts and submit claims.

---

## ✨ Key Features

### 🔐 Authentication & Verification

* Student registration using university ID
* Admin approval for new student registrations
* JWT-based authentication
* Password hashing using bcryptjs
* Separate admin login
* Role-based access control

### 📝 Post Management

* Create Lost/Found posts
* Upload up to 3 images per post
* Add custom categories and locations
* Edit own posts
* Delete own posts
* Track post status:

  * Open
  * Claimed
  * Resolved

### 🔍 Search & Filtering

* Keyword-based search
* Filter by Lost/Found type
* Filter by category
* Filter by location
* Pagination support

### 🛡️ Admin Panel

* Dedicated admin dashboard
* Approve or reject student registrations
* Moderate posts
* Delete inappropriate posts
* Manage submitted claims
* Accept or reject claims
* Manage claim deadlines

### 💬 Claim System

* Submit claims for found items
* View claim activity
* Track personal claim status
* Admin verification of claims
* Accept/reject claim functionality
* Automatic post status updates

---

## 🧰 Technology Stack

| Layer          | Technology                           |
| -------------- | ------------------------------------ |
| Frontend       | React 18, Tailwind CSS, Lucide Icons |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB, Mongoose                    |
| Authentication | JWT, bcryptjs                        |
| File Upload    | Multer                               |
| Routing        | React Router DOM v6                  |

---

## 📁 Project Structure

```text
campus-lost-found/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── routing/
│   │   │   └── shared/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* [Node.js](https://nodejs.org/) v18 or higher
* MongoDB or MongoDB Atlas
* npm or Yarn
* Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd campus-lost-found
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the required environment variables.

Then start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

### 4. Create Admin User

Run the following command once if the project includes the admin seed script:

```bash
cd backend
npm run seed:admin
```

### 🌐 Access the Application

| Service     | URL                                 |
| ----------- | ----------------------------------- |
| Frontend    | `http://localhost:5173`             |
| Backend API | `http://localhost:5000`             |
| Admin Login | `http://localhost:5173/admin/login` |

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/campus_lost_found
JWT_SECRET=your_super_secret_key
NODE_ENV=development

ADMIN_EMAIL=admin@campus.edu
ADMIN_PASSWORD=your_secure_admin_password
```

> **Security Note:** Never commit your `.env` file or real credentials to GitHub.

Add `.env` to your `.gitignore` file:

```gitignore
.env
node_modules/
uploads/
```

---

## 📡 API Documentation

### Authentication

| Method | Endpoint                | Description            | Access  |
| ------ | ----------------------- | ---------------------- | ------- |
| POST   | `/api/auth/register`    | Register a new student | Public  |
| POST   | `/api/auth/login`       | Student login          | Public  |
| POST   | `/api/auth/admin-login` | Admin login            | Public  |
| GET    | `/api/auth/me`          | Get current user       | Private |

### Posts

| Method | Endpoint         | Description                | Access           |
| ------ | ---------------- | -------------------------- | ---------------- |
| GET    | `/api/posts`     | Get all posts with filters | Public           |
| GET    | `/api/posts/:id` | Get a single post          | Public           |
| POST   | `/api/posts`     | Create a new post          | Verified Student |
| PUT    | `/api/posts/:id` | Update own post            | Post Owner       |
| DELETE | `/api/posts/:id` | Delete own post            | Post Owner       |

### Claims

| Method | Endpoint                | Description               | Access           |
| ------ | ----------------------- | ------------------------- | ---------------- |
| POST   | `/api/posts/:id/claim`  | Submit a claim            | Verified Student |
| GET    | `/api/posts/:id/claims` | Get claims for a post     | Public           |
| GET    | `/api/claims/my`        | Get current user's claims | Private          |

### Admin

| Method | Endpoint                       | Description         | Access |
| ------ | ------------------------------ | ------------------- | ------ |
| GET    | `/api/admin/pending-users`     | Get pending users   | Admin  |
| PUT    | `/api/admin/verify-user/:id`   | Approve/reject user | Admin  |
| GET    | `/api/admin/posts`             | Get all posts       | Admin  |
| DELETE | `/api/admin/posts/:id`         | Delete any post     | Admin  |
| GET    | `/api/admin/claims`            | Get all claims      | Admin  |
| PUT    | `/api/admin/claims/:id/accept` | Accept a claim      | Admin  |
| PUT    | `/api/admin/claims/:id/reject` | Reject a claim      | Admin  |

---

## 👥 User Roles

| Role                 | Capabilities                                      |
| -------------------- | ------------------------------------------------- |
| **Guest**            | View posts, search, and filter                    |
| **Verified Student** | Create, edit, and delete own posts; submit claims |
| **Admin**            | Verify users, moderate posts, and resolve claims  |

---

## 👨‍💻 Team Members

| Name             | Role                                                              |
| ---------------- | ----------------------------------------------------------------- |
| **Sobuj**        | Project Lead — Architecture, Authentication, Post & Claim Backend |
| **Atikul**       | Backend Developer — Post APIs & Student Pages                     |
| **Al Fahim**     | Admin Panel Developer                                             |
| **Abdur Rahman** | QA, Documentation & Public Pages                                  |

---

## 📊 Project Status

| Phase               | Status     |
| ------------------- | ---------- |
| Frontend Foundation | ✅ Complete |
| Backend Foundation  | ✅ Complete |
| Authentication      | ✅ Complete |
| Post Management     | ✅ Complete |
| Claim System        | ✅ Complete |
| Admin Panel         | ✅ Complete |
| Local Image Upload  | ✅ Complete |
| Final Testing       | ✅ Complete |

---

## 📄 License

This project was developed as an academic project for educational purposes.
