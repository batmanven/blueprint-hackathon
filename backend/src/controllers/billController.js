import { analyzeImageWithGemini } from '../services/geminiService.js';
import { BILL_ANALYSIS_PROMPT } from '../utils/prompts.js';
import Bill from '../models/Bill.js';
import fs from 'fs';
import path from 'path';

// @desc    Analyze hospital bill using Gemini Vision
// @route   POST /api/bills/analyze
export const analyzeBill = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload an image of the hospital bill');
    }

    const imageBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    // Load Peak Benchmark Data
    const cghsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/cghs_rates.json'), 'utf-8'));

    const analysis = await analyzeImageWithGemini(
      `${BILL_ANALYSIS_PROMPT}\n\nREFERENCE BENCHMARKS: ${JSON.stringify(cghsData)}`,
      imageBuffer,
      mimeType,
      "You are a meticulous medical billing auditor at AarogyaRaksha."
    );

    // Save to DB if user is logged in
    if (req.user) {
      await Bill.create({
        user: req.user.id,
        hospitalName: analysis.hospitalName,
        totalAmount: analysis.totalAmount,
        currency: analysis.currency || 'INR',
        lineItems: analysis.lineItems,
        potentialSavings: analysis.potentialSavings,
        createdAt: new Date()
      });
    }

    res.json(analysis);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all analyzed bills for a user
// @route   GET /api/bills
export const getMyBills = async (req, res, next) => {
  try {
    const bills = await Bill.find({ user: req.user._id }).sort('-createdAt');
    res.json(bills);
  } catch (error) {
    next(error);
  }
};
