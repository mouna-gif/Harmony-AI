import mongoose from 'mongoose';

const digitalTwinSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scenario: {
    type: String,
    enum: ['baseline', 'aggressive', 'conservative', 'balanced'],
    required: true
  },
  results: {
    revenue: String,
    costs: String,
    profit: String,
    efficiency: String,
    riskLevel: String
  },
  recommendations: [String],
  simulatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('DigitalTwin', digitalTwinSchema);
