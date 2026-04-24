import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospitalName: String,
  billDate: Date,
  totalAmount: Number,
  currency: { type: String, default: 'INR' },
  lineItems: [{
    description: String,
    quantity: Number,
    amount: Number,
    category: String,
    isFlagged: { type: Boolean, default: false },
    flagReason: String,
  }],
  potentialSavings: Number,
  billImageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Bill = mongoose.model('Bill', billSchema);
export default Bill;
