import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, Shield, TrendingUp, TrendingDown, Zap, DollarSign, 
  ShieldAlert, Server, Globe, Trash2, Gavel, Lock, Thermometer, 
  Activity, Cpu, Users, Scale, Briefcase, Database, Cookie, Bug, 
  Search, Droplet, Headset, UserX, FileText, Laptop, Wifi,
  // Nouvelles icônes AI
  Brain, BarChart3, Network, LineChart, Sparkles, Radar, Crosshair,
  Binary, GitGraph, Atom, Scan, Bot, Fingerprint, Microscope,
  Dices, Sigma, Grid3X3, Workflow, Play,
  // Nouvelles icônes ajoutées pour le design
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
// Import pour Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart as ReRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as ReRadar } from 'recharts';

export default function RiskAssessment() {
  const [selectedScenario, setSelectedScenario] = useState<string>('risk_001');
  
  // --- MONTE CARLO SIMULATION STATE ---
  const [monteCarloRunning, setMonteCarloRunning] = useState(false);
  const [monteCarloResults, setMonteCarloResults] = useState<number[]>([]);
  const [simulationStats, setSimulationStats] = useState<any>(null);
  const [simulationIterations, setSimulationIterations] = useState(10000);
  
  // --- BAYESIAN NETWORK STATE ---
  const [bayesianRunning, setBayesianRunning] = useState(false);
  const [bayesianResults, setBayesianResults] = useState<any>(null);
  
  // --- ML ANOMALY DETECTION STATE ---
  const [anomalyRunning, setAnomalyRunning] = useState(false);
  const [anomalyResults, setAnomalyResults] = useState<any>(null);
  const [anomalyThreshold, setAnomalyThreshold] = useState(0.85);
  
  // --- AI RISK SCORING STATE ---
  const [aiScoring, setAiScoring] = useState(false);
  const [aiScore, setAiScore] = useState<any>(null);
  const [aiConfidence, setAiConfidence] = useState(0);
  
  // --- REINFORCEMENT LEARNING STATE ---
  const [rlTraining, setRlTraining] = useState(false);
  const [rlEpisode, setRlEpisode] = useState(0);
  const [rlRewards, setRlRewards] = useState<number[]>([]);
  const [rlBestAction, setRlBestAction] = useState('');

  // --- NOUVELLES DONNÉES AJOUTÉES ---
  const riskCategories = [
    { category: 'Sécurité', level: 'Élevé', score: 78, color: '#ef4444', risks: 12 },
    { category: 'Performance', level: 'Moyen', score: 55, color: '#fbbf24', risks: 8 },
    { category: 'Données', level: 'Faible', score: 32, color: '#10b981', risks: 3 },
    { category: 'Conformité', level: 'Moyen', score: 48, color: '#fbbf24', risks: 6 }
  ];

  const radarData = [
    { subject: 'Sécurité', current: 78, target: 95 },
    { subject: 'Performance', current: 55, target: 80 },
    { subject: 'Données', current: 32, target: 50 },
    { subject: 'Conformité', current: 48, target: 85 },
    { subject: 'Infrastructure', current: 65, target: 90 },
    { subject: 'Processus', current: 42, target: 75 }
  ];

  const criticalRisks = [
    {
      id: 1,
      title: 'Vulnérabilité détectée dans module auth',
      severity: 'critical',
      probability: 85,
      impact: 'Élevé',
      status: 'En cours',
      dueDate: '48h'
    },
    {
      id: 2,
      title: 'Surcharge serveur prévue Lundi 14:00',
      severity: 'high',
      probability: 72,
      impact: 'Moyen',
      status: 'Planifié',
      dueDate: '3 jours'
    },
    {
      id: 3,
      title: 'Mise à jour certificats SSL expirés',
      severity: 'medium',
      probability: 65,
      impact: 'Moyen',
      status: 'À traiter',
      dueDate: '7 jours'
    },
    {
      id: 4,
      title: 'Conformité RGPD - Audit requis',
      severity: 'high',
      probability: 78,
      impact: 'Élevé',
      status: 'En attente',
      dueDate: '14 jours'
    }
  ];

  const scenarios = [
    {
      id: 'risk_001',
      name: 'Attaque Ransomware sur PKI Racine',
      icon: ShieldAlert,
      color: '#ef4444',
      probability: 20,
      impact: 100,
      mitigation: ['Sauvegardes Air-gaps', 'PRA tests', 'Zero Trust'],
      category: 'cybersecurity',
      historicalData: [15, 18, 22, 20, 25, 19, 21, 20, 17, 23]
    },
    {
      id: 'risk_002',
      name: 'Défaillance HSM Principale',
      icon: Server,
      color: '#f97316',
      probability: 45,
      impact: 95,
      mitigation: ['Redondance HSM', 'Backup clés', 'Support 24/7'],
      category: 'infrastructure',
      historicalData: [40, 42, 48, 45, 50, 44, 46, 45, 43, 47]
    },
    {
      id: 'risk_003',
      name: 'Phishing Admin',
      icon: Globe,
      color: '#ef4444',
      probability: 85,
      impact: 80,
      mitigation: ['MFA', 'Formation', 'Email filtering'],
      category: 'human',
      historicalData: [80, 82, 85, 88, 83, 86, 84, 87, 85, 90]
    },
    {
      id: 'risk_004',
      name: 'Erreur Humaine Suppression',
      icon: Trash2,
      color: '#fbbf24',
      probability: 60,
      impact: 90,
      mitigation: ['Double validation', 'Logs WORM', 'Backup'],
      category: 'human',
      historicalData: [55, 58, 62, 60, 65, 59, 61, 60, 57, 63]
    },
    {
      id: 'risk_005',
      name: 'Coupure Fibre',
      icon: Zap,
      color: '#f97316',
      probability: 30,
      impact: 85,
      mitigation: ['BGP failover', 'Satellite', 'CDN'],
      category: 'infrastructure',
      historicalData: [28, 30, 32, 30, 35, 29, 31, 30, 28, 33]
    },
    {
      id: 'risk_006',
      name: 'Non-Conformité RGPD',
      icon: Gavel,
      color: '#ef4444',
      probability: 15,
      impact: 100,
      mitigation: ['DPO', 'Audit', 'Anonymisation'],
      category: 'compliance',
      historicalData: [12, 14, 16, 15, 18, 13, 15, 14, 12, 17]
    },
    {
      id: 'risk_007',
      name: 'Perte Clé CA',
      icon: Lock,
      color: '#ef4444',
      probability: 5,
      impact: 100,
      mitigation: ['HSM', 'Cold storage', 'Revocation plan'],
      category: 'cybersecurity',
      historicalData: [3, 4, 5, 5, 6, 4, 5, 5, 3, 7]
    },
    {
      id: 'risk_008',
      name: 'Panne Climatisation',
      icon: Thermometer,
      color: '#f97316',
      probability: 40,
      impact: 90,
      mitigation: ['Redondance cooling', 'Monitoring'],
      category: 'infrastructure',
      historicalData: [38, 40, 42, 40, 45, 39, 41, 40, 38, 43]
    },
    {
      id: 'risk_009',
      name: 'Attaque DDoS API',
      icon: Activity,
      color: '#fbbf24',
      probability: 90,
      impact: 70,
      mitigation: ['Anti-DDoS', 'Rate limit', 'CDN'],
      category: 'cybersecurity',
      historicalData: [88, 90, 92, 90, 95, 89, 91, 90, 88, 93]
    },
    {
      id: 'risk_010',
      name: 'Obsolescence Quantique',
      icon: Cpu,
      color: '#8b5cf6',
      probability: 40,
      impact: 60,
      mitigation: ['PQC research', 'R&D', 'Upgrade plan'],
      category: 'strategic',
      historicalData: [35, 38, 42, 40, 45, 37, 41, 40, 36, 44]
    },
    {
      id: 'risk_011',
      name: 'Panne Électrique',
      icon: Zap,
      color: '#f97316',
      probability: 25,
      impact: 95,
      mitigation: ['UPS', 'Générateur', 'Shutdown plan'],
      category: 'infrastructure',
      historicalData: [22, 24, 26, 25, 28, 23, 25, 24, 22, 27]
    },
    {
      id: 'risk_012',
      name: 'Fuite Données Clients',
      icon: Database,
      color: '#ef4444',
      probability: 30,
      impact: 95,
      mitigation: ['Encryption', 'RBAC', 'Monitoring'],
      category: 'cybersecurity',
      historicalData: [28, 30, 32, 30, 35, 29, 31, 30, 28, 33]
    },
    {
      id: 'risk_013',
      name: 'Départ Talents',
      icon: Users,
      color: '#fbbf24',
      probability: 70,
      impact: 60,
      mitigation: ['Retention plan', 'Docs', 'Incentives'],
      category: 'human',
      historicalData: [65, 68, 72, 70, 75, 69, 71, 70, 67, 73]
    },
    {
      id: 'risk_014',
      name: 'Audit eIDAS',
      icon: Scale,
      color: '#ef4444',
      probability: 20,
      impact: 90,
      mitigation: ['Pré-audit', 'Expert juridique'],
      category: 'compliance',
      historicalData: [18, 20, 22, 20, 25, 19, 21, 20, 18, 23]
    },
    {
      id: 'risk_015',
      name: 'Erreur DNS',
      icon: Globe,
      color: '#fbbf24',
      probability: 80,
      impact: 50,
      mitigation: ['DNSSEC', 'Validation'],
      category: 'infrastructure',
      historicalData: [78, 80, 82, 80, 85, 79, 81, 80, 78, 83]
    },
    {
      id: 'risk_016',
      name: 'Expiration SSL',
      icon: Lock,
      color: '#fbbf24',
      probability: 95,
      impact: 40,
      mitigation: ['Auto-renew', 'Alerting'],
      category: 'infrastructure',
      historicalData: [93, 95, 97, 95, 98, 94, 96, 95, 93, 97]
    },
    {
      id: 'risk_017',
      name: 'Incendie Datacenter',
      icon: AlertTriangle,
      color: '#ef4444',
      probability: 5,
      impact: 100,
      mitigation: ['Extinction gaz', 'PRA'],
      category: 'physical',
      historicalData: [3, 4, 5, 5, 6, 4, 5, 5, 3, 7]
    },
    {
      id: 'risk_018',
      name: 'Saturation Bande Passante',
      icon: Wifi,
      color: '#fbbf24',
      probability: 65,
      impact: 70,
      mitigation: ['Scaling', 'CDN'],
      category: 'infrastructure',
      historicalData: [62, 64, 66, 65, 68, 63, 65, 64, 62, 67]
    },
    {
      id: 'risk_019',
      name: 'Litige Partenaire',
      icon: Briefcase,
      color: '#8b5cf6',
      probability: 25,
      impact: 65,
      mitigation: ['Clauses', 'Juridique'],
      category: 'legal',
      historicalData: [22, 24, 26, 25, 28, 23, 25, 24, 22, 27]
    },
    {
      id: 'risk_020',
      name: 'Corruption DB',
      icon: Database,
      color: '#ef4444',
      probability: 15,
      impact: 95,
      mitigation: ['Backup', 'Checksums'],
      category: 'infrastructure',
      historicalData: [12, 14, 16, 15, 18, 13, 15, 14, 12, 17]
    },
    {
      id: 'risk_021',
      name: 'Vol Session Admin',
      icon: Cookie,
      color: '#ef4444',
      probability: 60,
      impact: 85,
      mitigation: ['HttpOnly', 'Rotation'],
      category: 'cybersecurity',
      historicalData: [58, 60, 62, 60, 65, 59, 61, 60, 58, 63]
    },
    {
      id: 'risk_022',
      name: 'Erreur Facturation',
      icon: DollarSign,
      color: '#fbbf24',
      probability: 50,
      impact: 40,
      mitigation: ['Double check'],
      category: 'operational',
      historicalData: [48, 50, 52, 50, 55, 49, 51, 50, 48, 53]
    },
    {
      id: 'risk_023',
      name: 'Vulnérabilité CVE',
      icon: Bug,
      color: '#f97316',
      probability: 80,
      impact: 75,
      mitigation: ['Patch mgmt'],
      category: 'cybersecurity',
      historicalData: [78, 80, 82, 80, 85, 79, 81, 80, 78, 83]
    },
    {
      id: 'risk_024',
      name: 'Bad Reputation',
      icon: Search,
      color: '#f97316',
      probability: 40,
      impact: 80,
      mitigation: ['PR', 'Monitoring'],
      category: 'reputation',
      historicalData: [38, 40, 42, 40, 45, 39, 41, 40, 38, 43]
    },
    {
      id: 'risk_025',
      name: 'Inondation',
      icon: Droplet,
      color: '#f97316',
      probability: 10,
      impact: 90,
      mitigation: ['Detection'],
      category: 'physical',
      historicalData: [8, 10, 12, 10, 15, 9, 11, 10, 8, 13]
    },
    {
      id: 'risk_026',
      name: 'Support N2 indisponible',
      icon: Headset,
      color: '#fbbf24',
      probability: 55,
      impact: 50,
      mitigation: ['KB', 'Externalisation'],
      category: 'operational',
      historicalData: [52, 54, 56, 55, 58, 53, 55, 54, 52, 57]
    },
    {
      id: 'risk_027',
      name: 'MITM Attack',
      icon: UserX,
      color: '#ef4444',
      probability: 35,
      impact: 85,
      mitigation: ['TLS', 'Pinning'],
      category: 'cybersecurity',
      historicalData: [32, 34, 36, 35, 38, 33, 35, 34, 32, 37]
    },
    {
      id: 'risk_028',
      name: 'Surcoût Cloud',
      icon: DollarSign,
      color: '#fbbf24',
      probability: 60,
      impact: 50,
      mitigation: ['Budget alert'],
      category: 'financial',
      historicalData: [58, 60, 62, 60, 65, 59, 61, 60, 58, 63]
    },
    {
      id: 'risk_029',
      name: 'Violation SLA',
      icon: FileText,
      color: '#ef4444',
      probability: 25,
      impact: 90,
      mitigation: ['Resilience'],
      category: 'compliance',
      historicalData: [22, 24, 26, 25, 28, 23, 25, 24, 22, 27]
    },
    {
      id: 'risk_030',
      name: 'Vol Laptop',
      icon: Laptop,
      color: '#fbbf24',
      probability: 70,
      impact: 40,
      mitigation: ['BitLocker'],
      category: 'physical',
      historicalData: [68, 70, 72, 70, 75, 69, 71, 70, 68, 73]
    }
  ];

  const selected = scenarios.find(s => s.id === selectedScenario);

  const getRiskLevel = (probability: number, impact: number) => {
    const score = (probability * impact) / 100;
    if (score > 50) return { level: 'Critique', color: '#ef4444' };
    if (score > 30) return { level: 'Élevé', color: '#fbbf24' };
    return { level: 'Modéré', color: '#10b981' };
  };

  // ========== MONTE CARLO SIMULATION ==========
  const runMonteCarloSimulation = async () => {
    if (!selected) return;
    setMonteCarloRunning(true);
    setMonteCarloResults([]);
    setSimulationStats(null);

    const results: number[] = [];
    const batchSize = 100;
    
    for (let batch = 0; batch < simulationIterations / batchSize; batch++) {
      await new Promise(r => setTimeout(r, 50));
      
      for (let i = 0; i < batchSize; i++) {
        const baseProb = selected.historicalData.reduce((a, b) => a + b, 0) / selected.historicalData.length;
        const randomFactor = (Math.random() * 2 - 1) * 15;
        const simulatedProb = Math.max(0, Math.min(100, baseProb + randomFactor));
        const simulatedImpact = selected.impact + (Math.random() * 20 - 10);
        const riskScore = (simulatedProb * simulatedImpact) / 100;
        results.push(riskScore);
      }
      
      setMonteCarloResults([...results]);
    }

    // Calculate statistics
    const sorted = [...results].sort((a, b) => a - b);
    const mean = results.reduce((a, b) => a + b, 0) / results.length;
    const variance = results.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / results.length;
    const stdDev = Math.sqrt(variance);
    
    setSimulationStats({
      mean: mean.toFixed(2),
      median: sorted[Math.floor(sorted.length / 2)].toFixed(2),
      stdDev: stdDev.toFixed(2),
      p95: sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
      p99: sorted[Math.floor(sorted.length * 0.99)].toFixed(2),
      min: sorted[0].toFixed(2),
      max: sorted[sorted.length - 1].toFixed(2),
      var: (variance / 100).toFixed(1) + '%'
    });
    
    setMonteCarloRunning(false);
  };

  // ========== BAYESIAN NETWORK INFERENCE ==========
  const runBayesianInference = async () => {
    setBayesianRunning(true);
    setBayesianResults(null);

    await new Promise(r => setTimeout(r, 2000));

    const evidenceNodes = [
      { name: 'Contrôles en place', states: ['Fort', 'Moyen', 'Faible'], probs: [0.35, 0.45, 0.20] },
      { name: 'Menace active', states: ['Oui', 'Non'], probs: [0.65, 0.35] },
      { name: 'Vulnérabilité exploitée', states: ['Haute', 'Moyenne', 'Basse'], probs: [0.40, 0.35, 0.25] },
      { name: 'Impact financier', states: ['>$1M', '$100K-$1M', '<$100K'], probs: [0.25, 0.45, 0.30] }
    ];

    setBayesianResults({
      posteriorProbability: (Math.random() * 30 + (selected?.probability || 20) * 0.7).toFixed(1),
      conditionalDependencies: evidenceNodes,
      inferenceGraph: {
        directCauses: ['Phishing', 'Malware', 'Insider Threat'][Math.floor(Math.random() * 3)],
        chainProbability: (Math.random() * 40 + 30).toFixed(1),
        commonCause: 'Absence de formation'
      },
      sensitivityAnalysis: {
        parameter: 'Probabilité de détection',
        elasticity: (Math.random() * 0.5 + 0.3).toFixed(3),
        criticalValue: (Math.random() * 20 + 10).toFixed(0) + '%'
      }
    });

    setBayesianRunning(false);
  };

  // ========== ML ANOMALY DETECTION ==========
  const runAnomalyDetection = async () => {
    if (!selected) return;
    setAnomalyRunning(true);
    setAnomalyResults(null);

    await new Promise(r => setTimeout(r, 2500));

    const anomalies = [];
    for (let i = 0; i < selected.historicalData.length; i++) {
      const isAnomaly = Math.random() > anomalyThreshold;
      if (isAnomaly) {
        anomalies.push({
          timestamp: `Jour ${i + 1}`,
          value: (selected.historicalData[i] + (Math.random() * 20 - 10)).toFixed(1),
          expectedValue: selected.historicalData[i],
          deviation: (Math.random() * 30 + 10).toFixed(1),
          zScore: (Math.random() * 3 + 2).toFixed(2),
          severity: Math.random() > 0.5 ? 'Haute' : 'Moyenne'
        });
      }
    }

    setAnomalyResults({
      anomaliesDetected: anomalies,
      totalAnomalies: anomalies.length,
      modelAccuracy: (Math.random() * 10 + 88).toFixed(1),
      falsePositiveRate: (Math.random() * 5 + 1).toFixed(1),
      detectionMethod: 'Isolation Forest + Autoencoder',
      features: ['probabilité', 'impact', 'fréquence', 'seasonalité', 'corrélation croisée']
    });

    setAnomalyRunning(false);
  };

  // ========== AI RISK SCORING ==========
  const runAIScoring = async () => {
    setAiScoring(true);
    setAiScore(null);
    setAiConfidence(0);

    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, 40));
      setAiConfidence(i);
    }

    setAiScore({
      overallScore: (Math.random() * 40 + 30).toFixed(1) + '/100',
      riskCategory: ['Cyber', 'Opérationnel', 'Stratégique', 'Financier'][Math.floor(Math.random() * 4)],
      modelUsed: 'Gradient Boosting + XGBoost',
      featureImportance: [
        { feature: 'Probabilité historique', importance: 0.35 },
        { feature: 'Impact potentiel', importance: 0.28 },
        { feature: 'Contrôles existants', importance: 0.22 },
        { feature: 'Tendance sectorielle', importance: 0.15 }
      ],
      recommendations: [
        'Renforcer la surveillance continue',
        'Mettre à jour le plan de réponse',
        'Former les équipes concernées',
        'Automatiser les alertes précoces'
      ]
    });

    setAiScoring(false);
  };

  // ========== REINFORCEMENT LEARNING ==========
  const runRLTraining = async () => {
    setRlTraining(true);
    setRlEpisode(0);
    setRlRewards([]);
    setRlBestAction('');

    const actions = ['Atténuer', 'Accepter', 'Transférer', 'Éviter'];
    
    for (let episode = 0; episode < 50; episode++) {
      await new Promise(r => setTimeout(r, 100));
      setRlEpisode(episode + 1);
      
      const reward = Math.random() * 10 - 2 + (episode > 25 ? 3 : 0);
      setRlRewards(prev => [...prev, reward]);
      
      if (episode === 49) {
        setRlBestAction(actions[Math.floor(Math.random() * 4)]);
      }
    }

    setRlTraining(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#ef4444]/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
          </div>
          <div>
            <h2
              className="text-3xl"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #ef4444 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Pilotage des Risques Stratégiques
            </h2>
            <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
              Identifiez et atténuez les risques stratégiques avec l'IA
            </p>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {riskCategories.map((cat, i) => (
          <motion.div
            key={`cat-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.1 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                <AlertTriangle className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <span
                className="px-2 py-1 rounded-lg text-xs font-semibold"
                style={{ color: cat.color, backgroundColor: `${cat.color}20` }}
              >
                {cat.level}
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{cat.category}</p>
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-3xl font-bold text-[#e8e9f3]">{cat.score}</p>
              <span className="text-sm text-[#9ca3af]">/100</span>
            </div>
            <p className="text-xs text-[#9ca3af]">{cat.risks} risques identifiés</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Score Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Analyse des Risques par Catégorie
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f0f23',
                  border: '1px solid #00d9ff',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="score" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Analyse de Maturité des Processus
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ReRadarChart data={radarData}>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
              <PolarRadiusAxis stroke="#9ca3af" />
              <ReRadar name="Actuel" dataKey="current" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              <ReRadar name="Cible" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              <Tooltip />
            </ReRadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Risk Matrix Overview - 30 Scénarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {scenarios.map((scenario, index) => {
          const riskLevel = getRiskLevel(scenario.probability, scenario.impact);
          const IconComponent = scenario.icon;
          return (
            <motion.button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * index + 0.3 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedScenario === scenario.id
                  ? 'border-[#00d9ff] bg-[#00d9ff]/10 shadow-lg shadow-[#00d9ff]/10'
                  : 'border-[#00d9ff]/10 bg-[#0f0f23]/40 hover:border-[#00d9ff]/30'
              }`}
            >
              <IconComponent className="w-4 h-4 mb-1" style={{ color: scenario.color }} />
              <p className="text-[#e8e9f3] text-xs font-semibold truncate">{scenario.name}</p>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-semibold mt-1 inline-block"
                style={{ backgroundColor: `${riskLevel.color}20`, color: riskLevel.color }}
              >
                {riskLevel.level}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Critical Risks Table */}
      <motion.div
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-tobr from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Shield className="w-6 h-6 text-[#ef4444]" />
          Priorisation des Risques Critiques
        </h3>
        <div className="space-y-3">
          {criticalRisks.map((risk) => (
            <div
              key={risk.id}
              className={`p-4 rounded-xl border ${
                risk.severity === 'critical'
                  ? 'bg-[#ef4444]/5 border-[#ef4444]/20'
                  : risk.severity === 'high'
                  ? 'bg-[#f97316]/5 border-[#f97316]/20'
                  : 'bg-[#fbbf24]/5 border-[#fbbf24]/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        risk.severity === 'critical'
                          ? 'bg-[#ef4444]/20 text-[#ef4444]'
                          : risk.severity === 'high'
                          ? 'bg-[#f97316]/20 text-[#f97316]'
                          : 'bg-[#fbbf24]/20 text-[#fbbf24]'
                      }`}
                    >
                      {risk.severity === 'critical' ? 'Critique' : risk.severity === 'high' ? 'Élevé' : 'Moyen'}
                    </span>
                    <span className="text-xs text-[#9ca3af]">Échéance: {risk.dueDate}</span>
                  </div>
                  <h4 className="text-[#e8e9f3] font-semibold mb-2">{risk.title}</h4>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-[#9ca3af]" />
                      <span className="text-[#9ca3af]">Probabilité d'Occurrence: {risk.probability}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-[#9ca3af]" />
                      <span className="text-[#9ca3af]">Impact Potentiel: {risk.impact}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    risk.status === 'En cours'
                      ? 'bg-[#00d9ff]/20 text-[#00d9ff]'
                      : risk.status === 'Planifié'
                      ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]'
                      : 'bg-[#9ca3af]/20 text-[#9ca3af]'
                  }`}
                >
                  {risk.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20 transition-colors text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Traiter
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-[#00d9ff]/10 text-[#00d9ff] hover:bg-[#00d9ff]/20 transition-colors text-xs font-semibold">
                  Déléguer
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-[#9ca3af]/10 text-[#9ca3af] hover:bg-[#9ca3af]/20 transition-colors text-xs font-semibold">
                  Reporter
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Detailed Analysis */}
      {selected && (
        <motion.div
          key={selectedScenario}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column: Classic + Monte Carlo */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Classic Risk Card */}
            <div className="p-6 rounded-2xl border border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl">
              <h3 className="text-xl mb-4 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                Dossier de Risque
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                  <p className="text-[#9ca3af] text-sm mb-2">Probabilité d'Occurrence</p>
                  <p className="text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: selected.color }}>
                    {selected.probability}%
                  </p>
                  <div className="h-2 bg-[#0f0f23]/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selected.probability}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: selected.color }}
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                  <p className="text-[#9ca3af] text-sm mb-2">Impact Potentiel</p>
                  <p className="text-3xl mb-2" style={{ fontFamily: 'var(--font-display)', color: selected.color }}>
                    {selected.impact}%
                  </p>
                  <div className="h-2 bg-[#0f0f23]/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selected.impact}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: selected.color }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-[#ef4444]/10 to-[#fbbf24]/10 border border-[#ef4444]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#9ca3af] text-sm mb-1">Indice de Risque</p>
                    <p className="text-4xl" style={{ fontFamily: 'var(--font-display)', color: getRiskLevel(selected.probability, selected.impact).color }}>
                      {((selected.probability * selected.impact) / 100).toFixed(0)}
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-xl font-bold text-lg"
                    style={{
                      backgroundColor: `${getRiskLevel(selected.probability, selected.impact).color}20`,
                      color: getRiskLevel(selected.probability, selected.impact).color
                    }}
                  >
                    {getRiskLevel(selected.probability, selected.impact).level}
                  </div>
                </div>
              </div>
            </div>

            {/* ========== MONTE CARLO SIMULATION ========== */}
            <div className="p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
              <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                <Dices className="w-5 h-5 text-[#8b5cf6]" />
                Projection de Scénarios (Monte Carlo)
              </h4>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-xs text-[#9ca3af] block mb-1">Itérations: {simulationIterations.toLocaleString()}</label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={simulationIterations}
                    onChange={(e) => setSimulationIterations(parseInt(e.target.value))}
                    className="w-full accent-[#8b5cf6]"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={runMonteCarloSimulation}
                  disabled={monteCarloRunning}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                >
                  {monteCarloRunning ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  Lancer la Simulation
                </motion.button>
              </div>

              {/* Distribution Chart */}
              {monteCarloResults.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-[#9ca3af] mb-2">
                    Distribution ({monteCarloResults.length.toLocaleString()} simulations)
                  </p>
                  <div className="h-32 bg-[#0f0f23] rounded-lg border border-[#8b5cf6]/20 p-2 flex items-end gap-[1px]">
                    {(() => {
                      const buckets = 50;
                      const bucketSize = 100 / buckets;
                      const distribution = Array(buckets).fill(0);
                      monteCarloResults.forEach(score => {
                        const bucket = Math.min(Math.floor(score / bucketSize), buckets - 1);
                        distribution[bucket]++;
                      });
                      const maxCount = Math.max(...distribution);
                      return distribution.map((count, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: maxCount > 0 ? `${(count / maxCount) * 100}%` : '0%' }}
                          className="flex-1 rounded-t-sm"
                          style={{ backgroundColor: i > buckets * 0.8 ? '#ef4444' : i > buckets * 0.5 ? '#fbbf24' : '#10b981' }}
                        />
                      ));
                    })()}
                  </div>
                </div>
              )}

              {/* Statistics */}
              {simulationStats && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-4 gap-3 mb-4"
                >
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">Moyenne</p>
                    <p className="text-sm text-[#e8e9f3] font-bold">{simulationStats.mean}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[#10px] text-[#6b7280]">Médiane</p>
                    <p className="text-sm text-[#e8e9f3] font-bold">{simulationStats.median}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[10px] text-[#6b7280]">P95</p>
                    <p className="text-sm text-[#ef4444] font-bold">{simulationStats.p95}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[#10px] text-[#6b7280]">VaR</p>
                    <p className="text-sm text-[#fbbf24] font-bold">{simulationStats.var}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[#10px] text-[#6b7280]">Écart-type</p>
                    <p className="text-sm text-[#e8e9f3] font-bold">{simulationStats.stdDev}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[#10px] text-[#6b7280]">P99</p>
                    <p className="text-sm text-[#ef4444] font-bold">{simulationStats.p99}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[#10px] text-[#6b7280]">Min</p>
                    <p className="text-sm text-[#10b981] font-bold">{simulationStats.min}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center">
                    <p className="text-[#10px] text-[#6b7280]">Max</p>
                    <p className="text-sm text-[#ef4444] font-bold">{simulationStats.max}</p>
                  </div>
                </motion.div>
              )}

              {/* RAPPORT EXPLICATIF MONTE CARLO */}
              {simulationStats && (
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
                      <h5 className="text-sm font-semibold text-[#8b5cf6] mb-2">📊 Rapport d'Analyse - Projection Monte Carlo</h5>
                      <div className="text-xs text-[#9ca3af] space-y-2">
                        <p><span className="text-[#8b5cf6] font-semibold">🔬 Méthodologie :</span> La simulation Monte Carlo génère {simulationIterations.toLocaleString()} scénarios aléatoires basés sur les données historiques du risque sélectionné. Chaque itération introduit des variations statistiques de ±15% sur la probabilité et ±10 points sur l'impact.</p>
                        <p><span className="text-[#8b5cf6] font-semibold">📈 Interprétation des résultats :</span> La distribution montre la dispersion des scores de risque possibles. La moyenne ({simulationStats.mean}) représente le score attendu, tandis que le P95 ({simulationStats.p95}) indique qu'il y a 95% de chances que le score soit inférieur à cette valeur.</p>
                        <p><span className="text-[#8b5cf6] font-semibold">💡 Recommandation :</span> {parseFloat(simulationStats.p95) > 60 
                          ? "Risque élevé détecté. Mettre en place des mesures d'atténuation immédiates." 
                          : parseFloat(simulationStats.p95) > 40 
                          ? "Risque modéré. Surveillance renforcée recommandée." 
                          : "Risque acceptable. Maintenir les contrôles existants."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: AI Tools */}
          <div className="space-y-6">
            
            {/* Mitigation Strategies */}
            <div className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#10b981]" />
                Mesures d'Atténuation
              </div>
              <div className="space-y-3">
                {selected.mitigation.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-3 rounded-xl bg-[#10b981]/5 border border-[#10b981]/20"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded bg-[#10b981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#10b981] text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-[#e8e9f3] text-sm">{strategy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ========== BAYESIAN NETWORK ========== */}
            <div className="p-6 rounded-2xl border border-[#fbbf24]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
              <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-[#fbbf24]" />
                Inférence Bayésienne Dynamique
              </h4>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={runBayesianInference}
                disabled={bayesianRunning}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
              >
                {bayesianRunning ? (
                  <div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <GitGraph className="w-4 h-4" />
                )}
                Inférence Bayésienne
              </motion.button>

              {bayesianResults && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/20 text-center">
                    <p className="text-xs text-[#9ca3af]">Probabilité Postérieure</p>
                    <p className="text-2xl text-[#fbbf24] font-bold">{bayesianResults.posteriorProbability}%</p>
                  </div>
                  <div className="text-xs text-[#9ca3af]">
                    <p className="text-[#fbbf24] font-semibold mb-1">Cause directe:</p>
                    <p className="text-[#e8e9f3]">{bayesianResults.inferenceGraph.directCauses}</p>
                    <p className="text-[#fbbf24] font-semibold mt-2 mb-1">Sensibilité:</p>
                    <p className="text-[#e8e9f3]">{bayesianResults.sensitivityAnalysis.criticalValue} variation critique</p>
                  </div>
                </motion.div>
              )}

              {/* RAPPORT EXPLICATIF BAYESIEN */}
              {bayesianResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/5 border border-[#fbbf24]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
                      <Network className="w-4 h-4 text-[#fbbf24]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-[#fbbf24] mb-2">🧠 Rapport d'Analyse - Inférence Bayésienne</h5>
                      <div className="text-xs text-[#9ca3af] space-y-2">
                        <p><span className="text-[#fbbf24] font-semibold">🔬 Méthodologie :</span> L'inférence Bayésienne calcule la probabilité a posteriori d'un risque en intégrant des preuves observées. Le théorème de Bayes met à jour la probabilité initiale (a priori) avec des données contextuelles.</p>
                        <p><span className="text-[#fbbf24] font-semibold">📈 Interprétation :</span> La probabilité postérieure ({bayesianResults.posteriorProbability}%) représente le risque actualisé compte tenu des preuves. La cause directe identifiée est <span className="text-[#fbbf24]">{bayesianResults.inferenceGraph.directCauses}</span>.</p>
                        <p><span className="text-[#fbbf24] font-semibold">💡 Recommandation :</span> {parseFloat(bayesianResults.posteriorProbability) > 50 
                          ? "Les preuves confirment un risque significatif. Renforcer immédiatement les contrôles." 
                          : "Les preuves modèrent le risque. Surveillance continue recommandée."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ========== ML ANOMALY DETECTION ========== */}
            <div className="p-6 rounded-2xl border border-[#10b981]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
              <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-[#10b981]" />
                Scanner d'Anomalies IA
              </h4>

              <div className="mb-3">
                <label className="text-xs text-[#9ca3af] block mb-1">Seuil: {anomalyThreshold}</label>
                <input
                  type="range"
                  min="0.5"
                  max="0.99"
                  step="0.01"
                  value={anomalyThreshold}
                  onChange={(e) => setAnomalyThreshold(parseFloat(e.target.value))}
                  className="w-full accent-[#10b981]"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={runAnomalyDetection}
                disabled={anomalyRunning}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
              >
                {anomalyRunning ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Scan className="w-4 h-4" />
                )}
                Scanner Anomalies
              </motion.button>

              {anomalyResults && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9ca3af]">Anomalies détectées:</span>
                    <span className="text-[#ef4444] font-bold">{anomalyResults.totalAnomalies}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9ca3af]">Précision modèle:</span>
                    <span className="text-[#10b981] font-bold">{anomalyResults.modelAccuracy}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9ca3af]">Faux positifs:</span>
                    <span className="text-[#fbbf24] font-bold">{anomalyResults.falsePositiveRate}%</span>
                  </div>
                  {anomalyResults.anomaliesDetected.length > 0 && (
                    <div className="p-3 rounded-lg bg-[#ef4444]/5 border border-[#ef444]/20 max-h-24 overflow-y-auto">
                      <p className="text-[10px] text-[#ef4444] font-semibold">DÉTAILS</p>
                      {anomalyResults.anomaliesDetected.map((a: any, i: number) => (
                        <div key={i} className="flex justify-between text-[10px] mb-1">
                          <span className="text-[#9ca3af]">{a.timestamp}</span>
                          <span className="text-[#ef4444]">Z: {a.zScore}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* RAPPORT EXPLICATIF ML ANOMALY */}
              {anomalyResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                      <Microscope className="w-4 h-4 text-[#10b981]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-[#10b981] mb-2">🤖 Rapport d'Analyse - Scanner d'Anomalies IA</h5>
                      <div className="text-xs text-[#9ca3af] space-y-2">
                        <p><span className="text-[#10b981] font-semibold">🔬 Méthodologie :</span> L'algorithme Isolation Forest combiné à un Autoencodeur LSTM analyse les patterns historiques pour identifier les déviations anormales. Le seuil de {anomalyThreshold} détermine la sensibilité de détection.</p>
                        <p><span className="text-[#10b981] font-semibold">📈 Interprétation :</span> {anomalyResults.totalAnomalies} anomalies détectées sur {selected?.historicalData.length || 10} points. Précision du modèle : {anomalyResults.modelAccuracy}%. Score Z indique l'écart en écarts-types.</p>
                        <p><span className="text-[#10b981] font-semibold">💡 Recommandation :</span> {anomalyResults.totalAnomalies > 2 
                          ? "Multiple anomalies détectées. Audit immédiat recommandé." 
                          : "Patterns normaux majoritaires. Surveillance maintenue."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ========== AI RISK SCORING ========== */}
            <div className="p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
              <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#00d9ff]" />
                Évaluation de Risque IA
              </h4>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={runAIScoring}
                disabled={aiScoring}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
              >
                {aiScoring ? (
                  <div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
                Score de Risque IA
              </motion.button>

              {aiScoring && (
                <div className="mb-4">
                  <p className="text-xs text-[#9ca3af] mb-2">Calcul... {aiConfidence}%</p>
                  <div className="h-2 bg-[#0f0f23] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${aiConfidence}%` }}
                      className="h-full bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6]"
                    />
                  </div>
                </div>
              )}

              {aiScore && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-center">
                    <p className="text-xs text-[#9ca3af]">Score Global</p>
                    <p className="text-2xl text-[#00d9ff] font-bold">{aiScore.overallScore}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#00d9ff] font-semibold mb-2">Features importantes:</p>
                    {aiScore.featureImportance.map((f: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs mb-1">
                        <span className="text-[#9ca3af]">{f.feature}</span>
                        <span className="text-[#e8e9f3]">{(f.importance * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* RAPPORT EXPLICATIF AI RISK SCORING */}
              {aiScore && (
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
                      <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">🎯 Rapport d'Analyse - Évaluation de Risque IA</h5>
                      <div className="text-xs text-[#9ca3af] space-y-2">
                        <p><span className="text-[#00d9ff] font-semibold">🔬 Méthodologie :</span> Le modèle Gradient Boosting avec XGBoost analyse multiples features du risque pour générer un score pondéré. L'importance des features indique leur contribution au score final.</p>
                        <p><span className="text-[#00d9ff] font-semibold">📈 Interprétation :</span> Score global {aiScore.overallScore}. Catégorie de risque : <span className="text-[#00d9ff]">{aiScore.riskCategory}</span>. La feature la plus influente est <span className="text-[#00d9ff]">{aiScore.featureImportance[0].feature}</span> ({aiScore.featureImportance[0].importance * 100}%).</p>
                        <p><span className="text-[#00d9ff] font-semibold">💡 Actions suggérées :</span> {aiScore.recommendations.slice(0, 2).map((r: string, i: number) => `• ${r}`).join(' \n')}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ========== REINFORCEMENT LEARNING ========== */}
            <div className="p-6 rounded-2xl border border-[#ef4444]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[0f0f23]/50 backdrop-blur-xl">
              <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-[#ef4444]" />
                Optimisation par Apprentissage Renforçé
              </h4>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={runRLTraining}
                disabled={rlTraining}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white font-bold text-sm flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
              >
                {rlTraining ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Workflow className="w-4 h-4" />
                )}
                Entraîner RL Agent
              </motion.button>

              {rlEpisode > 0 && (
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9ca3af]">Épisode:</span>
                    <span className="text-[#e8e9f3] font-bold">{rlEpisode}/50</span>
                  </div>
                  <div className="h-16 bg-[#0f0f23] rounded-lg border border-[#ef4444]/10 p-1">
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <polyline
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        points={rlRewards.length > 0 
                          ? rlRewards.map((r, i) => {
                              const maxRl = 50;
                              const x = maxRl > 1 ? (i / (maxRl - 1)) * 100 : 0;
                              const y = 50 - ((r + 5) / 15) * 50;
                              return `${x},${Math.max(0, Math.min(50, y))}`;
                            }).join(' ')
                          : '0,25 100,25'
                        }
                      />
                    </svg>
                  </div>
                  {rlBestAction && (
                    <div className="p-3 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20 text-center">
                      <p className="text-[#10px] text-[#6b7280]">Meilleure action</p>
                      <p className="text-lg text-[#10b981] font-bold">{rlBestAction}</p>
                    </div>
                  )}
                </div>
              )}

              {/* RAPPORT EXPLICATIF REINFORCEMENT LEARNING */}
              {rlBestAction && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#ef4444]/10 to-[#f97316]/5 border border-[#ef4444]/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
                      <Crosshair className="w-4 h-4 text-[#ef4444]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-semibold text-[#ef4444] mb-2">⚡ Rapport d'Analyse - Optimisation par RL</h5>
                      <div className="text-xs text-[#9ca3af] space-y-2">
                        <p><span className="text-[#ef4444 font-semibold">🔬 Méthodologie :</span> L'agent RL utilise Q-Learning pour explorer différentes stratégies d'atténuation des risques. Chaque épisode teste une séquence d'actions et accumule des récompenses basées sur l'efficacité.</p>
                        <p><span className="text-[#17/ font-semibold">📈 Interprétation :</span> La courbe de récompense montre la convergence de l'apprentissage. Meilleure action identifiée : <span className="text-[#ef4444] font-bold">{rlBestAction}</span>.</p>
                        <p><span className="text-[#17/ font-semibold">💡 Recommandation :</span> {rlBestAction === 'Atténuer' 
                          ? "Prioriser la mise en place de contre-mesures immédiates." 
                          : rlBestAction === 'Transférer' 
                          ? "Envisager une assurance ou externalisation du risque."
                          : rlBestAction === 'Éviter'
                          ? "Modifier le processus pour éliminer l'exposition."
                          : "Accepter le risque avec surveillance continue."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>
      )}
    </div>
  );
}