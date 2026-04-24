import express from 'express';
import { searchMedicines, seedMedicines } from '../controllers/medicineController.js';

const router = express.Router();

router.get('/search', searchMedicines);
router.post('/seed', seedMedicines);

export default router;
