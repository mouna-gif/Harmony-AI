import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import agentRoutes from './routes/agents.js';
import analyticsRoutes from './routes/analytics.js';
import sentimentRoutes from './routes/sentiment.js';
import riskRoutes from './routes/risk.js';
import predictionRoutes from './routes/predictions.js';
import recommendationRoutes from './routes/recommendations.js';
import userRoutes from './routes/users.js';
import monitoringRoutes from './routes/monitoring.js';
import digitalTwinRoutes from './routes/digitalTwin.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/digital-twin', digitalTwinRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Harmony AI API is running',
    mongodb: 'Connected',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Harmony AI Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
});
