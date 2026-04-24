import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import billRoutes from './routes/billRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import abhaRoutes from './routes/abhaRoutes.js';

connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/abha', abhaRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AarogyaRaksha API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
