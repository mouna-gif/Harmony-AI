import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import Sentiment from '../models/Sentiment.js';

// Analyze sentiment
router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Le texte ne peut pas être vide' });
    }

    // Simple sentiment analysis (in production, use real NLP)
    const positiveWords = ['bon', 'excellent', 'super', 'génial', 'parfait', 'satisfait', 'content', 'heureux', 'bien', 'formidable'];
    const negativeWords = ['mauvais', 'terrible', 'nul', 'horrible', 'médiocre', 'insatisfait', 'déçu', 'triste', 'problème', 'erreur'];

    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveScore++;
    });

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeScore++;
    });

    let sentiment = 'neutral';
    if (positiveScore > negativeScore) sentiment = 'positive';
    else if (negativeScore > positiveScore) sentiment = 'negative';

    const total = positiveScore + negativeScore + 1;
    const scores = {
      positive: Math.round((positiveScore / total) * 100),
      neutral: Math.round((1 / total) * 100),
      negative: Math.round((negativeScore / total) * 100)
    };

    // Generate emotions
    const emotions = [
      { emotion: 'joie', score: sentiment === 'positive' ? 75 : 15 },
      { emotion: 'tristesse', score: sentiment === 'negative' ? 70 : 10 },
      { emotion: 'colère', score: negativeScore > 2 ? 60 : 5 },
      { emotion: 'peur', score: lowerText.includes('risque') ? 40 : 8 },
      { emotion: 'surprise', score: Math.floor(Math.random() * 30) + 10 }
    ];

    // Extract keywords (simple approach)
    const words = text.split(/\s+/).filter(w => w.length > 4);
    const keywords = words.slice(0, 5);

    const sentimentAnalysis = new Sentiment({
      userId: req.userId,
      text,
      sentiment,
      scores,
      emotions,
      keywords
    });

    await sentimentAnalysis.save();

    res.json({
      id: sentimentAnalysis._id,
      sentiment,
      scores,
      emotions,
      keywords
    });
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    res.status(500).json({ message: 'Erreur lors de l\'analyse du sentiment' });
  }
});

// Get sentiment history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await Sentiment.find({ userId: req.userId })
      .sort({ analyzedAt: -1 })
      .limit(50);

    res.json(history);
  } catch (error) {
    console.error('Get sentiment history error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
  }
});

export default router;
