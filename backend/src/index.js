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
  origin: '*',
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

app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Keep-alive logic for Render free tier
  const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;
  if (RENDER_EXTERNAL_URL) {
    setInterval(() => {
      fetch(`${RENDER_EXTERNAL_URL}/api/ping`)
        .then(() => console.log('Self-ping successful'))
        .catch(err => console.error('Self-ping failed:', err));
    }, 600000); // Ping every 10 minutes
  }
});
