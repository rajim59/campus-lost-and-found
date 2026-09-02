import express from 'express';
import { getUserClaims } from '../controllers/claimController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/claims/my
router.get('/my', protect, getUserClaims);

export default router;