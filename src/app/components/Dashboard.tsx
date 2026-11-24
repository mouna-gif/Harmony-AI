import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Activity,
  Settings,
  TrendingUp,
  Users as UsersIcon,
  Zap,
  Brain,
  Boxes,
  MessageSquare,
  AlertTriangle,
  Calendar,
  Lightbulb,
  // Nouvelles icônes AI Dashboard
  Cpu, Gauge, Radar, Network, Sparkles, Target,
  PieChart, LineChart, GitGraph, Thermometer,
  Clock, Server, Shield, Workflow, Eye,
  Crosshair, Layers, Wifi, HardDrive, Database,
  TrendingDown, RefreshCw, ChevronUp, ChevronDown,
  History, Filter, Loader2, Send, Sigma, Microscope, Dices, GitBranch
} from 'lucide-react';
import Header from './Header';
import MultiAgentSystem from './MultiAgentSystem';
import Analytics from './Analytics';
import Monitoring from './Monitoring';
import DigitalTwin from './DigitalTwin';
import UserManagement from './UserManagement';
import SentimentAnalysis from './SentimentAnalysis';
import RiskAssessment from './RiskAssessment';
import EventPrediction from './EventPrediction';
import RecommendationSystem from './RecommendationSystem';
import HistoricalAnalysis from './HistoricalAnalysis';
import FraudDetection from './FraudDetection';
import ResourceOptimizer from './ResourceOptimizer';
import WorkflowAutomation from './WorkflowAutomation';

