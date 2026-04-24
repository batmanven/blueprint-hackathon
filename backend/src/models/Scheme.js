import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  type: { type: String, enum: ['Central', 'State', 'State/Integrated'], required: true },
  state: String,
  coverage: String,
  eligibility: {
    incomeLimit: String,
    ageRange: String,
    categories: [String],
    familySize: String,
    conditions: [String],
  },
  benefits: [String],
  documentsRequired: [String],
  applicationUrl: String,
  applicationSteps: [String],
  createdAt: { type: Date, default: Date.now },
});

const Scheme = mongoose.model('Scheme', schemeSchema);
export default Scheme;
