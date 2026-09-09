import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  category: { type: String, required: true }, // 'charts' or 'heatmap'
  metricName: { type: String },               // e.g., 'hero', 'about'
  value: { type: String },                    // The actual stat
  views: { type: Number, default: 0 },
  data: { type: Object },                     // For the weekly/monthly arrays
  timestamp: { type: Date, default: Date.now } // ADD THIS for filtering
}, { timestamps: true }); // This automatically handles updatedAt/createdAt

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);