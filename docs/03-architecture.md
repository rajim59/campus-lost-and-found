# 🏗️ System Architecture Document  
**Project:** Campus Lost & Found Management System  
**Version:** 1.0  
**Document Type:** Architecture.md  

---

## 1. Introduction

This document describes the overall system architecture of the **Campus Lost & Found Management System**. It outlines the high-level components, their interactions, data flow, and the technology stack used. The architecture follows a typical **three-tier web application** pattern, suitable for a university lab project.

---

## 2. High-Level Architecture Overview

The system is designed as a **client-server web application** with a clear separation between the frontend, backend, and database layers. The architecture ensures modularity, maintainability, and ease of development for a student team.

```mermaid
graph TD
    A[Client Browser] -->|HTTP Requests| B[Frontend - HTML/CSS/JS]
    B -->|REST API Calls| C[Backend - Node.js + Express]
    C -->|Queries| D[(MongoDB Database)]
    C -->|File Storage| E[Local /uploads folder or Cloudinary]
    C -->|Authentication| F[JWT Middleware]
    C -->|Password Hashing| G[Bcrypt]
```

*Fig. 1 – High-level three-tier architecture*

---

## 3. Architectural Layers

### 3.1 Presentation Layer (Frontend)
- **Technology:** HTML5, CSS3, JavaScript (optionally React for component-based UI, but plain JS is sufficient for this project)
- **Responsibility:**
  - Renders all user interfaces (home page, post detail, dashboard, admin panel)
  - Handles client-side form validation and user input
  - Makes asynchronous API calls using `fetch` or `axios`
  - Displays data received from the backend
  - Manages user session using JWT stored in `localStorage`

### 3.2 Application Layer (Backend)
- **Technology:** Node.js with Express.js framework
- **Responsibility:**
  - Exposes RESTful API endpoints
  - Implements business logic (registration, posting, claiming, verification)
  - Handles authentication and authorization via JWT
  - Validates incoming data (server-side validation)
  - Manages file uploads (Multer middleware)
  - Communicates with the database using Mongoose ODM

### 3.3 Data Layer (Database)
- **Technology:** MongoDB (NoSQL document database) with Mongoose
- **Responsibility:**
  - Stores all persistent data: users, posts, claims, notifications
  - Enforces data integrity through schema definitions
  - Supports indexing for faster search queries (e.g., on `category`, `location`, `postType`)

### 3.4 External Services (Optional)
- **Email Service:** For sending verification or notification emails (can be integrated later; not mandatory in basic version)
- **Cloud Storage:** For storing uploaded images (Cloudinary or similar; initially local file system is enough)

---

## 4. Component Interaction & Data Flow

### 4.1 User Registration and Verification Flow

```mermaid
sequenceDiagram
    participant U as User (Student)
    participant F as Frontend
    participant B as Backend
    participant D as Database

    U->>F: Fill registration form
    F->>B: POST /api/auth/register
    B->>D: Save user with status "pending"
    B-->>F: Success response
    F-->>U: Show "Wait for admin approval"

    Note over U,D: Admin logs in later
    U->>F: Admin login
    F->>B: POST /api/auth/login
    B->>D: Verify credentials
    B-->>F: JWT token
    F->>B: GET /api/admin/pending-users
    B->>D: Query pending users
    B-->>F: List of pending users
    F->>B: PUT /api/admin/verify-user/:id (approve)
    B->>D: Update user status to "approved"
    B-->>F: Confirmation
```

### 4.2 Post Creation Flow

```mermaid
sequenceDiagram
    participant U as Verified Student
    participant F as Frontend
    participant B as Backend
    participant D as Database
    participant S as File Storage

    U->>F: Fill post form + attach images
    F->>B: POST /api/posts (multipart/form-data)
    B->>B: Validate JWT & user role
    B->>S: Save uploaded images
    S-->>B: Return image URLs
    B->>D: Save post with image URLs
    B-->>F: Post created successfully
    F-->>U: Redirect to post detail
```

### 4.3 Claim and Admin Resolution Flow

```mermaid
sequenceDiagram
    participant C as Claimant (Student)
    participant F as Frontend
    participant B as Backend
    participant D as Database
    participant A as Admin

    C->>F: Click "Claim" on a Found post
    F->>B: POST /api/posts/:id/claim (with message)
    B->>D: Save claim (status: pending)
    B-->>F: Claim submitted

    A->>F: Admin dashboard shows pending claims
    F->>B: GET /api/admin/claims
    B->>D: Fetch all pending claims
    B-->>F: List of claims

    A->>F: Set deadline for a claim
    F->>B: PUT /api/admin/claims/:id/deadline
    B->>D: Update claim deadline
    B-->>F: Deadline set

    Note over A,D: After deadline, admin reviews all claims
    A->>F: Accept one claim
    F->>B: PUT /api/admin/claims/:id/accept
    B->>D: Update claim status to accepted, post status to resolved
    B-->>F: Confirmation
```

