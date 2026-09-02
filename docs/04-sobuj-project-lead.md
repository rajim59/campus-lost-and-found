# Sobuj — Project Lead & Full-Stack Architect

## Role Summary
Sobuj serves as the Project Lead and Full-Stack Architect for the Campus Lost & Found Management System. He is responsible for the overall technical direction, code quality, and successful delivery of the project.

## Key Responsibilities

### 1. Architecture Design
- Designed the complete folder structure for both frontend and backend
- Established the MVC pattern for backend organization
- Created the locking policy to maintain code consistency
- Defined the design system with premium color palette and typography

### 2. Frontend Foundation
- Set up React + Vite + Tailwind CSS project
- Created 11 reusable UI components (Button, Input, Select, TextArea, Badge, Modal, Spinner, SkeletonCard, EmptyState, Pagination, Avatar)
- Built layout components (Navbar, Footer, PublicLayout, AdminLayout)
- Implemented route guards (ProtectedRoute, AdminRoute)
- Created AuthContext for authentication state management
- Built API service layer with Axios interceptors

### 3. Backend Foundation
- Set up Express.js server with MongoDB connection
- Created all Mongoose models (User, Post, Claim)
- Implemented middleware (auth, admin, upload, error)
- Built JWT token generation utility
- Implemented complete authentication system (register, login, getMe)
- Created admin login endpoint

### 4. Core Feature Implementation
- Implemented complete Post Controller (create, update, delete, submit claim, get claims)
- Implemented Admin Controller (user verification, claim management)
- Built Home page with search, filter, and pagination
- Built Post Detail page with claim modal
- Built Create Post and Edit Post pages

### 5. Team Leadership
- Created work distribution plan for 4 team members
- Established coding standards and conventions
- Reviewed and refactored team members' code
- Managed Git branching strategy
- Ensured on-time delivery of project milestones

## Files Created (Locked Files)

### Frontend
- `tailwind.config.js` — Design tokens
- `index.css` — Global styles
- `src/components/ui/*` — All 11 UI components
- `src/components/layout/*` — All layout components
- `src/components/routing/*` — Route guards
- `src/contexts/AuthContext.jsx` — Authentication context
- `src/services/*` — API service layer
- `src/utils/constants.js` — Constants
- `src/utils/helpers.js` — Helper functions
- `src/App.jsx` — Main routing
- `src/main.jsx` — Entry point

### Backend
- `config/db.js` — MongoDB connection
- `models/User.js` — User schema
- `models/Post.js` — Post schema
- `models/Claim.js` — Claim schema
- `middleware/authMiddleware.js` — JWT verification
- `middleware/adminMiddleware.js` — Admin role check
- `middleware/uploadMiddleware.js` — Multer config
- `middleware/errorMiddleware.js` — Error handlers
- `utils/generateToken.js` — JWT generator
- `controllers/authController.js` — Auth logic
- `controllers/postController.js` — Post logic (partial)
- `controllers/admin/adminController.js` — Admin logic (partial)
- `routes/authRoutes.js` — Auth routes
- `routes/postRoutes.js` — Post routes
- `routes/claimRoutes.js` — Claim routes
- `routes/admin/adminRoutes.js` — Admin routes
- `app.js` — Express app
- `server.js` — Server bootstrap
- `seedAdmin.js` — Admin seeder

## Technical Skills Demonstrated
- React.js component architecture
- Tailwind CSS design system implementation
- Node.js/Express REST API development
- MongoDB schema design with Mongoose
- JWT authentication and authorization
- Role-based access control
- File upload handling with Multer
- Git version control
- Code review and refactoring