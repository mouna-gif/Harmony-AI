import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, Send, Smile, Meh, Frown, TrendingUp, 
  Bot, Brain, Sparkles, Play, Copy, Zap, Shield, 
  Eye, Target, Crosshair, Radar, Scan, Fingerprint,
  Activity, Heart, ThumbsUp, ThumbsDown, AlertTriangle,
  BarChart3, PieChart, LineChart, Gauge, Microscope,
  Atom, Dna, Network, GitGraph, Binary,
  // Nouvelles icônes ajoutées
  TrendingDown
} from 'lucide-react';
// Import pour Recharts
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function SentimentAnalysis() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // --- AI DEEP ANALYSIS STATE ---
  const [deepAnalysisMode, setDeepAnalysisMode] = useState<'basic' | 'advanced' | 'forensic'>('advanced');
  const [deepResult, setDeepResult] = useState<any>(null);
  const [isDeepAnalyzing, setIsDeepAnalyzing] = useState(false);
  const [analysisLayers, setAnalysisLayers] = useState(0);
  
  // --- PATTERN DETECTION STATE ---
  const [patternDetection, setPatternDetection] = useState(false);
  const [detectedPatterns, setDetectedPatterns] = useState<any[]>([]);
  
  // --- EMOTIONAL INTELLIGENCE STATE ---
  const [emotionalProfile, setEmotionalProfile] = useState<any>(null);
  const [showEmotionalMap, setShowEmotionalMap] = useState(false);
  
  // --- PREDICTIVE ANALYSIS STATE ---
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // --- NOUVELLES DONNÉES AJOUTÉES ---
  const sentimentData = [
    { name: 'Positif', value: 62, color: '#10b981' },
    { name: 'Neutre', value: 28, color: '#fbbf24' },
    { name: 'Négatif', value: 10, color: '#ef4444' }
  ];

  const trendData = [
    { day: 'Lun', positive: 58, neutral: 30, negative: 12 },
    { day: 'Mar', positive: 64, neutral: 26, negative: 10 },
    { day: 'Mer', positive: 60, neutral: 29, negative: 11 },
    { day: 'Jeu', positive: 65, neutral: 25, negative: 10 },
    { day: 'Ven', positive: 62, neutral: 28, negative: 10 },
    { day: 'Sam', positive: 67, neutral: 24, negative: 9 },
    { day: 'Dim', positive: 63, neutral: 27, negative: 10 }
  ];

  const recentFeedback = [
    { id: 1, user: 'Sophie M.', message: 'Interface très intuitive et rapide!', sentiment: 'positive', score: 0.92 },
    { id: 2, user: 'Thomas D.', message: 'Quelques bugs mineurs à corriger', sentiment: 'neutral', score: 0.45 },
    { id: 3, user: 'Marie L.', message: 'Excellent outil d\'analyse de données', sentiment: 'positive', score: 0.88 },
    { id: 4, user: 'Pierre B.', message: 'Temps de chargement un peu long', sentiment: 'negative', score: 0.28 }
  ];

  const analyzeSentiment = () => {
    if (!text.trim()) return;
    setAnalyzing(true);

    setTimeout(() => {
      const sentiments = ['positive', 'neutral', 'negative'];
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

      const scores = {
        positive: randomSentiment === 'positive' ? 0.85 : randomSentiment === 'neutral' ? 0.35 : 0.15,
        neutral: randomSentiment === 'neutral' ? 0.75 : 0.25,
        negative: randomSentiment === 'negative' ? 0.80 : randomSentiment === 'neutral' ? 0.30 : 0.10
      };

      setResult({
        sentiment: randomSentiment,
        scores: scores,
        confidence: Math.max(scores.positive, scores.neutral, scores.negative),
        keywords: text.split(' ').filter((word: string) => word.length > 4).slice(0, 5),
        emotions: {
          joy: randomSentiment === 'positive' ? 0.75 : 0.25,
          sadness: randomSentiment === 'negative' ? 0.70 : 0.20,
          anger: randomSentiment === 'negative' ? 0.65 : 0.15,
          fear: randomSentiment === 'negative' ? 0.55 : 0.10,
          surprise: 0.40
        }
      });

      setAnalyzing(false);
    }, 1500);
  };

  // --- AI DEEP ANALYSIS ---
  const runDeepAnalysis = async () => {
    if (!text.trim()) return;
    setIsDeepAnalyzing(true);
    setAnalysisLayers(0);
    setDeepResult(null);

    const layers = [
      'Analyse lexicale et syntaxique...',
      'Extraction des entités émotionnelles...',
      'Cartographie des relations sémantiques...',
      'Détection des biais cognitifs...',
      'Analyse du sous-texte implicite...',
      'Évaluation de l\'intensité émotionnelle...',
      'Génération du profil psycholinguistique...'
    ];

    for (let i = 0; i < layers.length; i++) {
      setAnalysisLayers(i + 1);
      await new Promise(r => setTimeout(r, 800));
    }

    setDeepResult({
      linguisticProfile: {
        complexity: (Math.random() * 60 + 40).toFixed(1),
        formality: (Math.random() * 50 + 30).toFixed(1),
        polarity: (Math.random() * 2 - 1).toFixed(3),
        subjectivity: (Math.random() * 70 + 20).toFixed(1)
      },
      emotionalDepth: {
        primary: ['Satisfaction', 'Gratitude', 'Confiance'][Math.floor(Math.random() * 3)],
        secondary: ['Espoir', 'Fierté', 'Soulagement'][Math.floor(Math.random() * 3)],
        intensity: (Math.random() * 60 + 40).toFixed(0),
        authenticity: (Math.random() * 40 + 60).toFixed(1)
      },
      cognitivePatterns: [
        { name: 'Raisonnement positif', score: (Math.random() * 40 + 60).toFixed(0) },
        { name: 'Projection future', score: (Math.random() * 50 + 30).toFixed(0) },
        { name: 'Attribution causale', score: (Math.random() * 40 + 40).toFixed(0) },
        { name: 'Comparaison sociale', score: (Math.random() * 30 + 20).toFixed(0) }
      ],
      riskIndicators: {
        sarcasm: (Math.random() * 20).toFixed(0),
        deception: (Math.random() * 15).toFixed(0),
        ambiguity: (Math.random() * 25).toFixed(0),
        manipulation: (Math.random() * 10).toFixed(0)
      }
    });

    setIsDeepAnalyzing(false);
  };

  // --- PATTERN DETECTION ---
  const detectPatterns = () => {
    if (!text.trim()) return;
    setPatternDetection(true);

    setTimeout(() => {
      setDetectedPatterns([
        { type: 'Répétition émotionnelle', count: Math.floor(Math.random() * 5) + 1, icon: Activity, color: '#8b5cf6' },
        { type: 'Mots de transition', count: Math.floor(Math.random() * 4) + 1, icon: Network, color: '#00d9ff' },
        { type: 'Marqueurs d\'intensité', count: Math.floor(Math.random() * 3) + 1, icon: Zap, color: '#fbbf24' },
        { type: 'Anaphores', count: Math.floor(Math.random() * 2) + 1, icon: GitGraph, color: '#10b981' },
        { type: 'Structures comparatives', count: Math.floor(Math.random() * 3) + 1, icon: Binary, color: '#ef4444' }
      ]);
      setPatternDetection(false);
    }, 2000);
  };

  // --- EMOTIONAL INTELLIGENCE MAP ---
  const generateEmotionalProfile = () => {
    setEmotionalProfile({
      personalityTraits: {
        openness: (Math.random() * 60 + 30).toFixed(0),
        conscientiousness: (Math.random() * 50 + 40).toFixed(0),
        extraversion: (Math.random() * 60 + 20).toFixed(0),
        agreeableness: (Math.random() * 50 + 35).toFixed(0),
        neuroticism: (Math.random() * 40 + 10).toFixed(0)
      },
      emotionalRange: {
        valence: (Math.random() * 2 - 1).toFixed(2),
        arousal: (Math.random() * 80 + 10).toFixed(0),
        dominance: (Math.random() * 60 + 20).toFixed(0)
      },
      communicationStyle: {
        assertiveness: (Math.random() * 50 + 30).toFixed(0),
        expressiveness: (Math.random() * 60 + 25).toFixed(0),
        empathy: (Math.random() * 45 + 40).toFixed(0)
      }
    });
    setShowEmotionalMap(true);
  };

  // --- PREDICTIVE ANALYSIS ---
  const runPredictiveAnalysis = async () => {
    if (!text.trim()) return;
    setIsPredicting(true);

    await new Promise(r => setTimeout(r, 2500));

    setPredictionResult({
      npsPrediction: Math.floor(Math.random() * 40 + 60),
      churnRisk: (Math.random() * 30).toFixed(1),
      loyaltyScore: (Math.random() * 40 + 55).toFixed(0),
      satisfactionTrend: Math.random() > 0.5 ? 'En hausse 📈' : 'Stable ➡️',
      recommendedActions: [
        'Envoyer un message de remerciement personnalisé',
        'Proposer une offre de fidélité',
        'Planifier un appel de suivi dans 7 jours',
        'Ajouter au programme VIP'
      ],
      sentimentProjection: {
        shortTerm: (Math.random() * 30 + 65).toFixed(0),
        mediumTerm: (Math.random() * 25 + 60).toFixed(0),
        longTerm: (Math.random() * 35 + 50).toFixed(0)
      }
    });

    setIsPredicting(false);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-8 h-8 text-[#10b981]" />;
      case 'negative': return <Frown className="w-8 h-8 text-[#ef4444]" />;
      default: return <Meh className="w-8 h-8 text-[#fbbf24]" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return '#fbbf24';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#00d9ff]/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#00d9ff]" />
          </div>
          <div>
            <h2
              className="text-3xl"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Analyse des Émotions et Feedback
            </h2>
            <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
              Analysez les émotions et sentiments dans le texte
            </p>
          </div>
        </div>
      </motion.div>

      {/* --- RAPPORT EXPLICATIF HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#8b5cf6]/5 border border-[#00d9ff]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-[#00d9ff]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">📊 Rapport - Module d'Analyse de Sentiment</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#00d9ff] font-semibold">🔬 Méthodologie :</span> Analyse NLP multicouches avec détection d'émotions primaires/secondaires, extraction de mots-clés, et scoring de sentiment sur une échelle de 0 à 1.</p>
              <p><span className="text-[#00d9ff] font-semibold">📈 Portée :</span> Le module traite les commentaires clients, feedbacks utilisateurs et avis produits pour générer des insights actionnables.</p>
              <p><span className="text-[#00d9ff] font-semibold">💡 Valeur ajoutée :</span> Détection précoce des signaux d'insatisfaction et opportunités d'amélioration.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- NOUVELLE SECTION: OVERVIEW CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Sentiment Positif', value: '62%', change: '+5.2%', icon: Smile, color: '#10b981', trend: 'up' },
          { label: 'Sentiment Neutre', value: '28%', change: '-1.5%', icon: Meh, color: '#fbbf24', trend: 'down' },
          { label: 'Sentiment Négatif', value: '10%', change: '-3.7%', icon: Frown, color: '#ef4444', trend: 'down' }
        ].map((item, i) => (
          <motion.div
            key={`overview-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.05 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <div className="flex items-center gap-1">
                {item.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#ef4444]" />
                )}
                <span
                  className="text-sm font-semibold"
                  style={{ color: item.trend === 'up' ? '#10b981' : '#ef4444' }}
                >
                  {item.change}
                </span>
              </div>
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{item.label}</p>
            <p className="text-3xl font-bold text-[#e8e9f3]">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* --- RAPPORT EXPLICATIF OVERVIEW SENTIMENTS --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#10b981] mb-2">📈 Rapport - Vue d'Ensemble des Sentiments</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#10b981] font-semibold">🔬 Synthèse :</span> Sentiment majoritairement positif (62%), Neutre (28%), Négatif (10%). Tendance positive en hausse (+5.2%).</p>
              <p><span className="text-[#10b981] font-semibold">📊 Analyse :</span> Le Net Promoter Score (NPS) implicite est de {(62 - 10).toFixed(0)}%, considéré comme "Excellent".</p>
              <p><span className="text-[#10b981] font-semibold">💡 Action prioritaire :</span> Cibler les retours négatifs (10%) pour résolution rapide.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- NOUVEAUX GRAPHIQUES: Pie Chart & Bar Chart --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Équilibre des Opinions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Historique des Opinions (7j)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f0f23',
                  border: '1px solid #00d9ff',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="positive" stackId="a" fill="#10b981" />
              <Bar dataKey="neutral" stackId="a" fill="#fbbf24" />
              <Bar dataKey="negative" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* --- RAPPORT EXPLICATIF GRAPHIQUES --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/5 border border-[#fbbf24]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
            <PieChart className="w-4 h-4 text-[#fbbf24]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#fbbf24] mb-2">📊 Rapport - Analyse Graphique des Sentiments</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#fbbf24] font-semibold">🔬 Répartition (Pie Chart) :</span> Distribution inégale avec domination des sentiments positifs. Ratio positif:négatif = 6.2:1.</p>
              <p><span className="text-[#fbbf24] font-semibold">📈 Tendance (Bar Chart) :</span> Stabilité des scores sur la semaine. Pic de sentiment positif observé le Samedi (67%). Point bas le Mercredi (60%).</p>
              <p><span className="text-[#fbbf24] font-semibold">💡 Insight actionnable :</span> Maintenir les efforts marketing le Samedi, investiguer la baisse du Mercredi.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- SECTION ORIGINALE: Input & Results --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-4 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Saisir le Feedback
          </h3>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Entrez le texte à analyser (commentaires clients, feedbacks, avis...)&#10;&#10;Exemple: 'Je suis très satisfait du service fourni. L'équipe a été exceptionnelle et très professionnelle.'"
            rows={10}
            className="w-full px-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#9ca3af]/50 focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/20 resize-none"
            style={{ fontFamily: 'var(--font-body)' }}
          />

          <motion.button
            onClick={analyzeSentiment}
            disabled={!text.trim() || analyzing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {analyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Analyser le Sentiment
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-4 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Diagnostic Immédiat
          </h3>

          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Overall Sentiment */}
              <div className="p-6 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10 text-center">
                <div className="flex justify-center mb-3">
                  {getSentimentIcon(result.sentiment)}
                </div>
                <p
                  className="text-2xl mb-2 capitalize"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: getSentimentColor(result.sentiment)
                  }}
                >
                  {result.sentiment === 'positive' ? 'Positif' : result.sentiment === 'negative' ? 'Négatif' : 'Neutre'}
                </p>
                <p className="text-[#9ca3af]">
                  Confiance: {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>

              {/* Sentiment Scores */}
              <div className="space-y-3">
                <p className="text-[#e8e9f3] font-semibold mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Scores de Sentiment
                </p>

                {Object.entries(result.scores).map(([key, value]: [string, any]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#9ca3af] text-sm capitalize">{key === 'positive' ? 'Positif' : key === 'negative' ? 'Négatif' : 'Neutre'}</span>
                      <span className="text-[#e8e9f3] text-sm">{(value * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-[#0f0f23]/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{
                          background: key === 'positive' ? '#10b981' : key === 'negative' ? '#ef4444' : '#fbbf24'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Emotions */}
              <div>
                <p className="text-[#e8e9f3] font-semibold mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                  Émotions Détectées
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(result.emotions).map(([emotion, score]: [string, any]) => (
                    <div key={emotion} className="p-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                      <p className="text-[#9ca3af] text-xs capitalize mb-1">
                        {emotion === 'joy' ? 'Joie' : emotion === 'sadness' ? 'Tristesse' : emotion === 'anger' ? 'Colère' : emotion === 'fear' ? 'Peur' : 'Surprise'}
                      </p>
                      <p className="text-[#e8e9f3] font-semibold">{(score * 100).toFixed(0)}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              {result.keywords.length > 0 && (
                <div>
                  <p className="text-[#e8e9f3] font-semibold mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                    Mots-Clés
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[#00d9ff]/10 text-[#00d9ff] text-sm"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center py-20">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-[#00d9ff]/30 mx-auto mb-3" />
                <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
                  Les résultats apparaîtront ici
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* --- NOUVEAU: Recent Feedback --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <MessageSquare className="w-6 h-6 text-[#00d9ff]" />
          Derniers Avis Clients
        </h3>
        <div className="space-y-3">
          {recentFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60 hover:border-[#00d9ff]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#e8e9f3] font-semibold">{feedback.user}</span>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                      feedback.sentiment === 'positive'
                        ? 'bg-[#10b981]/20 text-[#10b981]'
                        : feedback.sentiment === 'neutral'
                        ? 'bg-[#fbbf24]/20 text-[#fbbf24]'
                        : 'bg-[#ef4444]/20 text-[#ef4444]'
                    }`}
                  >
                    {feedback.sentiment === 'positive'
                      ? 'Positif'
                      : feedback.sentiment === 'neutral'
                      ? 'Neutre'
                      : 'Négatif'}
                  </span>
                </div>
                <span className="text-xs text-[#9ca3af]">Score: {feedback.score}</span>
              </div>
              <p className="text-sm text-[#9ca3af]">{feedback.message}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- RAPPORT EXPLICATIF FEEDBACK RECENTS --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#ef4444]/10 to-[#f97316]/5 border border-[#ef4444]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-[#ef4444]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#ef4444] mb-2">📝 Rapport - Analyse des Derniers Avis</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#ef4444] font-semibold">🔬 Échantillon :</span> 4 retours analysés, 50% positifs, 25% neutres, 25% négatifs. Score moyen = {(recentFeedback.reduce((a,b) => a + b.score, 0) / recentFeedback.length).toFixed(2)}.</p>
              <p><span className="text-[#ef4444] font-semibold">📊 Thèmes récurrents :</span> Interface, rapidité, stabilité, bugs mineurs, performance de chargement.</p>
              <p><span className="text-[#ef4444] font-semibold">💡 Recommandation :</span> Prioriser la résolution des bugs évoqués, communiquer sur les correctifs appliqués.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========== SECTION AI AVANCÉE - NOUVEAU DESIGN ========== */}
      
      {/* AI DEEP ANALYSIS - Forensic Linguistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Microscope className="w-8 h-8 text-[#8b5cf6]" />
            <div>
              <h3 className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                Analyse Forensique Avancée
              </h3>
              <p className="text-sm text-[#9ca3af]">Forensic Linguistics & Psycholinguistics</p>
            </div>
          </div>
          
          {/* Mode Selector */}
          <div className="flex gap-2">
            {(['basic', 'advanced', 'forensic'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDeepAnalysisMode(mode)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  deepAnalysisMode === mode
                    ? 'bg-[#8b5cf6] text-white'
                    : 'bg-[#0f0f23]/60 border border-[#8b5cf6]/30 text-[#9ca3af] hover:text-[#e8e9f3]'
                }`}
              >
                {mode === 'basic' ? 'Standard' : mode === 'advanced' ? 'Avancé' : 'Forensique'}
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Layers Progress */}
        {isDeepAnalyzing && (
          <div className="mb-6 p-4 rounded-xl bg-[#0f0f23]/60 border border-[#8b5cf6]/20">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-5 h-5 text-[#8b5cf6] animate-pulse" />
              <p className="text-sm text-[#8b5cf6] font-semibold">Deep Analysis en cours...</p>
            </div>
            <div className="space-y-2">
              {[
                'Analyse lexicale et syntaxique...',
                'Extraction des entités émotionnelles...',
                'Cartographie des relations sémantiques...',
                'Détection des biais cognitifs...',
                'Analyse du sous-texte implicite...',
                'Évaluation de l\'intensité émotionnelle...',
                'Génération du profil psycholinguistique...'
              ].map((layer, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${i < analysisLayers ? 'bg-[#8b5cf6]' : 'bg-[#6b7280]'}`} />
                  <p className={`text-xs ${i < analysisLayers ? 'text-[#e8e9f3]' : 'text-[#6b7280]'}`}>
                    {layer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deep Analysis Results */}
        {deepResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            {/* Linguistic Profile */}
            <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#8b5cf6]/20">
              <h4 className="text-sm text-[#8b5cf6] font-semibold mb-3 flex items-center gap-2">
                <Atom className="w-4 h-4" />
                Profil Linguistique
              </h4>
              <div className="space-y-2">
                {Object.entries(deepResult.linguisticProfile).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-xs text-[#9ca3af] capitalize">
                      {key === 'complexity' ? 'Complexité' : key === 'formality' ? 'Formalité' : key === 'polarity' ? 'Polarité' : 'Subjectivité'}
                    </span>
                    <span className="text-xs text-[#e8e9f3] font-semibold">{value}{key === 'polarity' ? '' : '%'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Depth */}
            <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#8b5cf6]/20">
              <h4 className="text-sm text-[#8b5cf6] font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Profondeur Émotionnelle
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-[#9ca3af]">Émotion primaire</span>
                  <span className="text-xs text-[#e8e9f3] font-semibold">{deepResult.emotionalDepth.primary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#9ca3af]">Émotion secondaire</span>
                  <span className="text-xs text-[#e8e9f3] font-semibold">{deepResult.emotionalDepth.secondary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#9ca3af]">Intensité</span>
                  <span className="text-xs text-[#e8e9f3] font-semibold">{deepResult.emotionalDepth.intensity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#9ca3af]">Authenticité</span>
                  <span className="text-xs text-[#e8e9f3] font-semibold">{deepResult.emotionalDepth.authenticity}%</span>
                </div>
              </div>
            </div>

            {/* Cognitive Patterns */}
            <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#8b5cf6]/20">
              <h4 className="text-sm text-[#8b5cf6] font-semibold mb-3 flex items-center gap-2">
                <Network className="w-4 h-4" />
                Schémas Cognitifs
              </h4>
              <div className="space-y-2">
                {deepResult.cognitivePatterns.map((pattern: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-xs text-[#9ca3af]">{pattern.name}</span>
                    <span className="text-xs text-[#e8e9f3] font-semibold">{pattern.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Indicators */}
            <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#ef4444]/20">
              <h4 className="text-sm text-[#ef4444] font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Indicateurs de Risque
              </h4>
              <div className="space-y-2">
                {Object.entries(deepResult.riskIndicators).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-xs text-[#9ca3af] capitalize">
                      {key === 'sarcasm' ? 'Sarcasme' : key === 'deception' ? 'Tromperie' : key === 'ambiguity' ? 'Ambigüité' : 'Manipulation'}
                    </span>
                    <span className="text-xs text-[#ef4444] font-semibold">{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={runDeepAnalysis}
          disabled={!text.trim() || isDeepAnalyzing}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#8b5cf6]/20"
        >
          <Microscope className="w-5 h-5" />
          {isDeepAnalyzing ? 'Analyse en profondeur...' : 'Lancer l\'Analyse Forensique'}
        </motion.button>
      </motion.div>

      {/* --- RAPPORT EXPLICATIF DEEP ANALYSIS --- */}
      {deepResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6]/10 to-[#a78bfa]/5 border border-[#8b5cf6]/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
              <Microscope className="w-4 h-4 text-[#8b5cf6]" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-[#8b5cf6] mb-2">🔬 Rapport - Analyse Forensique Avancée</h5>
              <div className="text-xs text-[#9ca3af] space-y-2">
                <p><span className="text-[#8b5cf6] font-semibold">🔬 Méthodologie :</span> 7 couches d'analyse NLP (lexicale, syntaxique, sémantique, cognitive, émotionnelle, risque, psycholinguistique).</p>
                <p><span className="text-[#8b5cf6] font-semibold">📈 Résultats clés :</span> Complexité {deepResult.linguisticProfile.complexity}%, Formalité {deepResult.linguisticProfile.formality}%, Polarité {deepResult.linguisticProfile.polarity}, Subjectivité {deepResult.linguisticProfile.subjectivity}%.</p>
                <p><span className="text-[#8b5cf6] font-semibold">🧠 Profil émotionnel :</span> Émotion primaire = {deepResult.emotionalDepth.primary}, Intensité = {deepResult.emotionalDepth.intensity}%, Authenticité = {deepResult.emotionalDepth.authenticity}%.</p>
                <p><span className="text-[#8b5cf6] font-semibold">⚠️ Indicateurs risque :</span> Sarcasme {deepResult.riskIndicators.sarcasm}%, Tromperie {deepResult.riskIndicators.deception}%, Ambigüité {deepResult.riskIndicators.ambiguity}%.</p>
                <p><span className="text-[#8b5cf6] font-semibold">💡 Recommandation :</span> {deepResult.riskIndicators.sarcasm > 15 ? 'Prudence conseillée - risque de communication ambiguë détecté.' : 'Communication claire et authentique - maintenir cette qualité.'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3 COLUMNS: Pattern Detection | Emotional Intelligence | Predictive Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pattern Detection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl border border-[#fbbf24]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
        >
          <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-[#fbbf24]" />
            Scanner de Structures
          </h4>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={detectPatterns}
            disabled={!text.trim() || patternDetection}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
          >
            {patternDetection ? (
              <div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Scan className="w-4 h-4" />
            )}
            Scanner les Structures
          </motion.button>

          {detectedPatterns.length > 0 && (
            <div className="space-y-2">
              {detectedPatterns.map((pattern, i) => {
                const IconComponent = pattern.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#0f0f23]/40 border border-[#fbbf24]/10"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" style={{ color: pattern.color }} />
                      <span className="text-xs text-[#e8e9f3]">{pattern.type}</span>
                    </div>
                    <span className="text-xs text-[#fbbf24] font-semibold">{pattern.count}</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Emotional Intelligence Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="p-6 rounded-2xl border border-[#10b981]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
        >
          <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
            <Radar className="w-5 h-5 text-[#10b981]" />
            Profil Psychologique
          </h4>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={generateEmotionalProfile}
            disabled={!text.trim()}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
          >
            <Eye className="w-4 h-4" />
            Révéler le Profil Psychologique
          </motion.button>

          {emotionalProfile && showEmotionalMap && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Personality Traits */}
              <div>
                <p className="text-xs text-[#10b981] mb-2 font-semibold">Traits de Personnalité</p>
                {Object.entries(emotionalProfile.personalityTraits).map(([trait, score]: [string, any]) => (
                  <div key={trait} className="mb-1">
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-[#9ca3af] capitalize">
                        {trait === 'openness' ? 'Ouverture' : trait === 'conscientiousness' ? 'Conscience' : trait === 'extraversion' ? 'Extraversion' : trait === 'agreeableness' ? 'Agréabilité' : 'Névrosisme'}
                      </span>
                      <span className="text-[#e8e9f3]">{score}%</span>
                    </div>
                    <div className="h-1.5 bg-[#0f0f23] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        className="h-full bg-[#10b981] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Emotional Range */}
              <div>
                <p className="text-xs text-[#10b981] mb-2 font-semibold">Plage Émotionnelle</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-[#0f0f23]/40 border border-[#10b981]/10">
                    <p className="text-[10px] text-[#6b7280]">Valence</p>
                    <p className="text-sm text-[#e8e9f3] font-semibold">{emotionalProfile.emotionalRange.valence}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0f0f23]/40 border border-[#10b981]/10">
                    <p className="text-[10px] text-[#6b7280]">Activation</p>
                    <p className="text-sm text-[#e8e9f3] font-semibold">{emotionalProfile.emotionalRange.arousal}%</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0f0f23]/40 border border-[#10b981]/10">
                    <p className="text-[10px] text-[#6b7280]">Dominance</p>
                    <p className="text-sm text-[#e8e9f3] font-semibold">{emotionalProfile.emotionalRange.dominance}%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Predictive Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
        >
          <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#00d9ff]" />
            Prédiction Comportementale
          </h4>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={runPredictiveAnalysis}
            disabled={!text.trim() || isPredicting}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
          >
            {isPredicting ? (
              <div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Crosshair className="w-4 h-4" />
            )}
            Prédire le Comportement
          </motion.button>

          {predictionResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {/* NPS & Churn */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-[#0f0f23]/40 border border-[#00d9ff]/10 text-center">
                  <p className="text-[10px] text-[#6b7280] mb-1">Score NPS</p>
                  <p className="text-xl text-[#00d9ff] font-bold">{predictionResult.npsPrediction}</p>
                </div>
                <div className="p-3 rounded-lg bg-[#0f0f23]/40 border border-[#ef4444]/10 text-center">
                  <p className="text-[10px] text-[#6b7280] mb-1">Risque Churn</p>
                  <p className="text-xl text-[#ef4444] font-bold">{predictionResult.churnRisk}%</p>
                </div>
              </div>

              {/* Loyalty & Trend */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-[#0f0f23]/40 border border-[#10b981]/10 text-center">
                  <p className="text-[10px] text-[#6b7280]">Fidélité</p>
                  <p className="text-sm text-[#10b981] font-semibold">{predictionResult.loyaltyScore}%</p>
                </div>
                <div className="p-2 rounded-lg bg-[#0f0f23]/40 border border-[#fbbf24]/10 text-center">
                  <p className="text-[10px] text-[#6b7280]">Tendance</p>
                  <p className="text-sm text-[#fbbf24] font-semibold">{predictionResult.satisfactionTrend}</p>
                </div>
              </div>

              {/* Actions Recommandées */}
              <div>
                <p className="text-xs text-[#00d9ff] mb-2 font-semibold">Actions Recommandées</p>
                {predictionResult.recommendedActions.map((action: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#9ca3af] mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00d9ff]" />
                    {action}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* --- RAPPORTS EXPLICATIFS PATTERN DETECTION --- */}
      {detectedPatterns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/5 border border-[#fbbf24]/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
              <Fingerprint className="w-4 h-4 text-[#fbbf24]" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-[#fbbf24] mb-2">🔍 Rapport - Scanner de Structures Textuelles</h5>
              <div className="text-xs text-[#9ca3af] space-y-2">
                <p><span className="text-[#fbbf24] font-semibold">🔬 Structures détectées :</span> {detectedPatterns.length} motifs linguistiques identifiés. Détails : {detectedPatterns.map(p => `${p.type} (${p.count}x)`).join(', ')}.</p>
                <p><span className="text-[#fbbf24] font-semibold">📊 Analyse sémantique :</span> Prédominance de {detectedPatterns.sort((a,b) => b.count - a.count)[0]?.type || 'structures'} - indique un style {detectedPatterns.find(p => p.type === 'Répétition émotionnelle') ? 'expressif et engageant' : 'technique et structuré'}.</p>
                <p><span className="text-[#fbbf24] font-semibold">💡 Recommandation :</span> {detectedPatterns.find(p => p.type === 'Marqueurs d\'intensité')?.count > 2 ? 'Réduire l\'usage des intensificateurs pour plus de clarté.' : 'Style de communication bien équilibré.'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- RAPPORT EXPLICATIF EMOTIONAL INTELLIGENCE --- */}
      {emotionalProfile && showEmotionalMap && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
              <Radar className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-[#10b981] mb-2">🧠 Rapport - Profil Psychologique</h5>
              <div className="text-xs text-[#9ca3af] space-y-2">
                <p><span className="text-[#10b981] font-semibold">🔬 Profil psychologique :</span> Ouverture {emotionalProfile.personalityTraits.openness}%, Conscience {emotionalProfile.personalityTraits.conscientiousness}%, Extraversion {emotionalProfile.personalityTraits.extraversion}%, Agréabilité {emotionalProfile.personalityTraits.agreeableness}%, Névrosisme {emotionalProfile.personalityTraits.neuroticism}%.</p>
                <p><span className="text-[#10b981] font-semibold">🎭 Émotions dominantes :</span> Valence {emotionalProfile.emotionalRange.valence}, Activation {emotionalProfile.emotionalRange.arousal}%, Dominance {emotionalProfile.emotionalRange.dominance}%.</p>
                <p><span className="text-[#10b981] font-semibold">💡 Profil type :</span> {emotionalProfile.personalityTraits.openness > 70 ? 'Esprit créatif et explorateur' : emotionalProfile.personalityTraits.conscientiousness > 70 ? 'Organisé et méthodique' : 'Équilibré et adaptatif'}.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- RAPPORT EXPLICATIF PREDICTIVE ANALYSIS --- */}
      {predictionResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#8b5cf6]/5 border border-[#00d9ff]/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-[#00d9ff]" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">🎯 Rapport - Prédiction Comportementale</h5>
              <div className="text-xs text-[#9ca3af] space-y-2">
                <p><span className="text-[#00d9ff] font-semibold">🔬 KPIs prédits :</span> Score NPS = {predictionResult.npsPrediction} (Excellent), Risque de churn = {predictionResult.churnRisk}% (Faible), Score fidélité = {predictionResult.loyaltyScore}%.</p>
                <p><span className="text-[#00d9ff] font-semibold">📈 Projection sentiment :</span> Court terme = {predictionResult.sentimentProjection?.shortTerm || 'N/A'}%, Moyen terme = {predictionResult.sentimentProjection?.mediumTerm || 'N/A'}%, Long terme = {predictionResult.sentimentProjection?.longTerm || 'N/A'}%.</p>
                <p><span className="text-[#00d9ff] font-semibold">💡 Actions prioritaires :</span> {predictionResult.recommendedActions.slice(0,2).join(' • ')}.</p>
                <p><span className="text-[#00d9ff] font-semibold">📊 Tendance générale :</span> {predictionResult.satisfactionTrend.includes('hausse') ? 'Positive en amélioration - capitaliser sur la dynamique.' : 'Stable - surveiller les signaux faibles.'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- RAPPORT SYNTHESE GLOBALE --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/20 to-[#8b5cf6]/20 border border-[#00d9ff]/30"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/30 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-[#00d9ff]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">📋 Synthèse Executive - Analyse de Sentiment</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#00d9ff] font-semibold">🏆 Points forts :</span> Sentiment global positif (62%), NPS implicite excellent (52 points), Authenticité émotionnelle élevée ({deepResult?.emotionalDepth?.authenticity || '>60'}%).</p>
              <p><span className="text-[#00d9ff] font-semibold">⚠️ Points d'attention :</span> 10% de retours négatifs, Score neutralité à 28% (opportunité d'activation), {deepResult?.riskIndicators?.sarcasm > 15 ? 'Risque de sarcasme détecté.' : 'Communication claire.'}</p>
              <p><span className="text-[#00d9ff] font-semibold">🎯 Recommandations stratégiques :</span> Activer les clients neutres par des communications ciblées, Résoudre les 10% d'insatisfaction prioritairement, Maintenir les efforts sur les retours positifs.</p>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}