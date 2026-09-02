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

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', protect, upload.array('images', 3), createPost);
router.put('/:id', protect, upload.array('images', 3), updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/claim', protect, submitClaim);
router.get('/:id/claims', protect, getClaimsByPost);

export default router;