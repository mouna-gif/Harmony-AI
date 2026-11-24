import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  segment: {
    type: String,
    enum: ['enterprise', 'pme', 'startup'],
    required: true
  },
  recommendations: [{
    title: String,
    description: String,
    roi: String,
    impact: String,
    effort: String,
    priority: Number
  }],
  segmentStats: {
    totalCustomers: Number,
    avgRevenue: String,
    satisfactionRate: String
  },
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Recommendation', recommendationSchema);
