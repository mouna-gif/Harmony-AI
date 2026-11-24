import mongoose from 'mongoose';

const riskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scenario: {
    type: String,
    enum: ['market', 'operational', 'financial', 'strategic'],
    required: true
  },
  probability: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  impact: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  riskScore: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Critical', 'Élevé', 'Moyen', 'Faible'],
    required: true
  },
  mitigationStrategies: [String],
  projection: [{
    month: String,
    noAction: Number,
    mitigation: Number,
    aggressive: Number
  }],
  assessedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Risk', riskSchema);
