import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  ply: { type: String },
  attachmentName: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'new' },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
