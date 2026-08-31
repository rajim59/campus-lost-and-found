import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { isAdmin } from '../../middleware/adminMiddleware.js';
import {
  getPendingUsers,
  verifyUser,
  getAllPosts,
  deletePost,
  getAllClaims,
  setClaimDeadline,
  acceptClaim,
  rejectClaim,
} from '../../controllers/admin/adminController.js';

const router = express.Router();

// সব Admin রাউটের জন্য protect এবং isAdmin মিডলওয়্যার কার্যকর থাকবে
router.use(protect, isAdmin);

// =============================================
// USER VERIFICATION ROUTES (সবুজ)
// =============================================
router.get('/pending-users', getPendingUsers);
router.put('/verify-user/:id', verifyUser);

// =============================================
// CLAIM MANAGEMENT ROUTES (সবুজ)
// =============================================
router.put('/claims/:id/deadline', setClaimDeadline);
router.put('/claims/:id/accept', acceptClaim);
router.put('/claims/:id/reject', rejectClaim);

// =============================================
// POST & CLAIM MODERATION ROUTES (আল ফাহিম)
// =============================================
router.get('/posts', getAllPosts);
router.delete('/posts/:id', deletePost);
router.get('/claims', getAllClaims);

export default router;