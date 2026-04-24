import express from 'express';
import { planExpenses } from '../controllers/expenseController.js';

const router = express.Router();

router.post('/plan', planExpenses);

export default router;
