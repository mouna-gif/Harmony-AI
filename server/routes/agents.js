import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/auth.js';
import Agent from '../models/Agent.js';

// Get all agents for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find({ userId: req.userId });
    res.json(agents);
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des agents' });
  }
});

// Get specific agent
router.get('/:agentType', authMiddleware, async (req, res) => {
  try {
    let agent = await Agent.findOne({
      userId: req.userId,
      agentType: req.params.agentType
    });

    // Create agent if doesn't exist
    if (!agent) {
      agent = new Agent({
        userId: req.userId,
        agentType: req.params.agentType,
        conversation: [],
        status: 'Actif'
      });
      await agent.save();
    }

    res.json(agent);
  } catch (error) {
    console.error('Get agent error:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'agent' });
  }
});

// Send message to agent
router.post('/:agentType/message', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    let agent = await Agent.findOne({
      userId: req.userId,
      agentType: req.params.agentType
    });

    if (!agent) {
      agent = new Agent({
        userId: req.userId,
        agentType: req.params.agentType,
        conversation: []
      });
    }

    // Add user message
    agent.conversation.push({
      type: 'user',
      content: message,
      timestamp: new Date()
    });

    // Generate agent response based on agent type
    let agentResponse = '';
    switch (req.params.agentType) {
      case 'analyste':
        agentResponse = `J'ai analysé votre demande "${message}". Voici mes insights : Les données montrent une tendance positive avec une amélioration de 12% sur les KPIs principaux.`;
        break;
      case 'predicteur':
        agentResponse = `Basé sur "${message}", mes prévisions indiquent une probabilité de 87% d'atteindre les objectifs dans les 30 prochains jours.`;
        break;
      case 'optimiseur':
        agentResponse = `Pour optimiser "${message}", je recommande de réduire les coûts de 15% tout en maintenant la qualité. Économies estimées : €25K/mois.`;
        break;
      case 'critique':
        agentResponse = `Analyse critique de "${message}" : Points forts identifiés, mais attention aux risques opérationnels. Score de qualité : 8.5/10.`;
        break;
      default:
        agentResponse = `Message reçu : "${message}". Je suis à votre disposition pour vous aider.`;
    }

    // Add agent response
    agent.conversation.push({
      type: 'agent',
      content: agentResponse,
      timestamp: new Date()
    });

    agent.tasksCompleted += 1;
    agent.lastActive = new Date();

    await agent.save();

    res.json({
      message: 'Message envoyé',
      response: agentResponse,
      conversation: agent.conversation
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
  }
});

// Clear agent conversation
router.delete('/:agentType/conversation', authMiddleware, async (req, res) => {
  try {
    const agent = await Agent.findOne({
      userId: req.userId,
      agentType: req.params.agentType
    });

    if (agent) {
      agent.conversation = [];
      await agent.save();
    }

    res.json({ message: 'Conversation effacée' });
  } catch (error) {
    console.error('Clear conversation error:', error);
    res.status(500).json({ message: 'Erreur lors de l\'effacement de la conversation' });
  }
});

export default router;
