import express from 'express';
import { matchSchemes, getSchemes, createScheme } from '../controllers/schemeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getSchemes)
  .post(protect, admin, createScheme);

router.post('/match', matchSchemes);

export default router;
