import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import Recommendation from '../models/Recommendation.js';

// Get recommendations by segment
router.get('/:segment', authMiddleware, async (req, res) => {
  try {
    const { segment } = req.params;

    let recommendation = await Recommendation.findOne({
      userId: req.userId,
      segment
    }).sort({ generatedAt: -1 });

    // Generate default recommendations if none exist
    if (!recommendation) {
      const recommendationData = {
        enterprise: {
          recommendations: [
            {
              title: 'Programme VIP Personnalisé',
              description: 'Service dédié avec gestionnaire de compte exclusif',
              roi: '+45%',
              impact: 'Très Élevé',
              effort: 'Moyen',
              priority: 1
            },
            {
              title: 'Optimisation Budgétaire',
              description: 'Analyse approfondie et restructuration financière',
              roi: '+62%',
              impact: 'Élevé',
              effort: 'Élevé',
              priority: 1
            },
            {
              title: 'Automatisation Avancée',
              description: 'Workflow intelligent et réduction temps traitement',
              roi: '+38%',
              impact: 'Élevé',
              effort: 'Moyen',
              priority: 2
            }
          ],
          segmentStats: {
            totalCustomers: 45,
            avgRevenue: '€125K',
            satisfactionRate: '94%'
          }
        },
        pme: {
          recommendations: [
            {
              title: 'Digitalisation Processus',
              description: 'Transformation numérique des opérations clés',
              roi: '+32%',
              impact: 'Élevé',
              effort: 'Moyen',
              priority: 1
            },
            {
              title: 'Formation Équipes',
              description: 'Programme de montée en compétences',
              roi: '+28%',
              impact: 'Moyen',
              effort: 'Faible',
              priority: 2
            },
            {
              title: 'Expansion Marché',
              description: 'Stratégie de croissance ciblée',
              roi: '+55%',
              impact: 'Très Élevé',
              effort: 'Élevé',
              priority: 1
            }
          ],
          segmentStats: {
            totalCustomers: 128,
            avgRevenue: '€42K',
            satisfactionRate: '89%'
          }
        },
        startup: {
          recommendations: [
            {
              title: 'Accelerator Program',
              description: 'Accompagnement intensif 6 mois',
              roi: '+85%',
              impact: 'Très Élevé',
              effort: 'Élevé',
              priority: 1
            },
            {
              title: 'MVP Optimisation',
              description: 'Amélioration produit minimal viable',
              roi: '+42%',
              impact: 'Élevé',
              effort: 'Moyen',
              priority: 1
            },
            {
              title: 'Networking Stratégique',
              description: 'Connexion avec investisseurs et mentors',
              roi: '+65%',
              impact: 'Moyen',
              effort: 'Faible',
              priority: 2
            }
          ],
          segmentStats: {
            totalCustomers: 213,
            avgRevenue: '€8.5K',
            satisfactionRate: '91%'
          }
        }
      };

      const data = recommendationData[segment] || recommendationData.startup;

      recommendation = new Recommendation({
        userId: req.userId,
        segment,
        ...data
      });

      await recommendation.save();
    }

    res.json(recommendation);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des recommandations' });
  }
});

// Generate action plan
router.post('/:segment/action-plan', authMiddleware, async (req, res) => {
  try {
    const { segment } = req.params;

    const actionPlan = {
      segment,
      generatedAt: new Date(),
      steps: [
        { order: 1, action: 'Analyse détaillée du segment', duration: '1 semaine' },
        { order: 2, action: 'Définition des objectifs spécifiques', duration: '3 jours' },
        { order: 3, action: 'Mise en place des initiatives prioritaires', duration: '2 semaines' },
        { order: 4, action: 'Suivi et ajustements', duration: 'Continu' }
      ],
      expectedResults: {
        revenueIncrease: '+35%',
        customerSatisfaction: '+18%',
        operationalEfficiency: '+42%'
      }
    };

    res.json(actionPlan);
  } catch (error) {
    console.error('Generate action plan error:', error);
    res.status(500).json({ message: 'Erreur lors de la génération du plan d\'action' });
  }
});

export default router;
