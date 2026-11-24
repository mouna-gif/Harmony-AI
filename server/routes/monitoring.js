import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import mongoose from 'mongoose';
import SystemMetrics from '../models/SystemMetrics.js';

// Get system metrics
router.get('/metrics', authMiddleware, async (req, res) => {
  try {
    // Generate random but realistic metrics
    const metrics = {
      cpu: Math.floor(Math.random() * 30) + 40, // 40-70%
      memory: Math.floor(Math.random() * 25) + 55, // 55-80%
      database: Math.floor(Math.random() * 20) + 30, // 30-50%
      network: Math.floor(Math.random() * 35) + 45, // 45-80%
      activityLogs: [
        { action: 'Agent Analyste - Analyse complétée', status: 'success', time: '2 min ago' },
        { action: 'Base de données - Backup automatique', status: 'success', time: '15 min ago' },
        { action: 'Utilisateur connecté', status: 'info', time: '23 min ago' },
        { action: 'Simulation Jumeau Numérique', status: 'success', time: '1h ago' },
        { action: 'Analyse de sentiment complétée', status: 'success', time: '2h ago' }
      ]
    };

    // Save metrics to database
    const systemMetrics = new SystemMetrics(metrics);
    await systemMetrics.save();

    res.json(metrics);
  } catch (error) {
    console.error('Get metrics error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des métriques' });
  }
});

// Get MongoDB status
router.get('/database', authMiddleware, async (req, res) => {
  try {
    const conn = mongoose.connection;

    if (conn.readyState !== 1) {
      return res.status(503).json({
        status: 'disconnected',
        message: 'Base de données non connectée'
      });
    }

    // Get database stats
    const admin = conn.db.admin();
    const serverStatus = await admin.serverStatus();
    const dbStats = await conn.db.stats();

    // Get collections
    const collections = await conn.db.listCollections().toArray();

    // Get databases
    const databases = await admin.listDatabases();

    res.json({
      status: 'connected',
      host: '127.0.0.1:27017',
      cluster: 'Standalone',
      edition: `MongoDB ${serverStatus.version} Community`,
      databases: databases.databases.length,
      collections: collections.length,
      collectionNames: collections.map(c => c.name),
      databaseNames: databases.databases.map(db => db.name),
      stats: {
        collections: dbStats.collections,
        dataSize: dbStats.dataSize,
        indexSize: dbStats.indexSize,
        storageSize: dbStats.storageSize
      },
      uptime: serverStatus.uptime,
      connections: serverStatus.connections
    });
  } catch (error) {
    console.error('Get database status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération du statut de la base de données',
      error: error.message
    });
  }
});

// Get metrics history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await SystemMetrics.find()
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(history);
  } catch (error) {
    console.error('Get metrics history error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
  }
});

export default router;
