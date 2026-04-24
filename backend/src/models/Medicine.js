import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  brandName: { type: String, required: true, index: true },
  genericName: { type: String, required: true, index: true },
  salt: { type: String, index: true },
  brandedPrice: Number,
  janAushadhiPrice: Number,
  dosage: String,
  category: String,
  savingsPercent: Number,
  createdAt: { type: Date, default: Date.now },
});

// Text index for search
medicineSchema.index({ brandName: 'text', genericName: 'text', salt: 'text' });

const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;
