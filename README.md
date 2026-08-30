# Campus Lost & Found

A full-stack web application for managing lost and found items within a campus.

## Features

* User Registration & Login
* Lost & Found Posts
* Search & Filtering
* Claim Management
* Admin Panel

## Tech Stack

* Frontend: React
* Backend: Node.js & Express
* Database: MongoDB

## Development

All development work is done on separate branches and merged into the `main` branch through Pull Requests.


frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                    ← 🔒 LOCKED (আপনি বানাবেন)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── TextArea.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── Avatar.jsx
│   │   │
│   │   ├── layout/                ← 🔒 LOCKED (আপনি বানাবেন)
│   │   │   ├── PublicLayout.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   └── shared/                ← 🔓 OPEN (টিম মেম্বাররা ব্যবহার করতে পারবে, নতুন কম্পোনেন্ট যোগ করতে পারবে)
│   │       ├── PostCard.jsx
│   │       ├── FilterPills.jsx
│   │       ├── SearchBar.jsx
│   │       └── ... (যেকোনো পেজ-স্পেসিফিক কম্পোনেন্ট)
│   │
│   ├── pages/                     ← 🔓 OPEN (টিম মেম্বাররা এখানে কাজ করবে)
│   │   ├── Home.jsx
│   │   ├── PostDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── About.jsx
│   │   ├── NotFound.jsx
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   ├── MyPosts.jsx
│   │   ├── SavedPosts.jsx
│   │   ├── Profile.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminUsers.jsx
│   │       ├── AdminPosts.jsx
│   │       └── AdminClaims.jsx
│   │
│   ├── contexts/                  ← 🔒 LOCKED (আপনি বানাবেন)
│   │   └── AuthContext.jsx
│   │
│   ├── services/                  ← 🔒 LOCKED (আপনি বানাবেন)
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── postService.js
│   │   ├── claimService.js
│   │   └── adminService.js
│   │
│   ├── utils/                     ← 🔓 OPEN (প্রয়োজনে টিম মেম্বাররা helper যোগ করতে পারবে)
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── App.jsx                    ← 🔒 LOCKED (রাউটিং স্ট্রাকচার)
│   ├── main.jsx                   ← 🔒 LOCKED
│   └── index.css                  ← 🔒 LOCKED (গ্লোবাল স্টাইল, টেইলউইন্ড)
│
├── tailwind.config.js             ← 🔒 LOCKED
├── index.html                     ← 🔒 LOCKED
└── package.json                   ← 🔒 LOCKED