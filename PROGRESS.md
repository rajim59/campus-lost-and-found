  
**টিম মেম্বারগণ:** সবুজ, আতিকুল, আল ফাহিম, আব্দুর রহমান  

---

## 🎨 লক করা ডিজাইন টোকেন (সবার জন্য)

| বিষয় | মান |
|--------|------|
| প্রাইমারি কালার | `#1E3A8A` (Navy Blue) |
| ব্যাকগ্রাউন্ড | `#F8FAFC` |
| কার্ড | `#FFFFFF` |
| টেক্সট (প্রাইমারি) | `#0F172A` |
| টেক্সট (সেকেন্ডারি) | `#475569` |
| বর্ডার | `#E2E8F0` |
| সাকসেস | `#16A34A` |
| ওয়ার্নিং | `#D97706` |
| ডেঞ্জার | `#DC2626` |
| Found ব্যাজ | `#0D9488` (Teal) |
| Lost ব্যাজ | `#EA580C` (Orange) |
| ফন্ট | Inter |
| বর্ডার রেডিয়াস | ৮px (কার্ড/বাটন), ১২px (কন্টেইনার) |

**নিয়ম:** এই টোকেন থেকে কেউ বের হবে না। Tailwind ক্লাস ব্যবহার করবে, নিজে নতুন রং বানাবে না।

---

## 🟢 সবুজ (Project Lead) — ৭টি পেজ + ৩টি ব্যাকএন্ড ফাইল

### ফ্রন্টএন্ড পেজ (৫টি)
| # | পেজ | রাউট | ফাইল |
|---|------|------|------|
| ১ | Home / Feed | `/` | `frontend/src/pages/Home.jsx` |
| ২ | Post Detail | `/post/:id` | `frontend/src/pages/PostDetail.jsx` |
| ৩ | Create Post | `/create-post` | `frontend/src/pages/CreatePost.jsx` |
| ৪ | Edit Post | `/edit-post/:id` | `frontend/src/pages/EditPost.jsx` |
| ৫ | Claim Modal (shared) | — | `frontend/src/components/shared/ClaimModal.jsx` |

### ব্যাকএন্ড ফাইল (৩টি)
| # | ফাইল | কাজ |
|---|-------|------|
| ১ | `backend/controllers/authController.js` | register, login, getMe সম্পূর্ণ |
| ২ | `backend/controllers/postController.js` | createPost, updatePost, deletePost, submitClaim, getClaimsByPost |
| ৩ | `backend/controllers/admin/adminController.js` | getPendingUsers, verifyUser, setClaimDeadline, acceptClaim, rejectClaim |

**কেন সবুজের জন্য বেশি কাজ:**  
প্রজেক্টের হার্ট — Auth, Post creation, Claim resolution — সবচেয়ে গুরুত্বপূর্ণ লজিক তার হাতে থাকবে। এতে পুরো সিস্টেমের মান নিয়ন্ত্রণে থাকবে।

---

## 🟠 আতিকুল — ৫টি পেজ + ২টি ব্যাকএন্ড ফাইল

### ফ্রন্টএন্ড পেজ (৩টি)
| # | পেজ | রাউট | ফাইল |
|---|------|------|------|
| ১ | My Posts | `/my-posts` | `frontend/src/pages/MyPosts.jsx` |
| ২ | Saved Posts | `/saved-posts` | `frontend/src/pages/SavedPosts.jsx` |
| ৩ | Profile | `/profile` | `frontend/src/pages/Profile.jsx` |

### ব্যাকএন্ড ফাইল (২টি)
| # | ফাইল | কাজ |
|---|-------|------|
| ১ | `backend/controllers/postController.js` | getAllPosts (সার্চ/ফিল্টার/পেজিনেশন), getPostById |
| ২ | `backend/controllers/claimController.js` | getUserClaims |

**কেন আতিকুলের জন্য এই কাজ:**  
সে Post list এবং নিজের পোস্ট ম্যানেজমেন্ট করবে — যা Create/Edit পেজের সাথে সম্পর্কিত কিন্তু সরাসরি নির্ভরশীল না। সে স্বাধীনভাবে কাজ শেষ করতে পারবে।  
তার পেজগুলোতে API কল থাকবে, কিন্তু ফর্ম জটিলতা কম — ফলে তার কাজ মসৃণ হবে।

---

## 🟡 আল ফাহিম — ৪টি পেজ + ১টি ব্যাকএন্ড ফাইল (অ্যাডমিন পুরো)

### ফ্রন্টএন্ড পেজ (৪টি — সব Admin)
| # | পেজ | রাউট | ফাইল |
|---|------|------|------|
| ১ | Admin Dashboard | `/admin` | `frontend/src/pages/admin/AdminDashboard.jsx` |
| ২ | Admin Users | `/admin/users` | `frontend/src/pages/admin/AdminUsers.jsx` |
| ৩ | Admin Posts | `/admin/posts` | `frontend/src/pages/admin/AdminPosts.jsx` |
| ৪ | Admin Claims | `/admin/claims` | `frontend/src/pages/admin/AdminClaims.jsx` |

### ব্যাকএন্ড ফাইল (১টি)
| # | ফাইল | কাজ |
|---|-------|------|
| ১ | `backend/controllers/admin/adminController.js` | getAllPosts, deletePost, getAllClaims |

