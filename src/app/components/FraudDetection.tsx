import { motion } from 'motion/react';
import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Brain } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function FraudDetection() {
  const [detectionMode, setDetectionMode] = useState('realtime');

  const fraudStats = [
    { label: 'Demandes Analysées', value: '12,547', change: '+15.2%', icon: Eye, color: '#00d9ff' },
    { label: 'Fraudes Détectées', value: '142', change: '-23.5%', icon: AlertTriangle, color: '#ef4444' },
    { label: 'Taux de Précision', value: '97.8%', change: '+2.1%', icon: Brain, color: '#10b981' },
    { label: 'Faux Positifs', value: '23', change: '-8.3%', icon: XCircle, color: '#fbbf24' }
  ];

  const fraudTypeData = [
    { name: 'Identité', value: 45, color: '#ef4444' },
    { name: 'Paiement', value: 32, color: '#f97316' },
    { name: 'Accès', value: 28, color: '#fbbf24' },
    { name: 'Données', value: 18, color: '#8b5cf6' },
    { name: 'Autres', value: 19, color: '#9ca3af' }
  ];

  const detectionTrend = [
    { day: 'Lun', detected: 18, blocked: 16, false_positive: 2 },
    { day: 'Mar', detected: 22, blocked: 20, false_positive: 2 },
    { day: 'Mer', detected: 15, blocked: 14, false_positive: 1 },
    { day: 'Jeu', detected: 25, blocked: 23, false_positive: 2 },
    { day: 'Ven', detected: 20, blocked: 19, false_positive: 1 },
    { day: 'Sam', detected: 19, blocked: 17, false_positive: 2 },
    { day: 'Dim', detected: 23, blocked: 22, false_positive: 1 }
  ];

  const suspiciousActivities = [
    {
      id: 1,
      type: 'Tentative accès non autorisé',
      user: 'user_4523',
      risk: 'critical',
      score: 94,
      time: '2 min',
      location: 'IP: 192.168.x.x (Nigeria)',
      pattern: 'Multiple tentatives échouées + VPN suspect'
    },
    {
      id: 2,
      type: 'Transaction inhabituelle',
      user: 'user_8912',
      risk: 'high',
      score: 87,
      time: '15 min',
      location: 'IP: 10.0.x.x (Russie)',
      pattern: 'Montant élevé + nouvel appareil'
    },
    {
      id: 3,
      type: 'Comportement anormal',
      user: 'user_2341',
      risk: 'medium',
      score: 72,
      time: '1h',
      location: 'IP: 172.16.x.x (Chine)',
      pattern: 'Activité nocturne + changement de géolocalisation'
    },
    {
      id: 4,
      type: 'Données sensibles consultées',
      user: 'user_7654',
      risk: 'high',
      score: 85,
      time: '2h',
      location: 'IP: 192.168.x.x (Pakistan)',
      pattern: 'Extraction massive + compte récent'
    }
  ];

  const mlModelMetrics = [
    { metric: 'Précision', value: '97.8%', color: '#10b981' },
    { metric: 'Rappel', value: '95.3%', color: '#00d9ff' },
    { metric: 'F1-Score', value: '96.5%', color: '#8b5cf6' },
    { metric: 'AUC-ROC', value: '0.982', color: '#fbbf24' }
  ];

  const customTooltipStyle = {
    backgroundColor: 'rgba(15, 15, 35, 0.9)',
    border: '1px solid #00d9ff',
    borderRadius: '12px',
    color: '#e8e9f3'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl border border-[#ef4444]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#e8e9f3] mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
            <Shield className="w-8 h-8 text-[#ef4444]" />
            Sécurité & Anti-Fraude
          </h2>
          <p className="text-[#9ca3af]">Système de détection intelligent alimenté par Machine Learning</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={detectionMode}
            onChange={(e) => setDetectionMode(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0f0f23]/60 border border-[#ef4444]/20 text-[#e8e9f3] focus:outline-none focus:border-[#ef4444]/50 cursor-pointer"
          >
            <option value="realtime">Temps Réel</option>
            <option value="batch">Analyse par Lots</option>
            <option value="manual">Révision Manuelle</option>
          </select>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 w-full sm:w-auto justify-center">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-sm font-semibold text-[#10b981]">Actif</span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fraudStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <span
                className="text-sm font-semibold px-2 py-1 rounded-lg"
                style={{
                  color: stat.change.startsWith('-') ? '#10b981' : stat.change.startsWith('+') ? '#ef4444' : '#9ca3af',
                  backgroundColor: stat.change.startsWith('-')
                    ? 'rgba(16, 185, 129, 0.1)'
                    : stat.change.startsWith('+')
                    ? 'rgba(239, 68, 68, 0.1)'
                    : 'rgba(156, 163, 175, 0.1)'
                }}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Typologie des Menaces
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fraudTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fraudTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Detection Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Volume des Alertes
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detectionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Legend wrapperStyle={{ color: '#9ca3af' }} />
                <Bar dataKey="detected" name="Détectées" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="blocked" name="Bloquées" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="false_positive" name="Faux Positifs" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ML Model Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Brain className="w-6 h-6 text-[#8b5cf6]" />
          Fiabilité de l'IA
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mlModelMetrics.map((metric, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10 text-center">
              <p className="text-xs text-[#9ca3af] mb-2">{metric.metric}</p>
              <p className="text-2xl font-bold" style={{ color: metric.color }}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
          <p className="text-sm text-[#8b5cf6]">
            💡 <strong>Modèle:</strong> Random Forest + Deep Learning (dernière mise à jour: Aujourd'hui) • <strong>Dataset:</strong> 2.4M transactions • <strong>Retraining:</strong> Automatique hebdomadaire
          </p>
        </div>
      </motion.div>

      {/* Suspicious Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <AlertTriangle className="w-6 h-6 text-[#ef4444]" />
          Incidents Détectés
        </h3>
        <div className="space-y-4">
          {suspiciousActivities.map((activity) => (
            <div
              key={activity.id}
              className={`p-5 rounded-xl border backdrop-blur-sm transition-all hover:border-opacity-50 ${
                activity.risk === 'critical'
                  ? 'bg-[#ef4444]/5 border-[#ef4444]/20'
                  : activity.risk === 'high'
                  ? 'bg-[#f97316]/5 border-[#f97316]/20'
                  : 'bg-[#fbbf24]/5 border-[#fbbf24]/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        activity.risk === 'critical'
                          ? 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/20'
                          : activity.risk === 'high'
                          ? 'bg-[#f97316]/20 text-[#f97316] border-[#f97316]/20'
                          : 'bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/20'
                      }`}
                    >
                      {activity.risk === 'critical' ? 'CRITIQUE' : activity.risk === 'high' ? 'ÉLEVÉ' : 'MOYEN'}
                    </span>
                    <span className="text-xs text-[#9ca3af]">{activity.time}</span>
                  </div>
                  <h4 className="text-[#e8e9f3] font-semibold mb-2">{activity.type}</h4>
                  <div className="space-y-1 text-sm text-[#9ca3af]">
                    <p>Utilisateur: <span className="text-[#e8e9f3] font-mono">{activity.user}</span></p>
                    <p>Localisation: <span className="text-[#e8e9f3]">{activity.location}</span></p>
                    <p className="text-xs">Pattern: <span className="text-[#e8e9f3] italic">{activity.pattern}</span></p>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-0 w-full sm:w-auto justify-between sm:justify-center">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor:
                        activity.risk === 'critical'
                          ? 'rgba(239, 68, 68, 0.1)'
                          : activity.risk === 'high'
                          ? 'rgba(249, 115, 22, 0.1)'
                          : 'rgba(251, 191, 36, 0.1)',
                      borderColor: activity.risk === 'critical' ? '#ef4444' : activity.risk === 'high' ? '#f97316' : '#fbbf24'
                    }}
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{
                        color:
                          activity.risk === 'critical' ? '#ef4444' : activity.risk === 'high' ? '#f97316' : '#fbbf24'
                      }}
                    >
                      {activity.score}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider">Score ML</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Bloquer
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approuver
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-[#00d9ff]/10 text-[#00d9ff] hover:bg-[#00d9ff]/20 transition-colors text-sm font-semibold">
                  Analyser
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}