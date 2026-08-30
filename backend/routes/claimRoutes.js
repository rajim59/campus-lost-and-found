import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'claimRoutes.js working' }));

export default router;
