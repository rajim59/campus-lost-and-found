## 📁 Frontend — File & Folder Structure with Purpose

```
frontend/
├── public/                          # Static files served as-is
│   └── favicon.ico                  # Browser tab icon
│
├── src/
│   ├── components/
│   │   ├── ui/                      # 🔒 LOCKED – Reusable design system components
│   │   │   ├── Button.jsx           # Button variants, loading state
│   │   │   ├── Input.jsx            # Text input with label, error, icon
│   │   │   ├── Select.jsx           # Dropdown with label, options
│   │   │   ├── TextArea.jsx         # Multi-line text input
│   │   │   ├── Badge.jsx            # Status badges (Lost, Found, etc.)
│   │   │   ├── Modal.jsx            # Centered overlay modal
│   │   │   ├── Spinner.jsx          # Loading spinner
│   │   │   ├── SkeletonCard.jsx     # Loading placeholder for cards
│   │   │   ├── EmptyState.jsx       # Empty result placeholder
│   │   │   ├── Pagination.jsx       # Page navigation
│   │   │   └── Avatar.jsx           # User profile image or initials
│   │   │
│   │   ├── layout/                  # 🔒 LOCKED – Page structural layouts
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── Footer.jsx           # Footer with dark background
│   │   │   ├── PublicLayout.jsx     # Layout for public pages
│   │   │   └── AdminLayout.jsx      # Layout for admin pages (sidebar)
│   │   │
│   │   ├── routing/                 # 🔒 LOCKED – Route protection wrappers
│   │   │   ├── ProtectedRoute.jsx   # Redirect to login if not authenticated
│   │   │   └── AdminRoute.jsx       # Redirect to home if not admin
│   │   │
│   │   └── shared/                  # 🔓 OPEN – Page-specific reusable components
│   │       ├── PostCard.jsx         # Card used on Home page (team will create)
│   │       ├── FilterPills.jsx      # Category filter chips (team will create)
│   │       └── ClaimModal.jsx       # Claim submission modal (team will create)
│   │
│   ├── pages/                       # 🔓 OPEN – All page components
│   │   ├── Home.jsx                 # Feed with search, filters, post grid
│   │   ├── PostDetail.jsx           # Single post details and claim button
│   │   ├── Login.jsx                # User login form
│   │   ├── Register.jsx             # User registration form
│   │   ├── About.jsx                # How it works / info page
│   │   ├── NotFound.jsx             # 404 error page
│   │   ├── CreatePost.jsx           # Create lost/found post
│   │   ├── EditPost.jsx             # Edit own post
│   │   ├── MyPosts.jsx              # List of current user's posts
│   │   ├── SavedPosts.jsx           # Bookmarked posts
│   │   ├── Profile.jsx              # User profile and settings
│   │   └── admin/                   # Admin pages (separate sub-folder)
│   │       ├── AdminDashboard.jsx   # Admin overview stats
│   │       ├── AdminUsers.jsx       # User verification (approve/reject)
│   │       ├── AdminPosts.jsx       # Post moderation
│   │       └── AdminClaims.jsx      # Claim management
│   │
│   ├── contexts/                    # 🔒 LOCKED – React Context providers
│   │   └── AuthContext.jsx          # Authentication state, login/logout
│   │
│   ├── services/                    # 🔒 LOCKED – API communication layer
│   │   ├── api.js                   # Axios instance with interceptors
│   │   ├── authService.js           # Auth API calls (register, login, getMe)
│   │   ├── postService.js           # Post API calls (CRUD, list, claim)
│   │   ├── claimService.js          # Claim API calls
│   │   └── adminService.js          # Admin API calls
│   │
│   ├── utils/                       # 🔒 LOCKED – Constants and helper functions
│   │   ├── constants.js             # Fixed lists (categories, locations, etc.)
│   │   └── helpers.js               # Formatting functions (date, timeAgo)
│   │
│   ├── App.jsx                      # 🔒 LOCKED – Main routing component
│   ├── main.jsx                     # 🔒 LOCKED – React DOM render entry
│   └── index.css                    # 🔒 LOCKED – Global styles (Tailwind)
│
├── tailwind.config.js               # 🔒 LOCKED – Design tokens (colors, fonts)
├── index.html                       # 🔒 LOCKED – HTML template
├── package.json                     # 🔒 LOCKED – Dependencies and scripts
└── vite.config.js                   # Build tool configuration (not locked but rarely changed)
```

---

## 📁 Backend — File & Folder Structure with Purpose

```
backend/
├── config/
│   └── db.js                        # 🔒 LOCKED – MongoDB connection using Mongoose
│
├── models/                          # 🔒 LOCKED – Database schemas
│   ├── User.js                      # User schema (student/admin, status, role)
│   ├── Post.js                      # Post schema (lost/found items)
│   └── Claim.js                     # Claim schema (ownership disputes)
│
├── routes/                          # 🔒 LOCKED – API route definitions
│   ├── authRoutes.js                # /api/auth endpoints (register, login, me)
│   ├── postRoutes.js                # /api/posts endpoints (CRUD, claim, search)
│   ├── claimRoutes.js               # /api/claims endpoints (user claims)
│   └── admin/                       # Admin specific routes
│       └── adminRoutes.js           # /api/admin endpoints (verification, moderation)
│
├── controllers/                     # 🔓 OPEN – Business logic (team implements)
│   ├── authController.js            # Register, login, getMe (Locked – done by lead)
│   ├── postController.js            # Post CRUD, search/filter, claim submission (Open)
│   ├── claimController.js           # Get user's claims (Open)
│   └── admin/                       # Admin controllers
│       └── adminController.js       # Verify users, manage posts/claims (Open)
│
├── middleware/                      # 🔒 LOCKED – Request processing middleware
│   ├── authMiddleware.js            # Protect routes – JWT verification
│   ├── adminMiddleware.js           # Check admin role
│   ├── uploadMiddleware.js          # Multer config for image uploads
│   └── errorMiddleware.js           # Not found & global error handler
│
├── utils/                           # 🔒 LOCKED – Helper functions
│   └── generateToken.js             # Generate JWT token
│
├── uploads/                         # 📁 Stores user-uploaded images (local)
│   └── .gitkeep                     # Keeps folder in git
│
├── app.js                           # 🔒 LOCKED – Express app configuration
├── server.js                        # 🔒 LOCKED – Starts server, connects DB
├── seedAdmin.js                     # 🔒 LOCKED – One-time admin user creation script
├── .env                             # 🔒 LOCKED – Environment variables (never commit)
├── .env.example                     # 🔒 LOCKED – Template for required env vars
├── .gitignore                       # 🔒 LOCKED – Files ignored by git
└── package.json                     # 🔒 LOCKED – Dependencies & scripts
```

---