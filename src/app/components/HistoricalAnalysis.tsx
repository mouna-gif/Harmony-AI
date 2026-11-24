import { motion } from 'motion/react';
import { useState } from 'react';
import { Database, Filter, Download, RefreshCw } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

export default function HistoricalAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [isCleaningData, setIsCleaningData] = useState(false);

  const historicalData = [
    { date: '01/04', decisions: 145, errors: 12, performance: 87, cleaned: 140 },
    { date: '05/04', decisions: 167, errors: 8, performance: 91, cleaned: 162 },
    { date: '09/04', decisions: 189, errors: 15, performance: 85, cleaned: 180 },
    { date: '13/04', decisions: 210, errors: 6, performance: 94, cleaned: 206 },
    { date: '17/04', decisions: 198, errors: 10, performance: 89, cleaned: 192 },
    { date: '21/04', decisions: 225, errors: 5, performance: 96, cleaned: 222 },
    { date: '25/04', decisions: 234, errors: 7, performance: 93, cleaned: 230 },
    { date: '29/04', decisions: 247, errors: 4, performance: 97, cleaned: 245 }
  ];

  const dataQualityMetrics = [
    { label: 'Données Nettoyées', value: '1,247', percentage: '94.2%', color: '#10b981' },
    { label: 'Anomalies Détectées', value: '67', percentage: '5.1%', color: '#fbbf24' },
    { label: 'Données Corrompues', value: '9', percentage: '0.7%', color: '#ef4444' },
    { label: 'Taux de Qualité', value: '94.2%', percentage: '+2.3%', color: '#00d9ff' }
  ];

  const cleaningActions = [
    { action: 'Suppression doublons', count: 245, time: '12ms', status: 'completed' },
    { action: 'Correction valeurs manquantes', count: 89, time: '45ms', status: 'completed' },
    { action: 'Normalisation formats', count: 412, time: '78ms', status: 'completed' },
    { action: 'Détection outliers', count: 34, time: '156ms', status: 'in_progress' }
  ];

  const handleDataCleaning = () => {
    setIsCleaningData(true);
    setTimeout(() => {
      setIsCleaningData(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#e8e9f3] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Analyse Historique & Nettoyage de Données
          </h2>
          <p className="text-[#9ca3af]">Explorez les tendances et optimisez la qualité des données</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] focus:outline-none focus:border-[#00d9ff]/50 cursor-pointer"
          >
            <option value="7d">7 jours</option>
            <option value="30d">30 jours</option>
            <option value="90d">90 jours</option>
            <option value="1y">1 an</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDataCleaning}
            disabled={isCleaningData}
            className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${isCleaningData ? 'animate-spin' : ''}`} />
            {isCleaningData ? 'Nettoyage...' : 'Nettoyer Données'}
          </motion.button>
        </div>
      </motion.div>

      {/* Data Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataQualityMetrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8" style={{ color: metric.color }} />
              <span
                className="text-sm font-semibold px-2 py-1 rounded-lg"
                style={{
                  color: metric.color,
                  backgroundColor: `${metric.color}20`
                }}
              >
                {metric.percentage}
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Historical Trends Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Historique des Données
          </h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-[#00d9ff]/10 text-[#00d9ff] hover:bg-[#00d9ff]/20 transition-colors text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorDecisions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCleaned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.9)',
                  border: '1px solid #00d9ff',
                  borderRadius: '12px',
                  color: '#e8e9f3'
                }}
              />
              <Area type="monotone" dataKey="decisions" stroke="#00d9ff" fillOpacity={1} fill="url(#colorDecisions)" name="Décisions brutes" />
              <Area type="monotone" dataKey="cleaned" stroke="#10b981" fillOpacity={1} fill="url(#colorCleaned)" name="Données nettoyées" />
              <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} name="Erreurs" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-[#00d9ff] opacity-30 rounded" />
            <span className="text-xs text-[#9ca3af]">Décisions brutes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-[#10b981] opacity-30 rounded" />
            <span className="text-xs text-[#9ca3af]">Données nettoyées</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-[#ef4444] rounded" />
            <span className="text-xs text-[#9ca3af]">Erreurs détectées</span>
          </div>
        </div>
      </motion.div>

      {/* Performance Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Performance Système
        </h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" domain={[0, 100]} style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.9)',
                  border: '1px solid #00d9ff',
                  borderRadius: '12px',
                  color: '#e8e9f3'
                }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 6, strokeWidth: 2, stroke: '#0f0f23' }}
                name="Performance (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Data Cleaning Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Filter className="w-6 h-6 text-[#00d9ff]" />
          Nettoyage Automatisé
        </h3>
        <div className="space-y-3">
          {cleaningActions.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00d9ff]/10 flex items-center justify-center flex-shrink-0">
                  <Filter className="w-5 h-5 text-[#00d9ff]" />
                </div>
                <div>
                  <p className="text-[#e8e9f3] font-semibold mb-1">{item.action}</p>
                  <div className="flex items-center gap-3 text-xs text-[#9ca3af]">
                    <span>{item.count} éléments traités</span>
                    <span className="w-1 h-1 bg-[#9ca3af] rounded-full" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  item.status === 'completed'
                    ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20'
                    : 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/20'
                }`}
              >
                {item.status === 'completed' ? 'Complété' : 'En cours...'}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}