---

## 5. Database Schema (Simplified)

Three main collections are used. The relationships are shown in the following entity diagram:

```mermaid
erDiagram
    USER {
        ObjectId _id
        string studentId
        string fullName
        string email
        string phone
        string department
        string batch
        string passwordHash
        string status
        string role
        date createdAt
    }
    POST {
        ObjectId _id
        ObjectId userId
        string postType
        string itemName
        string category
        string description
        string location
        date itemDate
        array images
        string contactEmail
        string contactPhone
        boolean isContactPublic
        string status
        date createdAt
    }
    CLAIM {
        ObjectId _id
        ObjectId postId
        ObjectId claimantUserId
        string message
        string status
        date deadline
        date createdAt
    }
    USER ||--o{ POST : creates
    USER ||--o{ CLAIM : submits
    POST ||--o{ CLAIM : receives
```

*Note:* The `NOTIFICATION` collection is optional and can be added later.

---

## 6. API Design

The backend follows RESTful conventions. All routes are prefixed with `/api`.

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user profile | Private (JWT) |
| GET | `/api/posts` | Get all posts (with filters) | Public |
| GET | `/api/posts/:id` | Get single post detail | Public |
| POST | `/api/posts` | Create new post | Verified Student |
| PUT | `/api/posts/:id` | Update own post | Post Owner |
| DELETE | `/api/posts/:id` | Delete own post | Post Owner |
| POST | `/api/posts/:id/claim` | Submit a claim | Verified Student |
| GET | `/api/admin/pending-users` | List pending users | Admin |
| PUT | `/api/admin/verify-user/:id` | Approve/Reject user | Admin |
| GET | `/api/admin/claims` | List all claims | Admin |
| PUT | `/api/admin/claims/:id/deadline` | Set claim deadline | Admin |
| PUT | `/api/admin/claims/:id/accept` | Accept a claim | Admin |
| DELETE | `/api/admin/posts/:id` | Delete any post | Admin |

---

## 7. Security Architecture

- **Authentication:** JWT (JSON Web Tokens) stored in `localStorage`; tokens expire after 24 hours.
- **Password Security:** Passwords are hashed using `bcrypt` with salt rounds.
- **Authorization:** Middleware checks user role (`student` or `admin`) before allowing access to protected routes.
- **Input Validation:** All inputs are validated on both client and server side to prevent XSS and injection attacks.
- **File Upload Security:** Only image files (jpg, png) are accepted; file size limited to 2MB; random file names are used to prevent path traversal.
- **Privacy Controls:** Contact information can be marked private; only authenticated verified users can view private contact details.

---

## 8. Deployment Architecture (Simple)

For the university lab project, a simple single-server deployment is sufficient:

```mermaid
graph LR
    A[User Browser] -->|HTTP/HTTPS| B[Web Server - Node.js + Express]
    B -->|Serves static frontend files| C[Client files]
    B -->|API requests| D[Backend app]
    D -->|Database connection| E[(MongoDB Atlas or local MongoDB)]
    D -->|File writes| F[uploads/ folder]
```

*Alternatively, frontend and backend can be hosted separately on Vercel/Netlify and Render/Heroku, but a single Node.js server is simpler for demo.*

---

## 9. Technology Stack Summary

| Layer | Technology | Justification |
|-------|------------|----------------|
| Frontend | HTML, CSS, JavaScript (vanilla) | Simple, no build tools required |
| Backend | Node.js, Express | Lightweight, fast, easy for students |
| Database | MongoDB + Mongoose | Flexible schema, popular in MERN stack |
| Authentication | JWT, bcrypt | Industry-standard, secure |
| File Upload | Multer | Easy integration with Express |
| Version Control | Git & GitHub | Team collaboration |

---

## 10. Future Architectural Enhancements

- Separate frontend into a React SPA for better state management.
- Introduce a microservices architecture if the system grows (not needed now).
- Implement WebSocket for real-time notifications.
- Use cloud storage (AWS S3 or Cloudinary) for images to scale.
- Add a caching layer (Redis) for frequently accessed posts.

---
