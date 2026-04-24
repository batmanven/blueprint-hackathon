import express from 'express';
import multer from 'multer';
import { analyzeBill, getMyBills } from '../controllers/billController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer config for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

router.post('/analyze', upload.single('bill'), analyzeBill);
router.get('/', protect, getMyBills);

export default router;
