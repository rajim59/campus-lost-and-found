# 🎓 Campus Lost & Found Management System

A full-stack web application designed for university campuses to help students report lost items, find found belongings, and reconnect with their owners through a verified and secure platform.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Team Members](#team-members)
- [Project Status](#project-status)
- [License](#license)

---

## 📌 Project Overview

Campus Lost & Found is a platform where verified university students can:

- Post items they have **lost** or **found**
- Search and filter posts by category, location, and status
- Submit claims on found items
- Track claim status through admin verification
- Manage their own posts

The system ensures trust by requiring **admin approval** for every student registration. Only verified students can create posts and submit claims.

---

## ✨ Key Features

### 🔐 Authentication & Verification

- Student registration with university ID
- Admin approval for new registrations
- JWT-based authentication
- Separate admin login panel
- Role-based access control

### 📝 Post Management

- Create Lost/Found posts
- Upload up to 3 images per post
- Custom category and location input
- Edit and delete own posts
- Post status tracking (Open → Claimed → Resolved)

### 🔍 Search & Filter

- Keyword search
- Filter by type (Lost/Found)
- Filter by category
- Filter by location
- Pagination

### 🛡️ Admin Panel

- Dedicated admin dashboard
- User verification (approve/reject)
- Post moderation (delete inappropriate posts)
- Claim management (accept/reject with deadlines)

### 💬 Claim System

- Submit claim on found items
- Finders can claim lost items
- Public claim activity section showing name, ID, and message
- Admin resolves claims with accept/reject actions
- Automatic status updates

---

## 🧰 Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 18, Tailwind CSS, Lucide Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| File Upload | Multer (local storage) |
| Routing | React Router DOM v6 |

---

## 📁 Folder Structure

```text
campus-lost-found/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI components (Locked)
│   │   │   ├── layout/         # Page layouts (Locked)
│   │   │   ├── routing/        # Route guards (Locked)
│   │   │   └── shared/         # Page-specific components (Open)
│   │   ├── pages/              # All page components (Open)
│   │   ├── contexts/           # AuthContext (Locked)
│   │   ├── services/           # API service layer (Locked)
│   │   ├── utils/              # Constants & helpers (Locked)
│   │   ├── App.jsx             # Main routing (Locked)
│   │   └── main.jsx            # Entry point (Locked)
│   ├── tailwind.config.js      # Design tokens (Locked)
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection (Locked)
│   ├── models/                 # Database schemas (Locked)
│   ├── routes/                 # API routes (Locked)
│   ├── controllers/            # Business logic (Open)
│   ├── middleware/             # Auth, upload, error handlers (Locked)
│   ├── utils/                  # Helper functions (Locked)
│   ├── uploads/                # Local image storage
│   ├── app.js                  # Express app config (Locked)
│   └── server.js               # Server bootstrap (Locked)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd campus-lost-found
```

#### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret

npm run dev
```

#### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

#### 4. Create admin user (one time)

```bash
cd backend
npm run seed:admin
```

### Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Login: http://localhost:5173/admin/login

---

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/campus_lost_found
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development

ADMIN_EMAIL=admin@campus.edu
ADMIN_PASSWORD=admin123
```

---

## 📡 API Documentation

### Authentication

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new student | Public |
| POST | `/api/auth/login` | Student login | Public |
| POST | `/api/auth/admin-login` | Admin login | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Posts

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| GET | `/api/posts` | Get all posts (with filters) | Public |
| GET | `/api/posts/:id` | Get single post | Public |
| POST | `/api/posts` | Create post | Verified Student |
| PUT | `/api/posts/:id` | Update post | Post Owner |
| DELETE | `/api/posts/:id` | Delete post | Post Owner |

### Claims

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| POST | `/api/posts/:id/claim` | Submit claim | Verified Student |
| GET | `/api/posts/:id/claims` | Get claims for a post | Public |
| GET | `/api/claims/my` | Get current user's claims | Private |

### Admin

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| GET | `/api/admin/pending-users` | Get pending users | Admin |
| PUT | `/api/admin/verify-user/:id` | Approve/Reject user | Admin |
| GET | `/api/admin/posts` | Get all posts | Admin |
| DELETE | `/api/admin/posts/:id` | Delete any post | Admin |
| GET | `/api/admin/claims` | Get all claims | Admin |
| PUT | `/api/admin/claims/:id/accept` | Accept claim | Admin |
| PUT | `/api/admin/claims/:id/reject` | Reject claim | Admin |

---

## 👥 User Roles

| Role | Capabilities |
|--------|-------------|
| **Guest** | View posts, search and filter |
| **Verified Student** | Create/Edit/Delete own posts, submit claims |
| **Admin** | Verify users, moderate posts, resolve claims |

---

## 👨‍💻 Team Members

| Name | Role |
|--------|------|
| Sobuj | Project Lead — Architecture, Auth, Post & Claim Backend |
| Atikul | Backend Developer — Post APIs, Student Pages |
| Al Fahim | Admin Panel Developer |
| Abdur Rahman | QA, Documentation, Public Pages |

---

## 📊 Project Status

| Phase | Status |
|--------|--------|
| Frontend Foundation | ✅ Complete |
| Backend Foundation | ✅ Complete |
| Authentication | ✅ Complete |
| Post Management | ✅ Complete |
| Claim System | ✅ Complete |
| Admin Panel | ✅ Complete |
| Image Upload (Local) | ✅ Complete |
| Final Testing | 🔄 In Progress |

---