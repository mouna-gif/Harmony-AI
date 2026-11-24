import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['user', 'agent'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const agentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agentType: {
    type: String,
    enum: ['analyste', 'predicteur', 'optimiseur', 'critique'],
    required: true
  },
  conversation: [messageSchema],
  status: {
    type: String,
    enum: ['Actif', 'En pause', 'Inactif'],
    default: 'Actif'
  },
  tasksCompleted: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Agent', agentSchema);
