import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import Analytics from '../models/Analytics.js';

// Get analytics data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const analytics = await Analytics.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(100);

    // Generate default data if empty
    if (analytics.length === 0) {
      const defaultData = {
        kpis: {
          optimizedDecisions: 1247,
          savedResources: 45000,
          accuracy: 94.7,
          activeUsers: 328
        },
        performanceTrends: [
          { name: 'Jan', value: 65 },
          { name: 'Fév', value: 78 },
          { name: 'Mar', value: 82 },
          { name: 'Avr', value: 88 },
          { name: 'Mai', value: 91 },
          { name: 'Juin', value: 94 }
        ],
        agentDistribution: [
          { name: 'Analyste', value: 35 },
          { name: 'Prédicteur', value: 28 },
          { name: 'Optimiseur', value: 25 },
          { name: 'Critique', value: 12 }
        ],
        savings: [
          { name: 'Jan', ressources: 28000, temps: 15000 },
          { name: 'Fév', ressources: 32000, temps: 18000 },
          { name: 'Mar', ressources: 38000, temps: 21000 },
          { name: 'Avr', ressources: 42000, temps: 24000 },
          { name: 'Mai', ressources: 45000, temps: 27000 }
        ]
      };

      return res.json(defaultData);
    }

    res.json(analytics);
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des analytics' });
  }
});

// Create analytics entry
router.post('/', authMiddleware, async (req, res) => {
  try {
    const analytics = new Analytics({
      userId: req.userId,
      ...req.body
    });

    await analytics.save();
    res.status(201).json(analytics);
  } catch (error) {
    console.error('Create analytics error:', error);
    res.status(500).json({ message: 'Erreur lors de la création des analytics' });
  }
});

export default router;
