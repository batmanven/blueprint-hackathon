import mongoose from 'mongoose';

const expensePlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scenario: {
    condition: String,
    hospitalType: String,
    cityTier: String
  },
  projections: {
    estimatedCost: Number,
    hospitalStayDays: Number,
    medicineCosts: Number,
    procedureCosts: Number
  },
  savingsStrategies: [{
    category: String,
    action: String,
    potentialSavings: Number
  }],
  aiAnalysis: String,
  createdAt: { type: Date, default: Date.now },
});

const ExpensePlan = mongoose.model('ExpensePlan', expensePlanSchema);
export default ExpensePlan;
