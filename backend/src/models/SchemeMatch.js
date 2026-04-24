import mongoose from 'mongoose';

const schemeMatchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inputs: {
    age: Number,
    state: String,
    income: String,
    category: String,
    occupation: String,
    conditions: String
  },
  matchedSchemes: [{
    name: String,
    coverage: String,
    benefits: [String],
    link: String
  }],
  aiReasoning: String,
  createdAt: { type: Date, default: Date.now },
});

const SchemeMatch = mongoose.model('SchemeMatch', schemeMatchSchema);
export default SchemeMatch;
