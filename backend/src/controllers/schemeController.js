import Scheme from '../models/Scheme.js';
import SchemeMatch from '../models/SchemeMatch.js';
import { getStructuredAIResponse } from '../services/geminiService.js';
import { SCHEME_MATCHING_PROMPT } from '../utils/prompts.js';

// @desc    Get top matches for government schemes
// @route   POST /api/schemes/match
export const matchSchemes = async (req, res, next) => {
  try {
    const userProfile = req.body;
    
    // Fetch relevant schemes from DB (e.g., filtered by user's state)
    const query = {};
    if (userProfile.state) {
      query.$or = [{ state: userProfile.state }, { type: 'Central' }];
    }
    
    const schemes = await Scheme.find(query).limit(50);
    
    const prompt = SCHEME_MATCHING_PROMPT(userProfile, schemes);
    const aiResponse = await getStructuredAIResponse(
      prompt, 
      "You are the AarogyaRaksha DPI Intelligence Engine, a high-precision expert in Indian healthcare financial advocacy."
    );

    // Save to Database if user is authenticated
    if (req.user) {
      await SchemeMatch.create({
        user: req.user.id,
        inputs: userProfile,
        matchedSchemes: aiResponse.matchedSchemes,
        aiReasoning: aiResponse.aiReasoning
      });
    }

    res.json(aiResponse);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all schemes
// @route   GET /api/schemes
export const getSchemes = async (req, res, next) => {
  try {
    const schemes = await Scheme.find({});
    res.json(schemes);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a scheme (Admin only)
// @route   POST /api/schemes
export const createScheme = async (req, res, next) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.status(201).json(scheme);
  } catch (error) {
    next(error);
  }
};