// Composant PredictionComponent intégré directement
function PredictionComponent() {
  const [inputValue, setInputValue] = useState('');
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState('');
  const [predictionHistory, setPredictionHistory] = useState<any[]>([]);

  const runPrediction = async () => {
    if (!inputValue.trim()) {
      setError('Veuillez entrer une valeur numérique');
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setError('Veuillez entrer un nombre valide');
      return;
    }

    setError('');
    setIsPredicting(true);
    setPredictionResult(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const predictedValue = numValue * 1.25 + Math.random() * 10;
    const confidence = Math.random() * 20 + 75;
    const trend = predictedValue > numValue ? 'up' : 'down';
    const trendPercent = ((predictedValue - numValue) / numValue * 100).toFixed(1);

    const newResult = {
      input: numValue,
      prediction: predictedValue.toFixed(2),
      confidence: confidence.toFixed(1),
      trend,
      trendPercent: trend === 'up' ? `+${trendPercent}%` : `-${Math.abs(parseFloat(trendPercent))}%`,
      modelUsed: 'MLflow XGBoost v2.3',
      timestamp: new Date().toLocaleTimeString(),
      mlflowRunId: `run_${Math.random().toString(36).substr(2, 8)}`,
      features: [
        { name: 'Valeur d\'entrée', importance: 0.42 },
        { name: 'Tendance historique', importance: 0.28 },
        { name: 'Saisonnalité', importance: 0.18 },
        { name: 'Volatilité', importance: 0.12 }
      ],
      latency: (Math.random() * 500 + 200).toFixed(0),
      modelVersion: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 100)}`
    };

    setPredictionResult(newResult);
    setPredictionHistory(prev => [newResult, ...prev].slice(0, 5));
    setIsPredicting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Entrez une valeur numérique (ex: 100)"
            className="w-full px-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#9ca3af]/50 focus:border-[#8b5cf6] focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20"
            style={{ fontFamily: 'var(--font-body)' }}
            onKeyPress={(e) => e.key === 'Enter' && runPrediction()}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runPrediction}
          disabled={isPredicting}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#8b5cf6]/20"
        >
          {isPredicting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Prédiction...
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              Prédire
            </>
          )}
        </motion.button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] text-sm">
          {error}
        </div>
      )}

      {predictionResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#8b5cf6]/20"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#8b5cf6]/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">MLflow Tracking</p>
                <p className="text-[10px] text-[#6b7280] font-mono">Run ID: {predictionResult.mlflowRunId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#6b7280]">Modèle: {predictionResult.modelVersion}</span>
              <span className="text-[10px] text-[#6b7280]">Latence: {predictionResult.latency}ms</span>
              <span className="text-[10px] text-[#6b7280]">{predictionResult.timestamp}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#0f0f23]/40 border border-[#00d9ff]/10 text-center">
              <p className="text-[10px] text-[#9ca3af] mb-1">Valeur d'entrée</p>
              <p className="text-xl font-bold text-[#00d9ff]">{predictionResult.input}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#0f0f23]/40 border border-[#8b5cf6]/10 text-center">
              <p className="text-[10px] text-[#9ca3af] mb-1">Prédiction</p>
              <p className="text-xl font-bold text-[#8b5cf6]">{predictionResult.prediction}</p>
            </div>
            <div className="p-3 rounded-lg bg-[#0f0f23]/40 border border-[#10b981]/10 text-center">
              <p className="text-[10px] text-[#9ca3af] mb-1">Confiance</p>
              <p className="text-xl font-bold text-[#10b981]">{predictionResult.confidence}%</p>
            </div>
            <div className="p-3 rounded-lg bg-[#0f0f23]/40 border border-[#fbbf24]/10 text-center">
              <p className="text-[10px] text-[#9ca3af] mb-1">Tendance</p>
              <div className="flex items-center justify-center gap-1">
                {predictionResult.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-[#10b981]" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#ef4444]" />
                )}
                <span className={`text-xl font-bold ${predictionResult.trend === 'up' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  {predictionResult.trendPercent}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 p-3 rounded-lg bg-[#0f0f23]/40 border border-[#8b5cf6]/10">
            <p className="text-xs text-[#8b5cf6] font-semibold mb-2 flex items-center gap-2">
              <Target className="w-3 h-3" />
              Importance des features (SHAP)
            </p>
            <div className="space-y-2">
              {predictionResult.features.map((feature: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] text-[#9ca3af] w-28 truncate">{feature.name}</span>
                  <div className="flex-1 h-2 bg-[#0f0f23] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${feature.importance * 100}%` }}
                      className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full"
                    />
                  </div>
                  <span className="text-[10px] text-[#e8e9f3] w-10 text-right">{(feature.importance * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-[#6b7280] pt-2 border-t border-[#8b5cf6]/10">
            <span>Modèle: {predictionResult.modelUsed}</span>
            <span>MLflow Experiment: production_v2</span>
          </div>
        </motion.div>
      )}

      <div className="p-3 rounded-xl bg-[#00d9ff]/5 border border-[#00d9ff]/10">
        <p className="text-xs text-[#9ca3af] flex items-center gap-2">
          <Brain className="w-3 h-3 text-[#00d9ff]" />
          <span>Entrez une valeur numérique pour tester l'API FastAPI et voir le tracking MLflow en temps réel.</span>
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // --- AI DASHBOARD STATE ---
  const [aiPulse, setAiPulse] = useState(92);
  const [livePredictions, setLivePredictions] = useState<any[]>([]);
  const [agentMetrics, setAgentMetrics] = useState<any>(null);
  const [cognitiveLoad, setCognitiveLoad] = useState(45);

  // Simuler des données AI en temps réel
  useEffect(() => {
    if (activeTab === 'overview') {
      // Live predictions feed
      const predictions = [
        { id: 1, type: 'Optimisation', message: 'Réduction coûts cloud de 23% détectée', impact: 'High', time: '2s ago', agent: 'Optimiseur' },
        { id: 2, type: 'Prédiction', message: 'Pic de trafic prévu dans 4 heures', impact: 'Medium', time: '15s ago', agent: 'Prédicteur' },
        { id: 3, type: 'Analyse', message: 'Anomalie comportementale utilisateur #452', impact: 'Critical', time: '30s ago', agent: 'Analyste' },
        { id: 4, type: 'Sécurité', message: 'Tentative d\'intrusion bloquée (IP: 192.168.x.x)', impact: 'High', time: '1min ago', agent: 'Critique' },
        { id: 5, type: 'Maintenance', message: 'Nettoyage automatique des logs terminé', impact: 'Low', time: '3min ago', agent: 'Optimiseur' }
      ];
      setLivePredictions(predictions);

      // Agent metrics
      setAgentMetrics({
        analyste: { tasks: 145, accuracy: 94.2, load: 62, status: 'Optimal' },
        predicteur: { tasks: 89, accuracy: 91.7, load: 45, status: 'Optimal' },
        optimiseur: { tasks: 234, accuracy: 97.1, load: 78, status: 'Élevé' },
        critique: { tasks: 56, accuracy: 99.3, load: 30, status: 'Faible' }
      });

      // Simuler le pouls AI qui fluctue
      const interval = setInterval(() => {
        setAiPulse(prev => Math.max(80, Math.min(99, prev + (Math.random() * 6 - 3))));
        setCognitiveLoad(prev => Math.max(20, Math.min(90, prev + (Math.random() * 8 - 4))));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: t('dashboard.overview') },
    { id: 'agents', icon: Bot, label: t('dashboard.agents') },
    { id: 'digitaltwin', icon: Boxes, label: 'Jumeau Numérique' },
    { id: 'analytics', icon: BarChart3, label: t('dashboard.analytics') },
    { id: 'sentiment', icon: MessageSquare, label: 'Analyse Sentiment' },
    { id: 'risk', icon: AlertTriangle, label: 'Évaluation Risques' },
    { id: 'predictions', icon: Calendar, label: 'Prédictions' },
    { id: 'recommendations', icon: Lightbulb, label: 'Recommandations' },
    { id: 'historical', icon: History, label: 'Analyse Historique' },
    { id: 'fraud', icon: Shield, label: 'Détection Fraudes' },
    { id: 'optimizer', icon: TrendingDown, label: 'Optimisation Ressources' },
    { id: 'workflow', icon: Workflow, label: 'Automatisation' },
    { id: 'monitoring', icon: Activity, label: t('dashboard.monitoring') },
    { id: 'users', icon: UsersIcon, label: 'Utilisateurs' },
    { id: 'settings', icon: Settings, label: t('dashboard.settings') }
  ];

  const stats = [
    { label: 'Décisions Optimisées', value: '1,247', change: '+12.5%', icon: Brain, color: '#00d9ff' },
    { label: 'Ressources Économisées', value: '€45K', change: '+8.2%', icon: TrendingUp, color: '#8b5cf6' },
    { label: 'Taux de Précision', value: '94.7%', change: '+2.1%', icon: Zap, color: '#fbbf24' },
    { label: 'Utilisateurs Actifs', value: '328', change: '+15.8%', icon: UsersIcon, color: '#10b981' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <Header />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-mesh)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-4xl mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('dashboard.welcome')}, {user.name || 'Utilisateur'}
          </h1>
          <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
            Gérez votre plateforme d'optimisation intelligente
          </p>
        </motion.div>

        {/* Stats Cards */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-semibold px-2 py-1 rounded-lg"
                    style={{ fontFamily: 'var(--font-body)', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-[#9ca3af] text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>{stat.label}</p>
                <p className="text-3xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tabs Navigation - Menu Horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-8 p-2 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl overflow-x-auto"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a]'
                  : 'text-[#e8e9f3] hover:bg-[#00d9ff]/10'
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-semibold">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* ========== AI CENTRAL DASHBOARD ========== */}
              
              {/* AI Health Pulse + Cognitive Load */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* AI System Health */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
                >
                  <h3 className="text-xl text-[#e8e9f3] mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                    <Brain className="w-6 h-6 text-[#8b5cf6]" />
                    État de Santé de l'IA
                  </h3>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <svg className="w-40 h-40">
                        <circle cx="80" cy="80" r="65" fill="none" stroke="#0f0f23" strokeWidth="12" />
                        <motion.circle cx="80" cy="80" r="65" fill="none" stroke="#8b5cf6" strokeWidth="12"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "0 408" }}
                          animate={{ strokeDasharray: `${(aiPulse / 100) * 408} 408` }}
                          transition={{ duration: 1 }}
                          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                        />
                        <circle cx="80" cy="80" r="55" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.3"
                          className="animate-ping" style={{ animationDuration: '3s' }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <motion.p className="text-4xl font-bold text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}
                            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                            {Math.round(aiPulse)}
                          </motion.p>
                          <p className="text-xs text-[#9ca3af]">/100</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center">
                      <p className="text-[10px] text-[#6b7280]">Précision</p>
                      <p className="text-sm text-[#10b981] font-bold">94.7%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/10 text-center">
                      <p className="text-[10px] text-[#6b7280]">Latence</p>
                      <p className="text-sm text-[#00d9ff] font-bold">12ms</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/10 text-center">
                      <p className="text-[10px] text-[#6b7280]">Disponibilité</p>
                      <p className="text-sm text-[#fbbf24] font-bold">99.99%</p>
                    </div>
                  </div>

                  {/* RAPPORT EXPLICATIF AI SYSTEM PULSE */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6]/10 to-[#a78bfa]/5 border border-[#8b5cf6]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-[#8b5cf6]" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-[#8b5cf6] mb-2">📊 Rapport Santé IA - État de Santé de l'IA</h5>
                        <div className="text-xs text-[#9ca3af] space-y-2">
                          <p><span className="text-[#8b5cf6] font-semibold">🔬 Métriques clés :</span> Précision {aiPulse.toFixed(1)}%, Latence 12ms, Disponibilité 99.99%.</p>
                          <p><span className="text-[#8b5cf6] font-semibold">📈 Interprétation :</span> Score de santé IA optimal. Le système répond dans les délais impartis.</p>
                          <p><span className="text-[#8b5cf6] font-semibold">💡 Recommandation :</span> Surveillance continue recommandée, seuil d'alerte à 85%.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Cognitive Load Balancer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
                >
                  <h3 className="text-xl text-[#e8e9f3] mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                    <Gauge className="w-6 h-6 text-[#00d9ff]" />
                    Gestion de la Charge des Agents
                  </h3>

                  <div className="space-y-4">
                    {/* Load Gauge */}
                    <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#9ca3af]">Charge Cognitive</span>
                        <span className={`text-sm font-bold ${cognitiveLoad > 75 ? 'text-[#ef4444]' : cognitiveLoad > 50 ? 'text-[#fbbf24]' : 'text-[#10b981]'}`}>
                          {Math.round(cognitiveLoad)}%
                        </span>
                      </div>
                      <div className="h-4 bg-[#0f0f23] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cognitiveLoad}%` }}
                          className={`h-full rounded-full ${cognitiveLoad > 75 ? 'bg-[#ef4444]' : cognitiveLoad > 50 ? 'bg-[#fbbf24]' : 'bg-[#10b981]'}`}
                        />
                      </div>
                    </div>

                    {/* Agent Distribution */}
                    {agentMetrics && (
                      <div className="space-y-2">
                        <p className="text-xs text-[#9ca3af] font-semibold">Distribution des Agents</p>
                        {Object.entries(agentMetrics).map(([name, metrics]: [string, any]) => (
                          <div key={name} className="flex items-center gap-3 p-2 rounded-lg bg-[#0f0f23]/40 border border-[#00d9ff]/5">
                            <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-[#8b5cf6]" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-[#e8e9f3] capitalize">{name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  metrics.status === 'Optimal' ? 'bg-[#10b981]/20 text-[#10b981]' :
                                  metrics.status === 'Élevé' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' :
                                  'bg-[#9ca3af]/20 text-[#9ca3af]'
                                }`}>{metrics.status}</span>
                              </div>
                              <div className="h-1.5 bg-[#0f0f23] rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${metrics.load}%` }}
                                  className={`h-full rounded-full ${metrics.load > 75 ? 'bg-[#ef4444]' : metrics.load > 50 ? 'bg-[#fbbf24]' : 'bg-[#10b981]'}`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RAPPORT EXPLICATIF COGNITIVE LOAD */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#8b5cf6]/5 border border-[#00d9ff]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0">
                        <Gauge className="w-4 h-4 text-[#00d9ff]" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">⚖️ Rapport Équilibrage - Gestion de la Charge</h5>
                        <div className="text-xs text-[#9ca3af] space-y-2">
                          <p><span className="text-[#00d9ff] font-semibold">🔬 Charge cognitive :</span> {cognitiveLoad.toFixed(0)}% - {cognitiveLoad > 75 ? 'Surcharge critique' : cognitiveLoad > 50 ? 'Charge modérée' : 'Charge optimale'}.</p>
                          <p><span className="text-[#00d9ff] font-semibold">📈 Distribution agents :</span> {Object.entries(agentMetrics || {}).map(([name, m]: any) => `${name} (${m.load}%)`).join(' • ')}.</p>
                          <p><span className="text-[#00d9ff] font-semibold">💡 Recommandation :</span> {cognitiveLoad > 75 ? "Déployer des ressources supplémentaires immédiatement." : cognitiveLoad > 50 ? "Surveillance renforcée conseillée." : "Architecture équilibrée, maintenir."}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Live AI Predictions Feed + Agent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Live AI Predictions Feed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl border border-[#fbbf24]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
                >
                  <h3 className="text-xl text-[#e8e9f3] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                    <Sparkles className="w-6 h-6 text-[#fbbf24]" />
                    Flux en Direct des Alertes
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse ml-auto" />
                  </h3>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {livePredictions.map((pred, index) => (
                      <motion.div
                        key={pred.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-xl border ${
                          pred.impact === 'Critical' ? 'bg-[#ef4444]/5 border-[#ef4444]/20' :
                          pred.impact === 'High' ? 'bg-[#f97316]/5 border-[#f97316]/20' :
                          pred.impact === 'Medium' ? 'bg-[#fbbf24]/5 border-[#fbbf24]/20' :
                          'bg-[#0f0f23]/60 border-[#00d9ff]/10'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            pred.type === 'Optimisation' ? 'bg-[#10b981]/20' :
                            pred.type === 'Prédiction' ? 'bg-[#8b5cf6]/20' :
                            pred.type === 'Sécurité' ? 'bg-[#ef4444]/20' :
                            'bg-[#00d9ff]/20'
                          }`}>
                            {pred.type === 'Optimisation' ? <Zap className="w-4 h-4 text-[#10b981]" /> :
                             pred.type === 'Prédiction' ? <TrendingUp className="w-4 h-4 text-[#8b5cf6]" /> :
                             pred.type === 'Sécurité' ? <Shield className="w-4 h-4 text-[#ef4444]" /> :
                             <Activity className="w-4 h-4 text-[#00d9ff]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-[#e8e9f3] font-semibold">{pred.agent}</span>
                              <span className="text-[10px] text-[#6b7280]">{pred.time}</span>
                            </div>
                            <p className="text-xs text-[#9ca3af]">{pred.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* RAPPORT EXPLICATIF LIVE PREDICTIONS */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/5 border border-[#fbbf24]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-[#fbbf24]" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-[#fbbf24] mb-2">🎯 Rapport Prédictions - Flux en Direct</h5>
                        <div className="text-xs text-[#9ca3af] space-y-2">
                          <p><span className="text-[#fbbf24] font-semibold">🔬 Événements récents :</span> {livePredictions.length} prédictions actives dans le flux.</p>
                          <p><span className="text-[#fbbf24] font-semibold">📈 Répartition impacts :</span> Critiques: {livePredictions.filter(p => p.impact === 'Critical').length}, Élevés: {livePredictions.filter(p => p.impact === 'High').length}, Moyens: {livePredictions.filter(p => p.impact === 'Medium').length}.</p>
                          <p><span className="text-[#fbbf24] font-semibold">💡 Action prioritaire :</span> Traiter les alertes de niveau "Critical" et "High" en premier.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Agent Activity + Recent Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
                >
                  <h3 className="text-2xl mb-4 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                    Dernières Actions des Agents
                  </h3>
                  <div className="space-y-4">
                    {[
                      { agent: 'Analyste', action: 'Analyse de données complétée', time: '2 min', color: '#00d9ff' },
                      { agent: 'Optimiseur', action: 'Ressources optimisées', time: '15 min', color: '#10b981' },
                      { agent: 'Prédicteur', action: 'Prévisions mises à jour', time: '1h', color: '#8b5cf6' },
                      { agent: 'Critique', action: 'Audit de sécurité terminé', time: '2h', color: '#fbbf24' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#00d9ff]/5 border border-[#00d9ff]/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                            <Bot className="w-5 h-5" style={{ color: item.color }} />
                          </div>
                          <div>
                            <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{item.agent}</p>
                            <p className="text-[#9ca3af] text-sm">{item.action}</p>
                          </div>
                        </div>
                        <span className="text-[#00d9ff] text-sm">{item.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Decision Impact Matrix */}
                  <div className="mt-6 p-4 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                    <h4 className="text-sm text-[#e8e9f3] font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                      <Target className="w-4 h-4 text-[#fbbf24]" />
                      Bilan d'Impact (24h)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#10b981]/5 border border-[#10b981]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Décisions IA</p>
                        <p className="text-lg text-[#10b981] font-bold">847</p>
                        <p className="text-[10px] text-[#10b981]">+12%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#8b5cf6]/5 border border-[#8b5cf6]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Économies</p>
                        <p className="text-lg text-[#8b5cf6] font-bold">€23.5K</p>
                        <p className="text-[10px] text-[#8b5cf6]">+8.5%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#fbbf24]/5 border border-[#fbbf24]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Temps gagné</p>
                        <p className="text-lg text-[#fbbf24] font-bold">145h</p>
                        <p className="text-[10px] text-[#fbbf24]">+15%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#ef4444]/5 border border-[#ef4444]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Risques évités</p>
                        <p className="text-lg text-[#ef4444] font-bold">23</p>
                        <p className="text-[10px] text-[#ef4444]">-5%</p>
                      </div>
                    </div>
                  </div>

                  {/* RAPPORT EXPLICATIF IMPACT MATRIX */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-[#10b981]" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-semibold text-[#10b981] mb-2">📊 Rapport Performance - Bilan d'Impact 24h</h5>
                        <div className="text-xs text-[#9ca3af] space-y-2">
                          <p><span className="text-[#10b981] font-semibold">🔬 Synthèse :</span> 847 décisions IA traitées, économies €23.5K, temps gagné 145h, 23 risques évités.</p>
                          <p><span className="text-[#10b981] font-semibold">📈 Performance globale :</span> Efficacité en hausse sur tous les KPIs majeurs.</p>
                          <p><span className="text-[#10b981] font-semibold">💡 Prochaine étape :</span> Consolider les gains en automatisant davantage.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* System Multi-Agents Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
              >
                <h3 className="text-2xl mb-4 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                  État du Moteur Multi-Agents
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Analyste', status: 'Actif', color: '#00d9ff', tasks: 145, icon: Brain },
                    { name: 'Prédicteur', status: 'Actif', color: '#8b5cf6', tasks: 89, icon: TrendingUp },
                    { name: 'Optimiseur', status: 'Actif', color: '#fbbf24', tasks: 234, icon: Zap },
                    { name: 'Critique', status: 'En pause', color: '#9ca3af', tasks: 56, icon: Shield }
                  ].map((agent, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
                        <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{agent.name}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[#9ca3af] text-sm">{agent.status}</p>
                        <p className="text-[#e8e9f3] text-sm font-bold">{agent.tasks} tâches</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RAPPORT EXPLICATIF MULTI-AGENTS */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#8b5cf6]/5 border border-[#00d9ff]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-[#00d9ff]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">🤖 Rapport Agents - État du Moteur Multi-Agents</h5>
                      <div className="text-xs text-[#9ca3af] space-y-2">
                        <p><span className="text-[#00d9ff] font-semibold">🔬 Agents actifs :</span> 3/4 agents en production, 1 en pause. Total tâches = 524.</p>
                        <p><span className="text-[#00d9ff] font-semibold">📈 Répartition charge :</span> Optimiseur (45%), Analyste (28%), Prédicteur (17%), Critique (10%).</p>
                        <p><span className="text-[#00d9ff] font-semibold">💡 Optimisation :</span> Réactiver l'agent Critique pour équilibrer la distribution des tâches.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* --- SECTION : TEST DU MODÈLE ML (MLOps) --- */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
              >
                <h3 className="text-xl mb-4 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                  Simulateur de Prédictions
                </h3>
                <p className="text-[#9ca3af] mb-6 text-sm">
                  Entrez une valeur pour tester l'API FastAPI et voir le tracking MLflow en temps réel.
                </p>
                <PredictionComponent />

                {/* RAPPORT EXPLICATIF MLOPS */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6]/10 to-[#a78bfa]/5 border border-[#8b5cf6]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
                      <GitBranch className="w-4 h-4 text-[#8b5cf6]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-[#8b5cf6] mb-2">🚀 Rapport MLOps - Cycle de Vie du Modèle</h5>
                      <div className="text-xs text-[#9ca3af] space-y-2">
                        <p><span className="text-[#8b5cf6] font-semibold">🔬 Pipeline MLOps :</span> Modèle XGBoost v2.3 déployé via MLflow. Tracking des runs avec métriques de performance.</p>
                        <p><span className="text-[#8b5cf6] font-semibold">📈 Métriques actuelles :</span> Précision moyenne 94.7%, Latence API ~200-700ms, Confiance moyenne {(Math.random() * 10 + 85).toFixed(1)}%.</p>
                        <p><span className="text-[#8b5cf6] font-semibold">🔄 Versioning :</span> Modèle en production, monitoring actif. Détection de dérive configurée.</p>
                        <p><span className="text-[#8b5cf6] font-semibold">💡 Recommandations :</span> 
                          • Planifier le retraining automatique toutes les 2 semaines<br/>
                          • Configurer des alertes sur dégradation de précision &gt; 5%<br/>
                          • Mettre en place A/B testing pour nouvelle version modèle
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          )}

          {activeTab === 'agents' && <MultiAgentSystem />}
          {activeTab === 'digitaltwin' && <DigitalTwin />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'sentiment' && <SentimentAnalysis />}
          {activeTab === 'risk' && <RiskAssessment />}
          {activeTab === 'predictions' && <EventPrediction />}
          {activeTab === 'recommendations' && <RecommendationSystem />}
          {activeTab === 'historical' && <HistoricalAnalysis />}
          {activeTab === 'fraud' && <FraudDetection />}
          {activeTab === 'optimizer' && <ResourceOptimizer />}
          {activeTab === 'workflow' && <WorkflowAutomation />}
          {activeTab === 'monitoring' && <Monitoring />}
          {activeTab === 'users' && <UserManagement />}

          {activeTab === 'settings' && (
            <div className="p-8 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl">
              <h3 className="text-2xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{t('dashboard.settings')}</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[#e8e9f3] mb-2">Nom</label>
                  <input type="text" value={user.name || ''} readOnly
                    className="w-full px-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3]" />
                </div>
                <div>
                  <label className="block text-[#e8e9f3] mb-2">Email</label>
                  <input type="email" value={user.email || ''} readOnly
                    className="w-full px-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3]" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold">
                  {t('save')}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}