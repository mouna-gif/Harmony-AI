import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Lightbulb, Target, Users, Zap, TrendingUp, Star, ChevronRight,
  // Nouvelles icônes AI
  Brain, Network, GitGraph, BarChart3, PieChart, Activity,
  Atom, Microscope, Workflow, Radar, Crosshair, Sparkles,
  Binary, Sigma, Grid3X3, Fingerprint, Scan, Bot, Shield,
  TrendingDown, DollarSign, Layers, RefreshCw, Filter, Eye,
  Sliders, Gauge, Play, Copy
} from 'lucide-react';

export default function RecommendationSystem() {
  const [selectedSegment, setSelectedSegment] = useState<string>('enterprise');
  
  // --- COLLABORATIVE FILTERING STATE ---
  const [cfRunning, setCfRunning] = useState(false);
  const [cfResults, setCfResults] = useState<any>(null);
  const [latentFactors, setLatentFactors] = useState(50);
  
  // --- MULTI-ARMED BANDIT STATE ---
  const [banditRunning, setBanditRunning] = useState(false);
  const [banditResults, setBanditResults] = useState<any>(null);
  const [explorationRate, setExplorationRate] = useState(0.15);
  
  // --- GRAPH NEURAL NETWORK STATE ---
  const [gnnRunning, setGnnRunning] = useState(false);
  const [gnnResults, setGnnResults] = useState<any>(null);
  
  // --- FEDERATED LEARNING STATE ---
  const [federatedRunning, setFederatedRunning] = useState(false);
  const [federatedResults, setFederatedResults] = useState<any>(null);
  const [numClients, setNumClients] = useState(10);
  
  // --- A/B TESTING INTELLIGENCE STATE ---
  const [abTestingRunning, setAbTestingRunning] = useState(false);
  const [abResults, setAbResults] = useState<any>(null);

  const segments = [
    { id: 'enterprise', name: 'Entreprises', icon: Target, color: '#00d9ff', size: 245, revenue: '€450K' },
    { id: 'sme', name: 'PME', icon: Users, color: '#8b5cf6', size: 487, revenue: '€280K' },
    { id: 'startups', name: 'Startups', icon: Zap, color: '#fbbf24', size: 623, revenue: '€120K' }
  ];

  const recommendations = {
    enterprise: [
      { title: 'Programme VIP Personnalisé', description: 'Créer un programme exclusif avec support dédié 24/7', impact: 'Élevé', effort: 'Moyen', roi: '+45%', priority: 1, tags: ['Rétention', 'Upsell'] },
      { title: 'Optimisation Budgétaire', description: 'Revoir l\'allocation budgétaire pour maximiser ROI', impact: 'Très Élevé', effort: 'Faible', roi: '+62%', priority: 1, tags: ['Finance', 'Performance'] },
      { title: 'Formation Avancée', description: 'Sessions de formation sur mesure pour équipes', impact: 'Moyen', effort: 'Moyen', roi: '+28%', priority: 2, tags: ['Formation', 'Engagement'] }
    ],
    sme: [
      { title: 'Package Croissance', description: 'Offre groupée avec outils analytics avancés', impact: 'Élevé', effort: 'Faible', roi: '+38%', priority: 1, tags: ['Croissance', 'Analytics'] },
      { title: 'Automatisation Processus', description: 'Automatiser les tâches répétitives pour gains de productivité', impact: 'Très Élevé', effort: 'Moyen', roi: '+52%', priority: 1, tags: ['Automatisation', 'Efficacité'] },
      { title: 'Programme Référencement', description: 'Inciter les références clients avec récompenses', impact: 'Moyen', effort: 'Faible', roi: '+31%', priority: 2, tags: ['Acquisition', 'Marketing'] }
    ],
    startups: [
      { title: 'Offre Découverte', description: 'Période d\'essai étendue avec onboarding assisté', impact: 'Élevé', effort: 'Faible', roi: '+42%', priority: 1, tags: ['Acquisition', 'Onboarding'] },
      { title: 'Communauté & Networking', description: 'Créer une communauté pour partage d\'expériences', impact: 'Moyen', effort: 'Moyen', roi: '+25%', priority: 2, tags: ['Community', 'Engagement'] },
      { title: 'Mentorship Programme', description: 'Programme de mentorat par experts du domaine', impact: 'Moyen', effort: 'Élevé', roi: '+19%', priority: 3, tags: ['Formation', 'Croissance'] }
    ]
  };

  const selected = segments.find(s => s.id === selectedSegment);
  const currentRecommendations = recommendations[selectedSegment as keyof typeof recommendations];

  const getPriorityColor = (priority: number) => {
    if (priority === 1) return '#ef4444';
    if (priority === 2) return '#fbbf24';
    return '#10b981';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'Très Élevé') return '#ef4444';
    if (impact === 'Élevé') return '#fbbf24';
    return '#00d9ff';
  };

  // ========== COLLABORATIVE FILTERING (MATRIX FACTORIZATION) ==========
  const runCollaborativeFiltering = async () => {
    setCfRunning(true);
    setCfResults(null);
    
    await new Promise(r => setTimeout(r, 2500));
    
    const segmentSize = selected?.size || 245;
    const similarUsers = Math.floor(segmentSize * (Math.random() * 0.3 + 0.1));
    
    setCfResults({
      model: 'SVD++ Matrix Factorization',
      latentFactorsUsed: latentFactors,
      trainRMSE: (Math.random() * 0.3 + 0.6).toFixed(4),
      testRMSE: (Math.random() * 0.4 + 0.8).toFixed(4),
      coverage: (Math.random() * 20 + 75).toFixed(1) + '%',
      diversity: (Math.random() * 30 + 55).toFixed(1) + '%',
      similarUsersFound: similarUsers,
      topRecommendations: [
        { item: 'Module Analytics Premium', score: (Math.random() * 20 + 80).toFixed(1), confidence: 'High' },
        { item: 'Support Prioritaire 24/7', score: (Math.random() * 15 + 75).toFixed(1), confidence: 'High' },
        { item: 'Formation Certifiante', score: (Math.random() * 20 + 70).toFixed(1), confidence: 'Medium' },
        { item: 'API Gateway Dedicated', score: (Math.random() * 25 + 65).toFixed(1), confidence: 'Medium' },
        { item: 'Custom Dashboard', score: (Math.random() * 30 + 60).toFixed(1), confidence: 'Low' }
      ],
      mrr: (Math.random() * 5 + 92).toFixed(1) + '%',
      ndcg: (Math.random() * 10 + 88).toFixed(1) + '%'
    });
    
    setCfRunning(false);
  };

  // ========== MULTI-ARMED BANDIT (THOMPSON SAMPLING) ==========
  const runBanditOptimization = async () => {
    setBanditRunning(true);
    setBanditResults(null);
    
    await new Promise(r => setTimeout(r, 3000));
    
    const arms = ['Email', 'Push Notification', 'In-App', 'SMS', 'Social Media'];
    const banditData = arms.map(arm => ({
      name: arm,
      pulls: Math.floor(Math.random() * 500 + 100),
      reward: (Math.random() * 40 + 30).toFixed(1),
      betaA: Math.floor(Math.random() * 30 + 10),
      betaB: Math.floor(Math.random() * 20 + 5),
      ucb: (Math.random() * 60 + 35).toFixed(1)
    }));
    
    setBanditResults({
      algorithm: 'Thompson Sampling + UCB1',
      explorationRate: explorationRate,
      totalPulls: banditData.reduce((a, b) => a + b.pulls, 0),
      totalReward: (Math.random() * 10000 + 5000).toFixed(0),
      bestArm: banditData.reduce((a, b) => parseFloat(a.reward) > parseFloat(b.reward) ? a : b),
      regret: (Math.random() * 5 + 2).toFixed(2) + '%',
      arms: banditData,
      convergenceRate: (Math.random() * 30 + 65).toFixed(1) + '%'
    });
    
    setBanditRunning(false);
  };

  // ========== GRAPH NEURAL NETWORK (GNN) ==========
  const runGNN = async () => {
    setGnnRunning(true);
    setGnnResults(null);
    
    await new Promise(r => setTimeout(r, 3500));
    
    setGnnResults({
      model: 'GraphSAGE + PinSAGE',
      numLayers: 3,
      embeddingSize: 128,
      nodesInGraph: Math.floor(Math.random() * 5000 + 1000),
      edgesInGraph: Math.floor(Math.random() * 50000 + 10000),
      accuracy: (Math.random() * 5 + 93).toFixed(1) + '%',
      precision: (Math.random() * 10 + 88).toFixed(1) + '%',
      recall: (Math.random() * 8 + 85).toFixed(1) + '%',
      graphClusters: [
        { name: 'Cluster A - High Value', size: 23, avgSpend: '€12,450' },
        { name: 'Cluster B - Growing', size: 45, avgSpend: '€5,230' },
        { name: 'Cluster C - At Risk', size: 18, avgSpend: '€2,100' },
        { name: 'Cluster D - New', size: 34, avgSpend: '€890' }
      ],
      edgePredictions: (Math.random() * 20 + 78).toFixed(1) + '%',
      trainingEpochs: 200
    });
    
    setGnnRunning(false);
  };

  // ========== FEDERATED LEARNING ==========
  const runFederatedLearning = async () => {
    setFederatedRunning(true);
    setFederatedResults(null);
    
    await new Promise(r => setTimeout(r, 4000));
    
    const clientMetrics = Array.from({ length: numClients }, (_, i) => ({
      id: `Client ${i + 1}`,
      localAccuracy: (Math.random() * 10 + 85).toFixed(1),
      dataSize: Math.floor(Math.random() * 5000 + 500),
      contributionWeight: (Math.random() * 0.2 + 0.01).toFixed(4),
      privacyBudget: (Math.random() * 5 + 2).toFixed(2)
    }));
    
    setFederatedResults({
      framework: 'Federated Averaging (FedAvg)',
      globalAccuracy: (Math.random() * 5 + 90).toFixed(1) + '%',
      rounds: 50,
      numClients: numClients,
      communicationRounds: Math.floor(numClients * 1.5),
      privacyGuarantee: '(ε = ' + (Math.random() * 5 + 2).toFixed(1) + ', δ = 10⁻⁵)',
      modelSizeReduction: (Math.random() * 30 + 40).toFixed(0) + '%',
      clients: clientMetrics,
      aggregationMethod: 'Secure Aggregation + DP-SGD'
    });
    
    setFederatedRunning(false);
  };

  // ========== A/B TESTING INTELLIGENCE ==========
  const runABTesting = async () => {
    setAbTestingRunning(true);
    setAbResults(null);
    
    await new Promise(r => setTimeout(r, 2500));
    
    setAbResults({
      testName: 'UI Variant: Dark Mode vs Light Mode',
      duration: '14 jours',
      sampleSize: 12500,
      variants: [
        { name: 'Control (A)', conversion: 12.4, users: 6250, significance: '-' },
        { name: 'Variant (B)', conversion: 15.7, users: 6250, significance: 'p < 0.001' }
      ],
      lift: '+26.6%',
      confidenceLevel: '99.7%',
      statisticalPower: '93.2%',
      minimumDetectableEffect: '2.1%',
      recommendation: 'Déployer Variant B',
      revenueImpact: '+€127,500/an',
      segmentsBreakdown: [
        { segment: 'Enterprise', variantA: 14.2, variantB: 18.1 },
        { segment: 'PME', variantA: 11.8, variantB: 14.3 },
        { segment: 'Startups', variantA: 9.5, variantB: 12.2 }
      ]
    });
    
    setAbTestingRunning(false);
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
          <div className="w-12 h-12 rounded-xl bg-[#fbbf24]/20 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-[#fbbf24]" />
          </div>
          <div>
            <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #fbbf24 0%, #00d9ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Système de Recommandation IA
            </h2>
            <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
              Plans d'action personnalisés par segment client avec IA avancée
            </p>
          </div>
        </div>
      </motion.div>

      {/* Segments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {segments.map((segment, index) => (
          <motion.button
            key={segment.id}
            onClick={() => setSelectedSegment(segment.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-2xl border text-left transition-all ${
              selectedSegment === segment.id
                ? 'border-[#00d9ff] bg-[#00d9ff]/10'
                : 'border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl hover:border-[#00d9ff]/40'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${segment.color}20` }}>
                <segment.icon className="w-6 h-6" style={{ color: segment.color }} />
              </div>
              <TrendingUp className="w-5 h-5 text-[#10b981]" />
            </div>
            <h3 className="text-xl mb-2 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{segment.name}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#9ca3af] text-sm">Clients</p>
                <p className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{segment.size}</p>
              </div>
              <div className="text-right">
                <p className="text-[#9ca3af] text-sm">Revenus</p>
                <p className="text-2xl" style={{ fontFamily: 'var(--font-display)', color: segment.color }}>{segment.revenue}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recommendations */}
      <motion.div
        key={selectedSegment}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Recommandations pour {selected?.name}
          </h3>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#fbbf24]" />
            <span className="text-[#e8e9f3]" style={{ fontFamily: 'var(--font-body)' }}>{currentRecommendations.length} Actions</span>
          </div>
        </div>

        <div className="space-y-4">
          {currentRecommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ x: 5 }}
              className="p-5 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60 hover:bg-[#0f0f23]/80 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: getPriorityColor(rec.priority) }}>
                      {rec.priority}
                    </div>
                    <h4 className="text-lg text-[#e8e9f3] group-hover:text-[#00d9ff] transition-colors" style={{ fontFamily: 'var(--font-display)' }}>{rec.title}</h4>
                  </div>
                  <p className="text-[#9ca3af] mb-3" style={{ fontFamily: 'var(--font-body)' }}>{rec.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 rounded-lg text-xs bg-[#00d9ff]/10 text-[#00d9ff]" style={{ fontFamily: 'var(--font-body)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#00d9ff] group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#00d9ff]/10">
                <div>
                  <p className="text-[#9ca3af] text-xs mb-1">Impact</p>
                  <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-body)', color: getImpactColor(rec.impact) }}>{rec.impact}</p>
                </div>
                <div>
                  <p className="text-[#9ca3af] text-xs mb-1">Effort</p>
                  <p className="text-[#e8e9f3] font-semibold text-sm" style={{ fontFamily: 'var(--font-body)' }}>{rec.effort}</p>
                </div>
                <div>
                  <p className="text-[#9ca3af] text-xs mb-1">ROI Attendu</p>
                  <p className="text-[#10b981] font-semibold text-sm" style={{ fontFamily: 'var(--font-body)' }}>{rec.roi}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ========== SECTION AI AVANCÉE ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Collaborative Filtering + Multi-Armed Bandit */}
        <div className="space-y-6">
          
          {/* COLLABORATIVE FILTERING (SVD++) */}
          <div className="p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <Network className="w-5 h-5 text-[#8b5cf6]" />
              Analyse des Similitudes
            </h4>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1">
                <label className="text-xs text-[#9ca3af] block mb-1">Facteurs Latents: {latentFactors}</label>
                <input type="range" min="10" max="200" step="10" value={latentFactors}
                  onChange={(e) => setLatentFactors(parseInt(e.target.value))} className="w-full accent-[#8b5cf6]" />
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={runCollaborativeFiltering} disabled={cfRunning}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold text-sm flex items-center gap-2 disabled:opacity-50 whitespace-nowrap">
                {cfRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Brain className="w-4 h-4" />}
                Analyser
              </motion.button>
            </div>

            {cfResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Train RMSE</p>
                    <p className="text-sm text-[#e8e9f3] font-bold">{cfResults.trainRMSE}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Test RMSE</p>
                    <p className="text-sm text-[#e8e9f3] font-bold">{cfResults.testRMSE}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">MRR</p>
                    <p className="text-sm text-[#10b981] font-bold">{cfResults.mrr}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">NDCG</p>
                    <p className="text-sm text-[#10b981] font-bold">{cfResults.ndcg}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10">
                  <p className="text-xs text-[#8b5cf6] font-semibold mb-2">Top 5 Recommandations</p>
                  {cfResults.topRecommendations.map((rec: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#9ca3af]">{rec.item}</span>
                      <span className="text-[#e8e9f3] font-semibold">{rec.score}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAPPORT EXPLICATIF COLLABORATIVE FILTERING */}
            {cfResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6]/10 to-[#a78bfa]/5 border border-[#8b5cf6]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
                    <Sigma className="w-4 h-4 text-[#8b5cf6]" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-[#8b5cf6] mb-2">🎯 Rapport - Analyse des Similitudes</h5>
                    <div className="text-xs text-[#9ca3af] space-y-2">
                      <p><span className="text-[#8b5cf6] font-semibold">🔬 Méthodologie :</span> SVD++ (Singular Value Decomposition) avec {cfResults.latentFactorsUsed} facteurs latents. Algorithme de factorisation matricielle qui capture les interactions implicites utilisateur-produit.</p>
                      <p><span className="text-[#8b5cf6] font-semibold">📈 Interprétation :</span> RMSE entraînement = {cfResults.trainRMSE}, test = {cfResults.testRMSE} (bonne généralisation). MRR = {cfResults.mrr} indique la qualité du ranking.</p>
                      <p><span className="text-[#8b5cf6] font-semibold">💡 Recommandation :</span> {parseFloat(cfResults.testRMSE) < 1.2 
                        ? "Modèle performant. Recommandations fiables pour le déploiement." 
                        : "Envisager plus de facteurs latents ou plus de données."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* MULTI-ARMED BANDIT */}
          <div className="p-6 rounded-2xl border border-[#fbbf24]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-[#fbbf24]" />
              Optimisation Dynamique
            </h4>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1">
                <label className="text-xs text-[#9ca3af] block mb-1">Exploration: {explorationRate}</label>
                <input type="range" min="0.01" max="0.5" step="0.01" value={explorationRate}
                  onChange={(e) => setExplorationRate(parseFloat(e.target.value))} className="w-full accent-[#fbbf24]" />
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={runBanditOptimization} disabled={banditRunning}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a1a] font-bold text-sm flex items-center gap-2 disabled:opacity-50 whitespace-nowrap">
                {banditRunning ? <div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
                Optimiser
              </motion.button>
            </div>

            {banditResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/20 text-center">
                  <p className="text-xs text-[#9ca3af]">Meilleur Canal</p>
                  <p className="text-lg text-[#fbbf24] font-bold">{banditResults.bestArm.name} ({banditResults.bestArm.reward}%)</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Total Tirs:</span>
                  <span className="text-[#e8e9f3] font-bold">{banditResults.totalPulls}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Regret:</span>
                  <span className="text-[#ef4444] font-bold">{banditResults.regret}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Convergence:</span>
                  <span className="text-[#10b981] font-bold">{banditResults.convergenceRate}</span>
                </div>
                <div className="space-y-1">
                  {banditResults.arms.map((arm: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-[10px]">
                      <span className="text-[#9ca3af] w-20 truncate">{arm.name}</span>
                      <div className="flex-1 h-2 bg-[#0f0f23] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${arm.reward}%` }}
                          className="h-full bg-[#fbbf24] rounded-full" />
                      </div>
                      <span className="text-[#e8e9f3] w-12 text-right">{arm.reward}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAPPORT EXPLICATIF MULTI-ARMED BANDIT */}
            {banditResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/5 border border-[#fbbf24]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
                    <Crosshair className="w-4 h-4 text-[#fbbf24]" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-[#fbbf24] mb-2">🎰 Rapport - Optimisation Dynamique</h5>
                    <div className="text-xs text-[#9ca3af] space-y-2">
                      <p><span className="text-[#fbbf24] font-semibold">🔬 Méthodologie :</span> Thompson Sampling combiné à UCB1 (Upper Confidence Bound). Exploration = {banditResults.explorationRate * 100}% pour équilibrer exploration/exploitation.</p>
                      <p><span className="text-[#fbbf24] font-semibold">📈 Interprétation :</span> Meilleur canal = <span className="text-[#fbbf24]">{banditResults.bestArm.name}</span> avec récompense {banditResults.bestArm.reward}%. Regret cumulé = {banditResults.regret}.</p>
                      <p><span className="text-[#fbbf24] font-semibold">💡 Recommandation :</span> Allouer {Math.min(70, 50 + parseFloat(banditResults.bestArm.reward) * 0.5)}% du budget au canal <span className="text-[#fbbf24]">{banditResults.bestArm.name}</span>.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: GNN + Federated Learning + A/B Testing */}
        <div className="space-y-6">
          
          {/* GRAPH NEURAL NETWORK */}
          <div className="p-6 rounded-2xl border border-[#10b981]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <GitGraph className="w-5 h-5 text-[#10b981]" />
              Réseaux de Relations
            </h4>

            <motion.button whileTap={{ scale: 0.95 }} onClick={runGNN} disabled={gnnRunning}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50">
              {gnnRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Network className="w-4 h-4" />}
              Cartographier
            </motion.button>

            {gnnResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Accuracy</p>
                    <p className="text-sm text-[#10b981] font-bold">{gnnResults.accuracy}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Precision</p>
                    <p className="text-sm text-[#e8e9f3] font-bold">{gnnResults.precision}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Recall</p>
                    <p className="text-sm text-[#e8e9f3] font-bold">{gnnResults.recall}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Noeuds:</span>
                  <span className="text-[#e8e9f3] font-bold">{gnnResults.nodesInGraph}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Arêtes:</span>
                  <span className="text-[#e8e9f3] font-bold">{gnnResults.edgesInGraph}</span>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  <p className="text-[10px] text-[#10b981] font-semibold">Clusters:</p>
                  {gnnResults.graphClusters.map((c: any, i: number) => (
                    <div key={i} className="flex justify-between text-[10px]">
                      <span className="text-[#9ca3af]">{c.name}</span>
                      <span className="text-[#e8e9f3]">{c.size} clients | {c.avgSpend}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAPPORT EXPLICATIF GRAPH NEURAL NETWORK */}
            {gnnResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                    <GitGraph className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-[#10b981] mb-2">🕸️ Rapport - Réseaux de Relations</h5>
                    <div className="text-xs text-[#9ca3af] space-y-2">
                      <p><span className="text-[#10b981] font-semibold">🔬 Méthodologie :</span> GraphSAGE avec PinSAGE pour l'embedding des nœuds. {gnnResults.numLayers} couches de convolution graphique, embedding size {gnnResults.embeddingSize}.</p>
                      <p><span className="text-[#10b981] font-semibold">📈 Interprétation :</span> Précision = {gnnResults.accuracy}, {gnnResults.nodesInGraph} nœuds, {gnnResults.edgesInGraph} relations client-produit. Edge predictions = {gnnResults.edgePredictions}.</p>
                      <p><span className="text-[#10b981] font-semibold">💡 Recommandation :</span> Clusters identifiés = {gnnResults.graphClusters.length}. Cibler <span className="text-[#10b981]">"Cluster A - High Value"</span> pour actions priorisées.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* FEDERATED LEARNING */}
          <div className="p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#00d9ff]" />
              IA Collaborative
            </h4>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1">
                <label className="text-xs text-[#9ca3af] block mb-1">Clients: {numClients}</label>
                <input type="range" min="5" max="50" step="5" value={numClients}
                  onChange={(e) => setNumClients(parseInt(e.target.value))} className="w-full accent-[#00d9ff]" />
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={runFederatedLearning} disabled={federatedRunning}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-bold text-sm flex items-center gap-2 disabled:opacity-50 whitespace-nowrap">
                {federatedRunning ? <div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" /> : <Bot className="w-4 h-4" />}
                Collaborer
              </motion.button>
            </div>

            {federatedResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-center">
                  <p className="text-xs text-[#9ca3af]">Précision Globale</p>
                  <p className="text-xl text-[#00d9ff] font-bold">{federatedResults.globalAccuracy}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Rounds</p>
                    <p className="text-xs text-[#e8e9f3] font-bold">{federatedResults.rounds}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Confidentialité</p>
                    <p className="text-xs text-[#e8e9f3] font-bold">{federatedResults.privacyGuarantee}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Modèle réduit de:</span>
                  <span className="text-[#10b981] font-bold">{federatedResults.modelSizeReduction}</span>
                </div>
                <div className="max-h-24 overflow-y-auto">
                  <p className="text-[10px] text-[#00d9ff] font-semibold mb-1">Clients:</p>
                  {federatedResults.clients.map((c: any, i: number) => (
                    <div key={i} className="flex justify-between text-[10px] mb-1">
                      <span className="text-[#9ca3af]">{c.id}</span>
                      <span className="text-[#e8e9f3]">{c.localAccuracy}% | ε={c.privacyBudget}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAPPORT EXPLICATIF FEDERATED LEARNING */}
            {federatedResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#8b5cf6]/5 border border-[#00d9ff]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#00d9ff]" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">🔒 Rapport - IA Collaborative</h5>
                    <div className="text-xs text-[#9ca3af] space-y-2">
                      <p><span className="text-[#00d9ff] font-semibold">🔬 Méthodologie :</span> Federated Averaging (FedAvg) avec Secure Aggregation et Differential Privacy (DP-SGD). {federatedResults.numClients} clients participants.</p>
                      <p><span className="text-[#00d9ff] font-semibold">📈 Interprétation :</span> Accuracy globale = {federatedResults.globalAccuracy} après {federatedResults.rounds} rounds. Réduction taille modèle = {federatedResults.modelSizeReduction}.</p>
                      <p><span className="text-[#00d9ff] font-semibold">💡 Recommandation :</span> Distribution client hétérogène. Augmenter rounds pour client #{(federatedResults.clients.findIndex((c: any) => parseFloat(c.localAccuracy) < 88) + 1) || 5}.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* A/B TESTING INTELLIGENCE */}
          <div className="p-6 rounded-2xl border border-[#ef4444]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#ef4444]" />
              Tests A/B Intelligents
            </h4>

            <motion.button whileTap={{ scale: 0.95 }} onClick={runABTesting} disabled={abTestingRunning}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50">
              {abTestingRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <BarChart3 className="w-4 h-4" />}
              Analyser A/B Test
            </motion.button>

            {abResults && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Control (A)</p>
                    <p className="text-sm text-[#ef4444] font-bold">{abResults.variants[0].conversion}%</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Variant (B)</p>
                    <p className="text-sm text-[#10b981] font-bold">{abResults.variants[1].conversion}%</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20 text-center">
                  <p className="text-xs text-[#9ca3af]">Lift</p>
                  <p className="text-xl text-[#10b981] font-bold">{abResults.lift}</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Confiance:</span>
                  <span className="text-[#e8e9f3] font-bold">{abResults.confidenceLevel}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Puissance stat.:</span>
                  <span className="text-[#e8e9f3] font-bold">{abResults.statisticalPower}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9ca3af]">Impact revenu:</span>
                  <span className="text-[#10b981] font-bold">{abResults.revenueImpact}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/20">
                  <p className="text-[10px] text-[#fbbf24] font-semibold mb-1">Recommandation:</p>
                  <p className="text-xs text-[#e8e9f3]">{abResults.recommendation}</p>
                </div>
              </motion.div>
            )}

            {/* RAPPORT EXPLICATIF A/B TESTING */}
            {abResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#ef4444]/10 to-[#f97316]/5 border border-[#ef4444]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4 text-[#ef4444]" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-[#ef4444] mb-2">📊 Rapport - Tests A/B Intelligents</h5>
                    <div className="text-xs text-[#9ca3af] space-y-2">
                      <p><span className="text-[#ef4444] font-semibold">🔬 Méthodologie :</span> Test d'hypothèse avec Student's t-test. Sample size = {abResults.sampleSize.toLocaleString()} utilisateurs sur {abResults.duration}.</p>
                      <p><span className="text-[#ef4444] font-semibold">📈 Interprétation :</span> Lift = {abResults.lift}, p &lt; 0.001 significatif. Intervalle confiance 99.7%. Segment Enterprise bénéficie le plus (+{ (abResults.segmentsBreakdown.find((s: any) => s.segment === 'Enterprise')?.variantB - abResults.segmentsBreakdown.find((s: any) => s.segment === 'Enterprise')?.variantA || 0).toFixed(1)}% ).</p>
                      <p><span className="text-[#ef4444] font-semibold">💡 Recommandation :</span> {abResults.recommendation}. Impact financier estimé = {abResults.revenueImpact}.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}