import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'adminRoutes.js working' }));

export default router;
