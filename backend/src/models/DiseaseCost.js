import mongoose from 'mongoose';

const diseaseCostSchema = new mongoose.Schema({
  conditionId: { type: String, required: true, unique: true },
  public: String,
  private: String,
  pmjay: String,
  recovery: String,
  annual_follow_up: String,
  branded_monthly: String,
  generic_monthly: String,
  annual_checkups: String,
  risks: [String],
  management: String,
  meds_monthly: String,
  per_cycle_generic: String,
  per_cycle_branded: String,
  full_course: String,
  per_session_private: String,
  per_session_pmjay: String,
  monthly_cost: String,
  transplant_cost: String,
  normal_private: String,
  c_section_private: String,
  jssk_public: String,
  post_natal_6mo: String
}, { strict: false });

const DiseaseCost = mongoose.model('DiseaseCost', diseaseCostSchema);

export default DiseaseCost;
