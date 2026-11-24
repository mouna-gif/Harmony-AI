import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import Risk from '../models/Risk.js';

// Assess risk for scenario
router.post('/assess', authMiddleware, async (req, res) => {
  try {
    const { scenario } = req.body;

    // Risk data by scenario
    const riskData = {
      market: {
        probability: 65,
        impact: 75,
        mitigationStrategies: [
          'Diversification du portefeuille produits',
          'Surveillance continue des tendances marché',
          'Plans de contingence pour changements réglementaires',
          'Partenariats stratégiques avec leaders du secteur'
        ]
      },
      operational: {
        probability: 45,
        impact: 85,
        mitigationStrategies: [
          'Automatisation des processus critiques',
          'Formation continue des équipes',
          'Mise en place de systèmes de backup',
          'Documentation complète des procédures'
        ]
      },
      financial: {
        probability: 35,
        impact: 90,
        mitigationStrategies: [
          'Réserves financières de sécurité',
          'Diversification des sources de revenus',
          'Audits financiers trimestriels',
          'Gestion rigoureuse de la trésorerie'
        ]
      },
      strategic: {
        probability: 55,
        impact: 70,
        mitigationStrategies: [
          'Révision annuelle de la stratégie',
          'Analyse concurrentielle régulière',
          'Innovation continue',
          'Alignement avec vision long-terme'
        ]
      }
    };

    const data = riskData[scenario] || riskData.market;
    const riskScore = Math.round((data.probability * data.impact) / 100);

    let status = 'Faible';
    if (riskScore > 70) status = 'Critical';
    else if (riskScore > 50) status = 'Élevé';
    else if (riskScore > 30) status = 'Moyen';

    // Generate projection
    const projection = [
      { month: 'Mois 1', noAction: riskScore, mitigation: riskScore - 5, aggressive: riskScore - 15 },
      { month: 'Mois 2', noAction: riskScore + 5, mitigation: riskScore - 8, aggressive: riskScore - 25 },
      { month: 'Mois 3', noAction: riskScore + 10, mitigation: riskScore - 12, aggressive: riskScore - 35 },
      { month: 'Mois 4', noAction: riskScore + 15, mitigation: riskScore - 15, aggressive: riskScore - 42 },
      { month: 'Mois 5', noAction: riskScore + 18, mitigation: riskScore - 18, aggressive: riskScore - 48 },
      { month: 'Mois 6', noAction: riskScore + 20, mitigation: riskScore - 22, aggressive: riskScore - 52 }
    ];

    const risk = new Risk({
      userId: req.userId,
      scenario,
      probability: data.probability,
      impact: data.impact,
      riskScore,
      status,
      mitigationStrategies: data.mitigationStrategies,
      projection
    });

    await risk.save();

    res.json({
      id: risk._id,
      scenario,
      probability: data.probability,
      impact: data.impact,
      riskScore,
      status,
      mitigationStrategies: data.mitigationStrategies,
      projection
    });
  } catch (error) {
    console.error('Risk assessment error:', error);
    res.status(500).json({ message: 'Erreur lors de l\'évaluation du risque' });
  }
});

// Get risk history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const risks = await Risk.find({ userId: req.userId })
      .sort({ assessedAt: -1 })
      .limit(50);

    res.json(risks);
  } catch (error) {
    console.error('Get risk history error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
  }
});

export default router;
