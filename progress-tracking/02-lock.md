# 📊 Campus Lost & Found — Project Progress Tracking

**Last Updated:** (আজকের তারিখ)  
**Current Phase:** Foundation / Setup  
**Project Lead:** (আপনার নাম)

---

## 🎯 Overall Status

| Area | Status |
|------|--------|
| Frontend Foundation | ✅ Completed (Locked) |
| Backend Foundation | ✅ Completed (Locked) |
| MongoDB Connection | ✅ Successfully Connected |
| Feature Implementation | ⏳ Not Started (Team Members) |
| Full Testing | ⏳ Pending |
| Deployment | ⏳ Pending |

---

## ✅ What Has Been Completed (by Project Lead)

### Frontend
- [x] React + Vite project initialized
- [x] Tailwind CSS configured (custom color tokens locked)
- [x] Inter font integrated
- [x] 11 reusable UI components created (`Button`, `Input`, `Select`, `TextArea`, `Badge`, `Modal`, `Spinner`, `SkeletonCard`, `EmptyState`, `Pagination`, `Avatar`)
- [x] Layout components created (`Navbar`, `Footer`, `PublicLayout`, `AdminLayout`)
- [x] Route guards created (`ProtectedRoute`, `AdminRoute`)
- [x] `AuthContext` implemented
- [x] API service layer created (`api.js`, `authService.js`, `postService.js`, `claimService.js`, `adminService.js`)
- [x] Utility files created (`constants.js`, `helpers.js`)
- [x] `App.jsx` routing structure set
- [x] Basic `Home.jsx` and `Register.jsx` created for demo

### Backend
- [x] Node.js + Express project initialized
- [x] MongoDB connection established (successful)
- [x] Mongoose models created (`User`, `Post`, `Claim`)
- [x] Middleware created (`auth`, `admin`, `upload`, `error`)
- [x] JWT token generation implemented
- [x] Auth controller implemented (`register`, `login`, `getMe`)
- [x] Route skeletons created (`auth`, `post`, `claim`, `admin`)
- [x] Folder structure with admin in separate sub-folders
- [x] `.env.example`, `.gitignore` configured

---

## ⏳ What Remains To Be Done (by Team Members)

### Backend
- [ ] Implement `postController` — getAllPosts, getPostById, createPost, updatePost, deletePost, submitClaim, getClaimsByPost
- [ ] Implement `claimController` — getUserClaims
- [ ] Implement `adminController` — getPendingUsers, verifyUser, getAllPosts, deletePost, getAllClaims, setClaimDeadline, acceptClaim, rejectClaim
- [ ] Full API testing with Postman

### Frontend
- [ ] Complete all page UI (see table below)
- [ ] Connect frontend with backend APIs
- [ ] Implement search/filter on Home page
- [ ] Image upload integration
- [ ] Claim modal & claim flow
- [ ] Admin dashboard UI

### QA & Documentation
- [ ] Test all features
- [ ] Write API documentation
- [ ] Prepare demo data
- [ ] Create presentation slides

---

## 📄 Pages Status (16 Pages)

| # | Page | Route | Status | Assigned To |
|---|------|-------|--------|-------------|
| 1 | Home / Feed | `/` | 🔨 Placeholder ready | Frontend Dev 1 |
| 2 | Post Detail | `/post/:id` | ⏳ Not started | Frontend Dev 1 |
| 3 | Login | `/login` | ⏳ Not started | Frontend Dev 2 |
| 4 | Register | `/register` | 🔨 Basic done | Frontend Dev 2 |
| 5 | About | `/about` | ⏳ Not started | Frontend Dev 2 |
| 6 | 404 Not Found | `*` | ⏳ Not started | Frontend Dev 2 |
| 7 | Create Post | `/create-post` | ⏳ Not started | Frontend Dev 3 |
| 8 | Edit Post | `/edit-post/:id` | ⏳ Not started | Frontend Dev 3 |
| 9 | My Posts | `/my-posts` | ⏳ Not started | Frontend Dev 3 |
| 10 | Saved Posts | `/saved-posts` | ⏳ Not started | Frontend Dev 3 |
| 11 | Profile | `/profile` | ⏳ Not started | Frontend Dev 3 |
| 12 | Notifications | `/notifications` | ❌ Removed (optional) | — |
| 13 | Admin Dashboard | `/admin` | ⏳ Not started | Admin UI Dev |
| 14 | Admin Users | `/admin/users` | ⏳ Not started | Admin UI Dev |
| 15 | Admin Posts | `/admin/posts` | ⏳ Not started | Admin UI Dev |
| 16 | Admin Claims | `/admin/claims` | ⏳ Not started | Admin UI Dev |

---

## 🔒 Locked vs Open Files

### 🔒 LOCKED (শুধুমাত্র Project Lead)
- `tailwind.config.js`
- `index.css`
- `src/components/ui/` (সব ফাইল)
- `src/components/layout/` (সব ফাইল)
- `src/components/routing/` (সব ফাইল)
- `src/contexts/` (সব ফাইল)
- `src/services/` (সব ফাইল)
- `src/utils/` (সব ফাইল)
- `src/App.jsx`
- `src/main.jsx`
- `backend/config/db.js`
- `backend/models/` (সব ফাইল)
- `backend/middleware/` (সব ফাইল)
- `backend/utils/generateToken.js`
- `backend/server.js`
- `backend/app.js`
- `backend/routes/` (সব ফাইল)
- `.env`, `.env.example`, `.gitignore`
- `package.json`

### 🔓 OPEN (টিম মেম্বাররা কাজ করবে)
- `src/pages/` (সব পেজ ফাইল)
- `src/pages/admin/` (অ্যাডমিন পেজ)
- `src/components/shared/` (পেজ-স্পেসিফিক কম্পোনেন্ট)
- `backend/controllers/authController.js`
- `backend/controllers/postController.js`
- `backend/controllers/claimController.js`
- `backend/controllers/admin/adminController.js`

---

## 🚀 Next Steps

1. Team members start working on assigned controllers
2. Frontend developers complete page UI
3. Integration testing
4. Full system testing
5. Documentation & presentation

---

**Note:** This is a living document. Update it as progress continues.