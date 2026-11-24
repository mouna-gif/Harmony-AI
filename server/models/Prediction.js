import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: String,
    required: true
  },
  probability: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  impact: {
    type: String,
    enum: ['Élevé', 'Moyen', 'Faible'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  actions: [String],
  timeframe: {
    type: String,
    enum: ['24h', '7days', '30days'],
    default: '7days'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Prediction', predictionSchema);
