import ExpensePlan from '../models/ExpensePlan.js';
import { getStructuredAIResponse } from '../services/geminiService.js';
import { EXPENSE_PLANNING_PROMPT } from '../utils/expensePrompts.js';

// @desc    Plan healthcare expenses using AI
// @route   POST /api/expenses/plan
export const planExpenses = async (req, res, next) => {
  try {
    const { profile, history } = req.body;
    
    const prompt = EXPENSE_PLANNING_PROMPT(profile, history);
    const analysis = await getStructuredAIResponse(prompt, "You are a specialized healthcare actuary and financial planner.");

    // Save to Database if user is authenticated
    if (req.user) {
      await ExpensePlan.create({
        user: req.user.id,
        scenario: {
          condition: profile.condition,
          hospitalType: profile.hospitalType,
          cityTier: profile.cityTier
        },
        projections: analysis.projections,
        savingsStrategies: analysis.savingsStrategies,
        aiAnalysis: analysis.summary
      });
    }

    res.json(analysis);
  } catch (error) {
    next(error);
  }
};
