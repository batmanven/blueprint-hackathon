import { getStructuredAIResponse } from '../services/geminiService.js';
import User from '../models/User.js';

// @desc    Verify ABHA Number (14 digits)
// @route   POST /api/abha/verify
export const verifyABHA = async (req, res, next) => {
  try {
    const { abhaNumber } = req.body;
    
    if (!abhaNumber || abhaNumber.replace(/-/g, '').length !== 14) {
      return res.status(400).json({ message: "Invalid ABHA number. Must be 14 digits." });
    }

    // High-fidelity simulation of ABDM OTP Gateway
    res.json({ 
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      message: "OTP sent to registered mobile number (******8901)"
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch ABHA Profile Data
// @route   POST /api/abha/fetch
export const fetchABHAProfile = async (req, res, next) => {
  try {
    const { transactionId, otp } = req.body;

    if (otp !== '123456') { // Standard demo OTP
      return res.status(401).json({ message: "Invalid OTP. Please try '123456' for demo." });
    }

    // PEAK IMPLEMENTATION: Use Gemini to generate a high-fidelity realistic profile
    // This makes the 'mock' feel real-time and unique to the session.
    const profilePrompt = `
      Generate a realistic Indian citizen health profile for a DPI health scheme matcher.
      Return JSON:
      {
        "name": "Full Name",
        "age": number,
        "gender": "M/F",
        "state": "Bihar/Karnataka/Maharashtra/Tamil Nadu/Delhi",
        "income": "<1L / 1-3L / 3-5L / >5L",
        "category": "General/OBC/SC/ST",
        "occupation": "Specific vulnerable occupation",
        "conditions": "Comma separated chronic conditions (e.g. Diabetes, Asthma)",
        "abhaAddress": "name@abdm"
      }
    `;

    const profile = await getStructuredAIResponse(profilePrompt, "You are the ABDM Gateway Profile Engine.");
    
    // SAVE TO USER PROFILE
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        age: profile.age,
        state: profile.state,
        income: profile.income,
        category: profile.category,
        occupation: profile.occupation,
        abhaId: profile.abhaAddress
      });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};
