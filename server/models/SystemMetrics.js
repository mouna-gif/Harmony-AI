import mongoose from 'mongoose';

const systemMetricsSchema = new mongoose.Schema({
  cpu: {
    type: Number,
    required: true
  },
  memory: {
    type: Number,
    required: true
  },
  database: {
    type: Number,
    required: true
  },
  network: {
    type: Number,
    required: true
  },
  activityLogs: [{
    action: String,
    status: String,
    time: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('SystemMetrics', systemMetricsSchema);
