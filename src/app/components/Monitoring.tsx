import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, Cpu, Database, HardDrive, Wifi, AlertCircle, CheckCircle,
  // Nouvelles icônes AI
  Brain, Sparkles, Zap, TrendingUp, TrendingDown, BarChart3,
  LineChart, PieChart, GitGraph, Network, Microscope, Scan,
  Bot, Shield, AlertTriangle, Bell, BellOff, Filter, Gauge,
  Thermometer, Clock, Server, Radio, Eye, Crosshair, Workflow,
  Layers, Search, Bug, RefreshCw, Terminal
} from 'lucide-react';
// Import pour le nouveau monitoring
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Monitoring() {
  // --- AI MONITORING STATE ---
  const [activeAITool, setActiveAITool] = useState<string>('anomaly');
  
  // --- ANOMALY DETECTION STATE ---
  const [anomalyScanning, setAnomalyScanning] = useState(false);
  const [anomalyResults, setAnomalyResults] = useState<any>(null);
  
  // --- PERFORMANCE PREDICTION STATE ---
  const [predicting, setPredicting] = useState(false);
  const [predictionResults, setPredictionResults] = useState<any>(null);
  
  // --- LOG ANALYSIS STATE ---
  const [logAnalyzing, setLogAnalyzing] = useState(false);
  const [logResults, setLogResults] = useState<any>(null);
  
  // --- HEALTH SCORE STATE ---
  const [healthCalculating, setHealthCalculating] = useState(false);
  const [healthScore, setHealthScore] = useState<any>(null);

  const systemMetrics = [
    { label: 'CPU Usage', value: '34%', status: 'healthy', icon: Cpu, color: '#10b981', historical: [28, 30, 32, 35, 33, 34, 31, 29, 34, 32] },
    { label: 'Memory', value: '2.4GB / 8GB', status: 'healthy', icon: HardDrive, color: '#00d9ff', historical: [2.1, 2.2, 2.3, 2.5, 2.3, 2.4, 2.2, 2.1, 2.4, 2.3] },
    { label: 'Database', value: 'Connected', status: 'healthy', icon: Database, color: '#8b5cf6', historical: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1] },
    { label: 'Network', value: '45ms', status: 'healthy', icon: Wifi, color: '#fbbf24', historical: [42, 44, 46, 48, 45, 43, 47, 44, 45, 46] }
  ];

  const agentLogs = [
    { time: '14:32:15', agent: 'Analyste', action: 'Data processing completed', status: 'success' },
    { time: '14:30:42', agent: 'Optimiseur', action: 'Resource allocation optimized', status: 'success' },
    { time: '14:28:11', agent: 'Prédicteur', action: 'Forecast model updated', status: 'success' },
    { time: '14:25:33', agent: 'Critique', action: 'Quality check passed', status: 'success' },
    { time: '14:22:08', agent: 'Analyste', action: 'Anomaly detected in dataset', status: 'warning' },
    { time: '14:18:45', agent: 'Optimiseur', action: 'Budget threshold exceeded', status: 'warning' },
    { time: '14:15:22', agent: 'Système', action: 'Connection timeout on replica set', status: 'error' },
    { time: '14:12:10', agent: 'Sécurité', action: 'Multiple failed login attempts', status: 'error' }
  ];

  const mongodbStatus = {
    host: '127.0.0.1:27017',
    cluster: 'Standalone',
    edition: 'MongoDB 7.0.11 Community',
    databases: 9,
    collections: 22,
    status: 'Connected',
    uptime: '48h 32m'
  };

  // ========== AI: ANOMALY DETECTION ==========
  const runAnomalyDetection = async () => {
    setAnomalyScanning(true);
    setAnomalyResults(null);
    
    await new Promise(r => setTimeout(r, 3000));
    
    setAnomalyResults({
      scanDuration: '2.4s',
      metricsAnalyzed: 478,
      anomaliesDetected: 3,
      anomalies: [
        { metric: 'CPU Usage', time: '14:22:08', value: '92%', expected: '30-40%', severity: 'Élevé', zScore: '4.2σ' },
        { metric: 'Memory', time: '14:15:22', value: '7.2GB', expected: '2-3GB', severity: 'Critique', zScore: '5.8σ' },
        { metric: 'Network Latency', time: '14:10:05', value: '320ms', expected: '40-50ms', severity: 'Moyen', zScore: '3.1σ' }
      ],
      model: 'Isolation Forest + LSTM Autoencoder',
      falsePositiveRate: '1.2%',
      detectionLatency: '150ms'
    });
    
    setAnomalyScanning(false);
  };

  // ========== AI: PERFORMANCE PREDICTION ==========
  const runPerformancePrediction = async () => {
    setPredicting(true);
    setPredictionResults(null);
    
    await new Promise(r => setTimeout(r, 3500));
    
    setPredictionResults({
      model: 'Prophet + XGBoost',
      forecastHorizon: '24h',
      predictions: [
        { time: '+4h', cpu: 38, memory: 2.6, latency: 48, risk: 'Faible' },
        { time: '+8h', cpu: 45, memory: 3.1, latency: 52, risk: 'Faible' },
        { time: '+12h', cpu: 62, memory: 4.2, latency: 78, risk: 'Moyen' },
        { time: '+16h', cpu: 78, memory: 5.8, latency: 145, risk: 'Élevé' },
        { time: '+20h', cpu: 88, memory: 6.9, latency: 230, risk: 'Critique' },
        { time: '+24h', cpu: 95, memory: 7.5, latency: 450, risk: 'Critique' }
      ],
      recommendations: [
        'Planifier scale-out avant +12h',
        'Augmenter pool connexions DB',
        'Activer cache Redis supplémentaire'
      ],
      accuracy: '91.5%',
      mae: '3.2%'
    });
    
    setPredicting(false);
  };

  // ========== AI: LOG ANALYSIS ==========
  const runLogAnalysis = async () => {
    setLogAnalyzing(true);
    setLogResults(null);
    
    await new Promise(r => setTimeout(r, 2500));
    
    setLogResults({
      totalLogs: '45,230',
      timeRange: '24h',
      patterns: [
        { pattern: 'Connection timeout [DB]', occurrences: 47, trend: 'En hausse', firstSeen: '08:15', lastSeen: '14:32' },
        { pattern: 'Memory allocation warning', occurrences: 23, trend: 'Stable', firstSeen: '06:00', lastSeen: '14:28' },
        { pattern: 'Slow query > 500ms', occurrences: 156, trend: 'En hausse', firstSeen: '00:00', lastSeen: '14:30' },
        { pattern: 'Auth failure [API]', occurrences: 89, trend: 'Pic', firstSeen: '12:00', lastSeen: '14:15' }
      ],
      errorRate: '2.3%',
      topErrorSource: 'Database Connection Pool',
      clusteringMethod: 'DBSCAN + Sentence-BERT',
      clustersFound: 8
    });
    
    setLogAnalyzing(false);
  };

  // ========== AI: HEALTH SCORE ==========
  const calculateHealthScore = async () => {
    setHealthCalculating(true);
    setHealthScore(null);
    
    await new Promise(r => setTimeout(r, 2000));
    
    setHealthScore({
      overall: 87,
      components: [
        { name: 'CPU', score: 92, status: 'Excellent', icon: Cpu, color: '#10b981' },
        { name: 'Memory', score: 78, status: 'Bon', icon: HardDrive, color: '#00d9ff' },
        { name: 'Database', score: 95, status: 'Excellent', icon: Database, color: '#8b5cf6' },
        { name: 'Network', score: 85, status: 'Bon', icon: Wifi, color: '#fbbf24' },
        { name: 'Security', score: 72, status: 'Attention', icon: Shield, color: '#f97316' },
        { name: 'Storage', score: 88, status: 'Bon', icon: HardDrive, color: '#10b981' }
      ],
      slaCompliance: '99.97%',
      recommendations: [
        'Audit de sécurité recommandé',
        'Optimisation mémoire planifiée',
        'Mise à jour des certificats'
      ]
    });
    
    setHealthCalculating(false);
  };

  const aiTools = [
    { id: 'anomaly', name: 'Détection Anomalies', icon: Search, color: '#ef4444' },
    { id: 'prediction', name: 'Prédiction Performance', icon: TrendingUp, color: '#8b5cf6' },
    { id: 'logs', name: 'Analyse Logs', icon: Terminal, color: '#fbbf24' },
    { id: 'health', name: 'Score de Santé', icon: Gauge, color: '#10b981' }
  ];

  // --- NOUVELLES DONNÉES AJOUTÉES ---
  const cpuData = [
    { time: '00:00', value: 45 },
    { time: '04:00', value: 52 },
    { time: '08:00', value: 68 },
    { time: '12:00', value: 75 },
    { time: '16:00', value: 62 },
    { time: '20:00', value: 48 }
  ];

  const newSystemMetrics = [
    { name: 'CPU Usage', value: 68, max: 100, icon: Cpu, color: '#00d9ff', status: 'Normal' },
    { name: 'Memory', value: 72, max: 100, icon: Server, color: '#8b5cf6', status: 'Normal' },
    { name: 'Disk I/O', value: 45, max: 100, icon: HardDrive, color: '#fbbf24', status: 'Optimal' },
    { name: 'Network', value: 89, max: 100, icon: Wifi, color: '#10b981', status: 'Élevé' }
  ];

  const alerts = [
    { id: 1, type: 'Warning', message: 'Utilisation CPU élevée sur Agent Optimiseur', time: '5 min', severity: 'medium' },
    { id: 2, type: 'Info', message: 'Mise à jour système planifiée à 02:00', time: '1h', severity: 'low' },
    { id: 3, type: 'Critical', message: 'Pic de latence détecté sur API externe', time: '2h', severity: 'high' }
  ];

  return (
    <div className="space-y-6">
      {/* System Metrics Existants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}20` }}>
                <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>
              <CheckCircle className="w-5 h-5 text-[#10b981]" />
            </div>
            <p className="text-[#9ca3af] text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>{metric.label}</p>
            <p className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{metric.value}</p>
            {/* Mini sparkline */}
            <div className="mt-3 h-6 flex items-end gap-[1px]">
              {metric.historical.map((val: number, i: number) => {
                const maxVal = Math.max(...metric.historical.map(v => typeof v === 'number' ? v : 0));
                const height = maxVal > 0 ? (val / maxVal) * 100 : 50;
                return (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${height}%`, backgroundColor: metric.color, opacity: 0.6 }} />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nouveaux System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newSystemMetrics.map((metric, i) => (
          <motion.div
            key={`new-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>
              <span
                className="text-xs px-2 py-1 rounded-lg font-semibold"
                style={{
                  color: metric.value > 80 ? '#ef4444' : metric.value > 60 ? '#fbbf24' : '#10b981',
                  backgroundColor:
                    metric.value > 80
                      ? 'rgba(239, 68, 68, 0.1)'
                      : metric.value > 60
                      ? 'rgba(251, 191, 36, 0.1)'
                      : 'rgba(16, 185, 129, 0.1)'
                }}
              >
                {metric.status}
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-2">{metric.name}</p>
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-3xl font-bold text-[#e8e9f3]">{metric.value}%</p>
              <p className="text-sm text-[#9ca3af]">/ {metric.max}%</p>
            </div>
            <div className="h-2 bg-[#0f0f23] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: metric.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* MongoDB Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 flex items-center justify-center">
            <Database className="w-6 h-6 text-[#10b981]" />
          </div>
          <div>
            <h3 className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>État de la Base</h3>
            <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>Connection Info & Stats</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-[#9ca3af] text-sm mb-1">Host</p>
            <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{mongodbStatus.host}</p>
          </div>
          <div>
            <p className="text-[#9ca3af] text-sm mb-1">Cluster</p>
            <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{mongodbStatus.cluster}</p>
          </div>
          <div>
            <p className="text-[#9ca3af] text-sm mb-1">Edition</p>
            <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{mongodbStatus.edition}</p>
          </div>
          <div>
            <p className="text-[#9ca3af] text-sm mb-1">Databases</p>
            <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{mongodbStatus.databases}</p>
          </div>
          <div>
            <p className="text-[#9ca3af] text-sm mb-1">Collections</p>
            <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{mongodbStatus.collections}</p>
          </div>
          <div>
            <p className="text-[#9ca3af] text-sm mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <p className="text-[#10b981] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{mongodbStatus.status}</p>
            </div>
          </div>
          <div>
            <p className="text-[#9ca3af] text-sm mb-1">Uptime</p>
            <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{mongodbStatus.uptime}</p>
          </div>
        </div>
      </motion.div>

      {/* Nouveau CPU Usage Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Tendance de Charge
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ReLineChart data={cpuData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f0f23',
                border: '1px solid #00d9ff',
                borderRadius: '12px'
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#00d9ff" strokeWidth={3} dot={{ fill: '#00d9ff', r: 6 }} />
          </ReLineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Activity Logs + AI Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Activity Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#00d9ff]/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#00d9ff]" />
            </div>
            <h3 className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>Journal d'Activité</h3>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {agentLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {log.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-[#10b981]" />
                    ) : log.status === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-[#fbbf24]" />
                    )}
                    <span className="text-[#9ca3af] text-sm font-mono">{log.time}</span>
                  </div>
                  <div className="w-px h-8 bg-[#00d9ff]/20" />
                  <div>
                    <p className="text-[#00d9ff] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{log.agent}</p>
                    <p className="text-[#9ca3af] text-sm">{log.action}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                  log.status === 'success' ? 'bg-[#10b981]/10 text-[#10b981]' :
                  log.status === 'error' ? 'bg-[#ef4444]/10 text-[#ef4444]' :
                  'bg-[#fbbf24]/10 text-[#fbbf24]'
                }`} style={{ fontFamily: 'var(--font-body)' }}>
                  {log.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== AI MONITORING TOOLS ========== */}
        <div className="space-y-4">
          
          {/* AI Tool Selector */}
          <div className="grid grid-cols-4 gap-2">
            {aiTools.map((tool) => (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveAITool(tool.id)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  activeAITool === tool.id
                    ? 'border-[#00d9ff] bg-[#00d9ff]/10 shadow-lg shadow-[#00d9ff]/5'
                    : 'border-[#00d9ff]/20 bg-[#0f0f23]/40 hover:border-[#00d9ff]/40'
                }`}
              >
                <tool.icon className="w-4 h-4 mx-auto mb-1" style={{ color: tool.color }} />
                <p className="text-[10px] text-[#e8e9f3] font-semibold">{tool.name.split(' ')[0]}</p>
              </motion.button>
            ))}
          </div>

          {/* AI Tool Content */}
          <div className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl min-h-[400px]">

            {/* ANOMALY DETECTION */}
            {activeAITool === 'anomaly' && (
              <div>
                <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#ef4444]" />
                  Détection d'Anomalies en Temps Réel
                </h4>

                <motion.button whileTap={{ scale: 0.95 }} onClick={runAnomalyDetection} disabled={anomalyScanning}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white font-bold text-sm flex items-center justify-center gap-2 mb-6 disabled:opacity-50 shadow-lg shadow-[#ef4444]/20">
                  {anomalyScanning ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Scan en cours...</>
                  ) : (
                    <><Scan className="w-4 h-4" />Scanner les Métriques</>
                  )}
                </motion.button>

                {anomalyResults && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Métriques</p>
                        <p className="text-lg text-[#e8e9f3] font-bold">{anomalyResults.metricsAnalyzed}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Anomalies</p>
                        <p className="text-lg text-[#ef4444] font-bold">{anomalyResults.anomaliesDetected}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Faux Positifs</p>
                        <p className="text-lg text-[#10b981] font-bold">{anomalyResults.falsePositiveRate}</p>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {anomalyResults.anomalies.map((a: any, i: number) => (
                        <div key={i} className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#e8e9f3] font-semibold">{a.metric}</span>
                            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                              a.severity === 'Critique' ? 'bg-[#ef4444]/20 text-[#ef4444]' :
                              a.severity === 'Élevé' ? 'bg-[#f97316]/20 text-[#f97316]' :
                              'bg-[#fbbf24]/20 text-[#fbbf24]'
                            }`}>{a.severity}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-[#6b7280]">Valeur: </span>
                              <span className="text-[#ef4444]">{a.value}</span>
                            </div>
                            <div>
                              <span className="text-[#6b7280]">Z-Score: </span>
                              <span className="text-[#e8e9f3]">{a.zScore}</span>
                            </div>
                            <div>
                              <span className="text-[#6b7280]">Attendu: </span>
                              <span className="text-[#9ca3af]">{a.expected}</span>
                            </div>
                            <div>
                              <span className="text-[#6b7280]">Heure: </span>
                              <span className="text-[#9ca3af]">{a.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* PERFORMANCE PREDICTION */}
            {activeAITool === 'prediction' && (
              <div>
                <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#8b5cf6]" />
                  Prédiction de Performance
                </h4>

                <motion.button whileTap={{ scale: 0.95 }} onClick={runPerformancePrediction} disabled={predicting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold text-sm flex items-center justify-center gap-2 mb-6 disabled:opacity-50 shadow-lg shadow-[#8b5cf6]/20">
                  {predicting ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Prédiction en cours...</>
                  ) : (
                    <><Brain className="w-4 h-4" />Prédire Performance (24h)</>
                  )}
                </motion.button>

                {predictionResults && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="text-[#9ca3af]">Modèle: {predictionResults.model}</span>
                      <span className="text-[#10b981] font-bold">Précision: {predictionResults.accuracy}</span>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {predictionResults.predictions.map((p: any, i: number) => (
                        <div key={i} className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#e8e9f3] font-semibold">{p.time}</span>
                            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                              p.risk === 'Critique' ? 'bg-[#ef4444]/20 text-[#ef4444]' :
                              p.risk === 'Élevé' ? 'bg-[#f97316]/20 text-[#f97316]' :
                              p.risk === 'Moyen' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' :
                              'bg-[#10b981]/20 text-[#10b981]'
                            }`}>{p.risk}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-[10px]">
                            <div><span className="text-[#6b7280]">CPU: </span><span className="text-[#e8e9f3]">{p.cpu}%</span></div>
                            <div><span className="text-[#6b7280]">RAM: </span><span className="text-[#e8e9f3]">{p.memory}GB</span></div>
                            <div><span className="text-[#6b7280]">Latence: </span><span className="text-[#e8e9f3]">{p.latency}ms</span></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20">
                      <p className="text-xs text-[#10b981] font-semibold mb-2">Recommandations:</p>
                      {predictionResults.recommendations.map((r: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#9ca3af] mb-1">
                          <div className="w-1 h-1 rounded-full bg-[#10b981]" />
                          {r}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* LOG ANALYSIS */}
            {activeAITool === 'logs' && (
              <div>
                <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#fbbf24]" />
                  Analyse Intelligente des Logs
                </h4>

                <motion.button whileTap={{ scale: 0.95 }} onClick={runLogAnalysis} disabled={logAnalyzing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2 mb-6 disabled:opacity-50 shadow-lg shadow-[#fbbf24]/20">
                  {logAnalyzing ? (
                    <><div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" />Analyse en cours...</>
                  ) : (
                    <><Microscope className="w-4 h-4" />Analyser les Logs</>
                  )}
                </motion.button>

                {logResults && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Logs analysés</p>
                        <p className="text-lg text-[#e8e9f3] font-bold">{logResults.totalLogs}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Clusters</p>
                        <p className="text-lg text-[#10b981] font-bold">{logResults.clustersFound}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10 text-center">
                        <p className="text-[10px] text-[#6b7280]">Taux erreur</p>
                        <p className="text-lg text-[#ef4444] font-bold">{logResults.errorRate}</p>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {logResults.patterns.map((p: any, i: number) => (
                        <div key={i} className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#e8e9f3] font-semibold truncate w-40">{p.pattern}</span>
                            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                              p.trend === 'En hausse' ? 'bg-[#ef4444]/20 text-[#ef4444]' :
                              p.trend === 'Pic' ? 'bg-[#f97316]/20 text-[#f97316]' :
                              'bg-[#10b981]/20 text-[#10b981]'
                            }`}>{p.trend}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-[#6b7280]">{p.occurrences} occurrences</span>
                            <span className="text-[#9ca3af]">{p.firstSeen} → {p.lastSeen}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* HEALTH SCORE */}
            {activeAITool === 'health' && (
              <div>
                <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-[#10b981]" />
                  Score de Santé du Système
                </h4>

                <motion.button whileTap={{ scale: 0.95 }} onClick={calculateHealthScore} disabled={healthCalculating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-sm flex items-center justify-center gap-2 mb-6 disabled:opacity-50 shadow-lg shadow-[#10b981]/20">
                  {healthCalculating ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Calcul en cours...</>
                  ) : (
                    <><Gauge className="w-4 h-4" />Calculer le Score</>
                  )}
                </motion.button>

                {healthScore && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#10b981]/20 text-center">
                      <p className="text-[10px] text-[#6b7280] mb-2">SCORE GLOBAL</p>
                      <div className="relative inline-flex items-center justify-center">
                        <svg className="w-24 h-24">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="#0f0f23" strokeWidth="8" />
                          <motion.circle cx="48" cy="48" r="40" fill="none" stroke="#10b981" strokeWidth="8"
                            strokeLinecap="round" initial={{ strokeDasharray: "0 251" }}
                            animate={{ strokeDasharray: `${(healthScore.overall / 100) * 251} 251` }}
                            transition={{ duration: 1.5 }}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                          />
                        </svg>
                        <span className="absolute text-2xl text-[#e8e9f3] font-bold">{healthScore.overall}</span>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {healthScore.components.map((c: any, i: number) => {
                        const IconComponent = c.icon;
                        return (
                          <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                            <IconComponent className="w-4 h-4" style={{ color: c.color }} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-[#e8e9f3]">{c.name}</span>
                                <span className="text-xs text-[#e8e9f3] font-bold">{c.score}/100</span>
                              </div>
                              <div className="h-1.5 bg-[#0f0f23] rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${c.score}%` }}
                                  className="h-full rounded-full" style={{ backgroundColor: c.color }} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#9ca3af]">SLA Compliance:</span>
                      <span className="text-[#10b981] font-bold">{healthScore.slaCompliance}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20">
                      <p className="text-xs text-[#10b981] font-semibold mb-2">Recommandations:</p>
                      {healthScore.recommendations.map((r: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#9ca3af] mb-1">
                          <div className="w-1 h-1 rounded-full bg-[#10b981]" />
                          {r}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nouveaux Alertes Système */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <AlertTriangle className="w-6 h-6 text-[#fbbf24]" />
          Centre d'Alertes
        </h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border ${
                alert.severity === 'high'
                  ? 'bg-[#ef4444]/5 border-[#ef4444]/20'
                  : alert.severity === 'medium'
                  ? 'bg-[#fbbf24]/5 border-[#fbbf24]/20'
                  : 'bg-[#00d9ff]/5 border-[#00d9ff]/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{
                      color: alert.severity === 'high' ? '#ef4444' : alert.severity === 'medium' ? '#fbbf24' : '#00d9ff'
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-lg font-semibold"
                        style={{
                          color:
                            alert.severity === 'high' ? '#ef4444' : alert.severity === 'medium' ? '#fbbf24' : '#00d9ff',
                          backgroundColor:
                            alert.severity === 'high'
                              ? 'rgba(239, 68, 68, 0.1)'
                              : alert.severity === 'medium'
                              ? 'rgba(251, 191, 36, 0.1)'
                              : 'rgba(0, 217, 255, 0.1)'
                        }}
                      >
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-sm text-[#e8e9f3]">{alert.message}</p>
                  </div>
                </div>
                <span className="text-xs text-[#9ca3af]">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}