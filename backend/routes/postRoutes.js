import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  submitClaim,
  getClaimsByPost,
} from '../controllers/postController.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/:id/claims', getClaimsByPost); // ✅ protect বাদ দিয়ে পাবলিক করা হয়েছে

// Protected routes
router.post('/', protect, upload.array('images', 3), createPost);
router.put('/:id', protect, upload.array('images', 3), updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/claim', protect, submitClaim);

export default router;