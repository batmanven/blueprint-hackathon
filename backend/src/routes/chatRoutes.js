import express from 'express';
import { streamChat, getChatResponse } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', getChatResponse);
router.post('/stream', streamChat);

export default router;