**কেন আল ফাহিমের জন্য এই কাজ:**  
সে পুরো Admin Panel একাই সামলাবে — এতে Admin UI-তে কনসিস্টেন্সি থাকবে।  
তার কাজ অন্য কারো সাথে কনফ্লিক্ট করবে না, কারণ Admin সেকশন সম্পূর্ণ আলাদা।  
সে Tailwind-এ দক্ষ, তাই অ্যাডমিন টেবিল, সাইডবার, স্ট্যাট কার্ড — সব তার জন্য উপযুক্ত।

---

## 🔵 আব্দুর রহমান — ৪টি পেজ + ডকুমেন্টেশন/টেস্টিং

### ফ্রন্টএন্ড পেজ (৪টি)
| # | পেজ | রাউট | ফাইল |
|---|------|------|------|
| ১ | Login | `/login` | `frontend/src/pages/Login.jsx` |
| ২ | Register | `/register` | `frontend/src/pages/Register.jsx` |
| ৩ | About | `/about` | `frontend/src/pages/About.jsx` |
| ৪ | 404 Not Found | `*` | `frontend/src/pages/NotFound.jsx` |

### অন্যান্য দায়িত্ব
| # | কাজ | বিবরণ |
|---|------|--------|
| ১ | API ডকুমেন্টেশন | প্রতিটি এন্ডপয়েন্টের Method, URL, Body, Response লেখা |
| ২ | ডামি ডেটা | MongoDB-তে ২০-৩০টি বাস্তবসম্মত পোস্ট সিড করা |
| ৩ | পূর্ণাঙ্গ টেস্টিং | Postman + ব্রাউজারে সব ফিচার টেস্ট, বাগ রিপোর্ট |
| ৪ | প্রেজেন্টেশন | স্লাইড তৈরি, ডেমো স্ক্রিপ্ট |

**কেন আব্দুর রহমানের জন্য এই কাজ:**  
তার পেজগুলো তুলনামূলক সহজ (স্ট্যাটিক বা বেসিক ফর্ম) — ফলে সে দ্রুত শেষ করতে পারবে।  
পরবর্তীতে সে QA হিসেবে পুরো সিস্টেম টেস্ট করবে, যা প্রজেক্টের মান নিশ্চিত করবে।  
তার কাজ কোনো কন্ট্রোলার লজিকের উপর নির্ভরশীল না — Login/Register Auth API-র সাথে যুক্ত, যা ইতিমধ্যে তৈরি।

---

## 📊 মোট কাজের সারসংক্ষেপ

| মেম্বার | পেজ সংখ্যা | ব্যাকএন্ড ফাইল | বিশেষ দায়িত্ব | মোট কাজের ভার |
|---------|------------|----------------|----------------|---------------|
| **সবুজ** | ৫ | ৩ | কোড রিভিউ, ইন্টিগ্রেশন | সবচেয়ে বেশি |
| **আতিকুল** | ৩ | ২ | — | মাঝারি-বেশি |
| **আল ফাহিম** | ৪ | ১ | Admin UI সম্পূর্ণ | মাঝারি |
| **আব্দুর রহমান** | ৪ | ০ | QA, ডকুমেন্টেশন, ডামি ডেটা | মাঝারি-কম |

---

## 📁 ১৬টি পেজ — কে করবে (এক নজরে)

| # | পেজ | রাউট | দায়িত্ব |
|---|------|------|----------|
| ১ | Home / Feed | `/` | 🟢 সবুজ |
| ২ | Post Detail | `/post/:id` | 🟢 সবুজ |
| ৩ | Create Post | `/create-post` | 🟢 সবুজ |
| ৪ | Edit Post | `/edit-post/:id` | 🟢 সবুজ |
| ৫ | My Posts | `/my-posts` | 🟠 আতিকুল |
| ৬ | Saved Posts | `/saved-posts` | 🟠 আতিকুল |
| ৭ | Profile | `/profile` | 🟠 আতিকুল |
| ৮ | Admin Dashboard | `/admin` | 🟡 আল ফাহিম |
| ৯ | Admin Users | `/admin/users` | 🟡 আল ফাহিম |
| ১০ | Admin Posts | `/admin/posts` | 🟡 আল ফাহিম |
| ১১ | Admin Claims | `/admin/claims` | 🟡 আল ফাহিম |
| ১২ | Login | `/login` | 🔵 আব্দুর রহমান |
| ১৩ | Register | `/register` | 🔵 আব্দুর রহমান |
| ১৪ | About | `/about` | 🔵 আব্দুর রহমান |
| ১৫ | 404 Not Found | `*` | 🔵 আব্দুর রহমান |
| ১৬ | Notifications | — | ❌ বাদ (সবার জন্য প্রযোজ্য নয়) |

---

## 🔒 Locking Policy (সবাইকে মানতে হবে)

### 🔒 কেউ হাত দেবে না (শুধু সবুজ)
- `src/components/ui/` (সব ফাইল)
- `src/components/layout/` (সব ফাইল)
- `src/components/routing/` (সব ফাইল)
- `src/contexts/` (সব ফাইল)
- `src/services/` (সব ফাইল)
- `src/utils/` (সব ফাইল)
- `src/App.jsx`, `src/main.jsx`, `src/index.css`
- `tailwind.config.js`, `package.json`
- `backend/models/` (সব ফাইল)
- `backend/middleware/` (সব ফাইল)
- `backend/routes/` (সব ফাইল)
- `backend/config/db.js`, `server.js`, `app.js`

### 🔓 যে ফাইলে কাজ করবে
- `src/pages/` (নিজের assigned পেজ শুধু)
- `src/components/shared/` (সবুজ অনুমতি দিলে)
- `backend/controllers/` (নিজের assigned ফাংশন শুধু)

---