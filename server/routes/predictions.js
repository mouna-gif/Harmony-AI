import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import Prediction from '../models/Prediction.js';

// Get predictions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { timeframe = '7days' } = req.query;

    let predictions = await Prediction.find({
      userId: req.userId,
      timeframe
    }).sort({ probability: -1 });

    // Generate default predictions if none exist
    if (predictions.length === 0) {
      const defaultPredictions = [
        {
          event: 'Pic de Demandes Certifications',
          probability: 87,
          date: 'Dans 3 jours',
          impact: 'Élevé',
          category: 'Opérationnel',
          actions: [
            'Augmenter capacité support',
            'Préparer ressources supplémentaires',
            'Communiquer avec clients prioritaires'
          ]
        },
        {
          event: 'Maintenance Système Requise',
          probability: 72,
          date: 'Dans 5 jours',
          impact: 'Moyen',
          category: 'Technique',
          actions: [
            'Planifier fenêtre maintenance',
            'Notifier utilisateurs',
            'Préparer équipe technique'
          ]
        },
        {
          event: 'Opportunité Partenariat Stratégique',
          probability: 65,
          date: 'Dans 10 jours',
          impact: 'Élevé',
          category: 'Business',
          actions: [
            'Préparer pitch deck',
            'Analyser synergies potentielles',
            'Organiser réunion préliminaire'
          ]
        },
        {
          event: 'Mise à Jour Réglementaire',
          probability: 58,
          date: 'Dans 15 jours',
          impact: 'Moyen',
          category: 'Conformité',
          actions: [
            'Réviser procédures',
            'Former équipes concernées',
            'Mettre à jour documentation'
          ]
        }
      ];

      // Save default predictions
      for (const pred of defaultPredictions) {
        const prediction = new Prediction({
          userId: req.userId,
          timeframe,
          ...pred
        });
        await prediction.save();
        predictions.push(prediction);
      }
    }

    res.json(predictions);
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des prédictions' });
  }
});

// Create prediction
router.post('/', authMiddleware, async (req, res) => {
  try {
    const prediction = new Prediction({
      userId: req.userId,
      ...req.body
    });

    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    console.error('Create prediction error:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la prédiction' });
  }
});

export default router;
