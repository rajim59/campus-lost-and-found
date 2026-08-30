
## 📁 Frontend ফোল্ডার স্ট্রাকচার

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/            🔒 LOCKED
│   │   ├── layout/        🔒 LOCKED
│   │   ├── routing/       🔒 LOCKED
│   │   └── shared/        🔓 OPEN (টিম কাজ করবে)
│   ├── pages/             🔓 OPEN (টিম কাজ করবে)
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── ... বাকি পেজ
│   │   └── admin/         🔓 OPEN (টিম কাজ করবে)
│   ├── contexts/          🔒 LOCKED
│   ├── services/          🔒 LOCKED
│   ├── utils/             🔒 LOCKED
│   ├── App.jsx            🔒 LOCKED
│   └── main.jsx           🔒 LOCKED
├── index.css              🔒 LOCKED
├── tailwind.config.js     🔒 LOCKED
└── package.json           🔒 LOCKED
```

---

## 🔒 LOCKED — কেউ হাত দেবে না

- `src/components/ui/` (সব ফাইল)
- `src/components/layout/` (সব ফাইল)
- `src/components/routing/` (সব ফাইল)
- `src/contexts/` (সব ফাইল)
- `src/services/` (সব ফাইল)
- `src/utils/` (সব ফাইল)
- `src/App.jsx`
- `src/main.jsx`
- `src/index.css`
- `tailwind.config.js`
- `package.json`

---

## 🔓 OPEN — টিম মেম্বাররা কাজ করবে

- `src/pages/` — সব পেজ ফাইল
- `src/pages/admin/` — অ্যাডমিন পেজ
- `src/components/shared/` — পেজ-স্পেসিফিক কম্পোনেন্ট (PostCard, FilterPills ইত্যাদি)

---