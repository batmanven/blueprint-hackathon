import express from 'express';
import { verifyABHA, fetchABHAProfile } from '../controllers/abhaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/verify', protect, verifyABHA);
router.post('/fetch', protect, fetchABHAProfile);

export default router;
