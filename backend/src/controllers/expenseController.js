import ExpensePlan from '../models/ExpensePlan.js';
import DiseaseCost from '../models/DiseaseCost.js';
import { getStructuredAIResponse } from '../services/geminiService.js';
import { EXPENSE_PLANNING_PROMPT } from '../utils/expensePrompts.js';

// @desc    Plan healthcare expenses using AI
// @route   POST /api/expenses/plan
export const planExpenses = async (req, res, next) => {
  try {
    const { profile, history } = req.body;
    
    // 1. Fetch relevant baseline data from DB for the selected condition if available
    let baselineData = null;
    if (profile.conditionId) {
      baselineData = await DiseaseCost.findOne({ conditionId: profile.conditionId });
    }

    // 2. Build the AI Prompt with user profile and optional baseline data
    const enrichedProfile = baselineData ? { ...profile, baseline: baselineData } : profile;
    const prompt = EXPENSE_PLANNING_PROMPT(enrichedProfile, history);
    
    const analysis = await getStructuredAIResponse(prompt, "You are a specialized healthcare actuary and financial planner at AarogyaRaksha.");

    // 3. Save to Database if user is authenticated
    if (req.user) {
      await ExpensePlan.create({
        user: req.user.id,
        scenario: {
          condition: profile.condition || profile.conditionId,
          hospitalType: profile.hospitalType,
          cityTier: profile.cityTier
        },
        projections: analysis.costBreakdown,
        savingsStrategies: analysis.dpiNextSteps,
        aiAnalysis: analysis.planningAdvice,
        shieldScore: analysis.shieldScore,
        createdAt: new Date()
      });
    }

    res.json(analysis);
  } catch (error) {
    next(error);
  }
};
