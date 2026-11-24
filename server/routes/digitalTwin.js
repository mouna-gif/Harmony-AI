import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import DigitalTwin from '../models/DigitalTwin.js';

// Run simulation
router.post('/simulate', authMiddleware, async (req, res) => {
  try {
    const { scenario } = req.body;

    const simulationData = {
      baseline: {
        revenue: '€1.2M',
        costs: '€850K',
        profit: '€350K',
        efficiency: '72%',
        riskLevel: 'Moyen',
        recommendations: [
          'Maintenir les opérations actuelles',
          'Surveiller les indicateurs clés',
          'Optimiser progressivement les processus'
        ]
      },
      aggressive: {
        revenue: '€2.1M',
        costs: '€1.4M',
        profit: '€700K',
        efficiency: '65%',
        riskLevel: 'Élevé',
        recommendations: [
          'Investissement massif dans le marketing',
          'Expansion rapide de l\'équipe',
          'Mise en place de contrôles rigoureux',
          'Plan de contingence robuste'
        ]
      },
      conservative: {
        revenue: '€950K',
        costs: '€620K',
        profit: '€330K',
        efficiency: '81%',
        riskLevel: 'Faible',
        recommendations: [
          'Focus sur la rentabilité',
          'Réduction des dépenses non essentielles',
          'Consolidation des acquis',
          'Croissance organique lente'
        ]
      },
      balanced: {
        revenue: '€1.5M',
        costs: '€980K',
        profit: '€520K',
        efficiency: '78%',
        riskLevel: 'Modéré',
        recommendations: [
          'Équilibre entre croissance et stabilité',
          'Investissements ciblés et mesurés',
          'Diversification progressive',
          'Innovation continue'
        ]
      }
    };

    const data = simulationData[scenario] || simulationData.baseline;

    const simulation = new DigitalTwin({
      userId: req.userId,
      scenario,
      results: {
        revenue: data.revenue,
        costs: data.costs,
        profit: data.profit,
        efficiency: data.efficiency,
        riskLevel: data.riskLevel
      },
      recommendations: data.recommendations
    });

    await simulation.save();

    res.json({
      id: simulation._id,
      scenario,
      results: simulation.results,
      recommendations: simulation.recommendations,
      simulatedAt: simulation.simulatedAt
    });
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ message: 'Erreur lors de la simulation' });
  }
});

// Get simulation history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const simulations = await DigitalTwin.find({ userId: req.userId })
      .sort({ simulatedAt: -1 })
      .limit(20);

    res.json(simulations);
  } catch (error) {
    console.error('Get simulation history error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
  }
});

export default router;
