import mongoose from 'mongoose';

const sentimentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    required: true
  },
  scores: {
    positive: Number,
    neutral: Number,
    negative: Number
  },
  emotions: [{
    emotion: String,
    score: Number
  }],
  keywords: [String],
  analyzedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Sentiment', sentimentSchema);
