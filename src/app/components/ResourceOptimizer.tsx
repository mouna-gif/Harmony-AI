import { motion } from 'motion/react';
import { useState } from 'react';
import { Zap, TrendingDown, DollarSign, Cpu, Database, Gauge, Calculator, Save, CheckCircle2, X } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ResourceOptimizer() {
  const [optimizationLevel, setOptimizationLevel] = useState('balanced');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appliedOptimizations, setAppliedOptimizations] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });
  const [savingsData, setSavingsData] = useState([
    { category: 'Compute', current: 4500, optimized: 2800, savings: 1700 },
    { category: 'Storage', current: 2300, optimized: 1650, savings: 650 },
    { category: 'Network', current: 1800, optimized: 1400, savings: 400 },
    { category: 'Database', current: 3200, optimized: 2100, savings: 1100 }
  ]);

  const optimizationTrend = [
    { month: 'Jan', cost: 12500, optimized: 12500, target: 8500 },
    { month: 'Fév', cost: 13200, optimized: 11800, target: 8500 },
    { month: 'Mar', cost: 14100, optimized: 10500, target: 8500 },
    { month: 'Avr', cost: 13800, optimized: 9200, target: 8500 },
    { month: 'Mai', cost: 14500, optimized: 7950, target: 8500 }
  ];

  const [resourceMetrics, setResourceMetrics] = useState([
    { label: 'Économies Mensuelles', value: '€6,550', percentage: '+45%', icon: DollarSign, color: '#10b981' },
    { label: 'CPU Optimisé', value: '68%', percentage: '-23%', icon: Cpu, color: '#00d9ff' },
    { label: 'Stockage Libéré', value: '2.4 TB', percentage: '-28%', icon: Database, color: '#8b5cf6' },
    { label: 'Efficacité Globale', value: '87%', percentage: '+15%', icon: Gauge, color: '#fbbf24' }
  ]);

  const [optimizationRecommendations, setOptimizationRecommendations] = useState([
    {
      id: 1,
      title: 'Migration instances réservées',
      category: 'Compute',
      impact: 'Élevé',
      savings: '€1,700/mois',
      effort: 'Moyen',
      roi: '3 mois',
      description: 'Migrer 12 instances EC2 on-demand vers réservées (engagement 1 an)',
      steps: ['Analyser patterns d\'utilisation', 'Sélectionner instances', 'Réserver capacité', 'Migrer workloads']
    },
    {
      id: 2,
      title: 'Compression stockage S3',
      category: 'Storage',
      impact: 'Moyen',
      savings: '€650/mois',
      effort: 'Faible',
      roi: '1 mois',
      description: 'Activer compression intelligente et archivage automatique',
      steps: ['Identifier objets à compresser', 'Configurer lifecycle policies', 'Activer compression', 'Monitorer résultats']
    },
    {
      id: 3,
      title: 'Optimisation requêtes DB',
      category: 'Database',
      impact: 'Élevé',
      savings: '€1,100/mois',
      effort: 'Élevé',
      roi: '2 mois',
      description: 'Optimiser index et requêtes lentes détectées par l\'IA',
      steps: ['Analyser slow queries', 'Créer index manquants', 'Refactoriser requêtes', 'Caching stratégique']
    },
    {
      id: 4,
      title: 'CDN & Edge caching',
      category: 'Network',
      impact: 'Moyen',
      savings: '€400/mois',
      effort: 'Faible',
      roi: '1.5 mois',
      description: 'Étendre stratégie CDN et activer edge computing',
      steps: ['Configurer CloudFront', 'Définir rules de cache', 'Migrer assets statiques', 'Optimiser TTL']
    }
  ]);

  const optimizationModes = [
    { id: 'aggressive', label: 'Agressif', savings: '€8,200/mois', risk: 'Moyen' },
    { id: 'balanced', label: 'Équilibré', savings: '€6,550/mois', risk: 'Faible' },
    { id: 'conservative', label: 'Conservateur', savings: '€4,100/mois', risk: 'Très Faible' }
  ];

  // Afficher un toast de notification
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage({ show: true, message, type });
    setTimeout(() => setToastMessage({ show: false, message: '', type: 'success' }), 3000);
  };

  // Appliquer le mode d'optimisation
  const handleApplyOptimization = () => {
    const mode = optimizationModes.find(m => m.id === optimizationLevel);
    if (mode) {
      showToast(`Mode ${mode.label} appliqué - Économies estimées: ${mode.savings}`, 'success');
      
      // Mettre à jour les métriques en fonction du mode
      const savingsMultiplier = optimizationLevel === 'aggressive' ? 1.3 : optimizationLevel === 'balanced' ? 1.0 : 0.7;
      const newSavings = 6550 * savingsMultiplier;
      
      setResourceMetrics(prev => prev.map(metric => 
        metric.label === 'Économies Mensuelles' 
          ? { ...metric, value: `€${Math.round(newSavings).toLocaleString()}` }
          : metric
      ));
      
      // Mettre à jour les données d'économies
      setSavingsData(prev => prev.map(item => ({
        ...item,
        optimized: Math.round(item.current - (item.savings * savingsMultiplier)),
        savings: Math.round(item.savings * savingsMultiplier)
      })));
    }
    setShowApplyModal(false);
  };

  // Implémenter une recommandation spécifique
  const implementOptimization = (id: number) => {
    if (appliedOptimizations.includes(id)) {
      showToast('Cette optimisation a déjà été appliquée', 'error');
      return;
    }
    
    setAppliedOptimizations([...appliedOptimizations, id]);
    
    const recommendation = optimizationRecommendations.find(r => r.id === id);
    if (recommendation) {
      // Extraire le montant d'économie
      const savingsAmount = parseInt(recommendation.savings.replace(/[^0-9]/g, ''));
      
      // Mettre à jour les métriques
      setResourceMetrics(prev => prev.map(metric => {
        if (metric.label === 'Économies Mensuelles') {
          const currentValue = parseInt(metric.value.replace(/[^0-9]/g, ''));
          const newValue = currentValue + savingsAmount;
          return { ...metric, value: `€${newValue.toLocaleString()}` };
        }
        if (metric.label === 'Efficacité Globale') {
          const currentValue = parseInt(metric.value);
          const newValue = Math.min(99, currentValue + Math.floor(savingsAmount / 200));
          return { ...metric, value: `${newValue}%`, percentage: `+${newValue - 87}%` };
        }
        return metric;
      }));
      
      // Mettre à jour les données du graphique pour la catégorie concernée
      setSavingsData(prev => prev.map(item => {
        if (item.category === recommendation.category) {
          const newOptimized = Math.max(0, item.optimized - Math.floor(savingsAmount / 10));
          return {
            ...item,
            optimized: newOptimized,
            savings: item.current - newOptimized
          };
        }
        return item;
      }));
      
      showToast(`✅ ${recommendation.title} implémentée avec succès !`, 'success');
    }
  };

  const customTooltipStyle = {
    backgroundColor: 'rgba(15, 15, 35, 0.9)',
    border: '1px solid #10b981',
    borderRadius: '12px',
    color: '#e8e9f3'
  };

  const axisStyle = { stroke: '#9ca3af', fontSize: '12px' };
  const gridStyle = { stroke: '#1f2937', strokeDasharray: '3 3' };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage.show && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-20 left-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl ${
            toastMessage.type === 'success' ? 'bg-[#10b981] text-white' : 'bg-[#ef4444] text-white'
          }`}
          style={{ fontFamily: 'var(--font-body)', transform: 'translateX(-50%)' }}
        >
          {toastMessage.message}
        </motion.div>
      )}

      {/* Modal d'application */}
      {showApplyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a1a]/80 backdrop-blur-sm"
          onClick={() => setShowApplyModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md p-6 rounded-2xl border border-[#10b981]/30 bg-[#0f0f23] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                Appliquer l'Optimisation
              </h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg hover:bg-[#00d9ff]/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#9ca3af]" />
              </button>
            </div>

            <p className="text-[#9ca3af] mb-4">
              Êtes-vous sûr de vouloir appliquer le mode <span className="text-[#10b981] font-bold">
                {optimizationModes.find(m => m.id === optimizationLevel)?.label}
              </span> ?
            </p>

            <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#10b981]/20 mb-4">
              <p className="text-sm text-[#9ca3af] mb-2">Résumé des changements :</p>
              <ul className="space-y-1 text-xs text-[#e8e9f3]">
                <li>• Économies estimées : {optimizationModes.find(m => m.id === optimizationLevel)?.savings}</li>
                <li>• Niveau de risque : {optimizationModes.find(m => m.id === optimizationLevel)?.risk}</li>
                <li>• Optimisation automatique des ressources</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyOptimization}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-sm"
              >
                Confirmer
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowApplyModal(false)}
                className="px-6 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#9ca3af] text-sm"
              >
                Annuler
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl border border-[#10b981]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#e8e9f3] mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
            <Calculator className="w-8 h-8 text-[#10b981]" />
            Optimisation des Ressources
          </h2>
          <p className="text-[#9ca3af]">Algorithmes d'optimisation avancés pour réduire les coûts</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={optimizationLevel}
            onChange={(e) => setOptimizationLevel(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0f0f23]/60 border border-[#10b981]/20 text-[#e8e9f3] focus:outline-none focus:border-[#10b981]/50 cursor-pointer"
          >
            {optimizationModes.map(mode => (
              <option key={mode.id} value={mode.id}>{mode.label}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowApplyModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Appliquer
          </motion.button>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resourceMetrics.map((metric, i) => (
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
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>
              <span
                className="text-sm font-semibold px-2 py-1 rounded-lg bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20"
              >
                {metric.percentage}
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Savings Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Répartition des Coûts
        </h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsData}>
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis dataKey="category" {...axisStyle} />
              <YAxis {...axisStyle} />
              <Tooltip contentStyle={customTooltipStyle} cursor={{fill: 'rgba(0, 217, 255, 0.05)'}} />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Bar dataKey="current" fill="#ef4444" radius={[4, 4, 0, 0]} name="Coût actuel" />
              <Bar dataKey="optimized" fill="#10b981" radius={[4, 4, 0, 0]} name="Coût optimisé" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {savingsData.map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#10b981]/5 border border-[#10b981]/10 text-center hover:bg-[#10b981]/10 transition-colors">
              <p className="text-xs text-[#9ca3af] mb-1">{item.category}</p>
              <p className="text-lg font-bold text-[#10b981]">-€{item.savings}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Optimization Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Suivi des Économies
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={optimizationTrend}>
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis dataKey="month" {...axisStyle} />
              <YAxis {...axisStyle} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="Coût brut" dot={{ fill: '#ef4444' }} />
              <Line type="monotone" dataKey="optimized" stroke="#10b981" strokeWidth={3} name="Coût optimisé" dot={{ fill: '#10b981' }} />
              <Line type="monotone" dataKey="target" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" name="Cible" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Optimization Modes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Stratégies d'Allocation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {optimizationModes.map((mode) => (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                optimizationLevel === mode.id
                  ? 'border-[#10b981] bg-[#10b981]/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'border-[#00d9ff]/10 bg-[#0f0f23]/60 hover:border-[#00d9ff]/30'
              }`}
              onClick={() => setOptimizationLevel(mode.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-[#e8e9f3]">{mode.label}</h4>
                {optimizationLevel === mode.id && <Zap className="w-5 h-5 text-[#10b981]" fill="#10b981" />}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/20">
                  <span className="text-xs text-[#9ca3af]">Économies</span>
                  <span className="text-sm font-bold text-[#10b981]">{mode.savings}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/20">
                  <span className="text-xs text-[#9ca3af]">Risque</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-lg font-semibold border ${
                      mode.risk === 'Très Faible'
                        ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/20'
                        : mode.risk === 'Faible'
                        ? 'bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/20'
                        : 'bg-[#f97316]/20 text-[#f97316] border-[#f97316]/20'
                    }`}
                  >
                    {mode.risk}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <h3 className="text-xl text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <TrendingDown className="w-7 h-7 text-[#10b981]" />
          Plan d'Action
          {appliedOptimizations.length > 0 && (
            <span className="text-sm text-[#10b981] bg-[#10b981]/20 px-2 py-1 rounded-lg">
              {appliedOptimizations.length} implémentée(s)
            </span>
          )}
        </h3>

        {optimizationRecommendations.map((rec, index) => {
          const isApplied = appliedOptimizations.includes(rec.id);
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`p-6 rounded-2xl border transition-all ${
                isApplied 
                  ? 'border-[#10b981]/40 bg-gradient-to-br from-[#10b981]/10 to-[#0f0f23]/50 backdrop-blur-xl' 
                  : 'border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl hover:border-[#10b981]/40'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/20">
                      {rec.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        rec.impact === 'Élevé'
                          ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/20'
                          : 'bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/20'
                      }`}
                    >
                      Impact {rec.impact}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/20">
                      ROI: {rec.roi}
                    </span>
                    {isApplied && (
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20">
                        ✓ Appliquée
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-[#e8e9f3] mb-2">{rec.title}</h4>
                  <p className="text-sm text-[#9ca3af] mb-4 leading-relaxed">{rec.description}</p>

                  <div className="border-t border-[#00d9ff]/10 pt-4">
                    <p className="text-xs text-[#9ca3af] font-bold mb-3 uppercase tracking-wider">Plan d'action:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {rec.steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                            isApplied ? 'bg-[#10b981]/20 border-[#10b981]/30' : 'bg-[#10b981]/20 border-[#10b981]/30'
                          }`}>
                            <span className="text-[10px] font-bold text-[#10b981]">{i + 1}</span>
                          </div>
                          <span className={`text-xs ${isApplied ? 'text-[#9ca3af]' : 'text-[#e8e9f3]'}`}>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-4 lg:gap-0">
                  <div className="w-full lg:w-32 h-24 rounded-xl bg-gradient-to-br from-[#10b981]/20 to-[#059669]/10 border border-[#10b981]/30 flex flex-col items-center justify-center p-2">
                    <p className="text-[10px] text-[#9ca3af] mb-1 uppercase">Économies</p>
                    <p className="text-lg font-bold text-[#10b981] text-center leading-tight">{rec.savings}</p>
                  </div>
                  <div className="text-center lg:mt-2">
                    <p className="text-xs text-[#9ca3af]">Effort: <span className="text-[#e8e9f3] font-semibold">{rec.effort}</span></p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: isApplied ? 1 : 1.01 }}
                whileTap={{ scale: isApplied ? 1 : 0.99 }}
                onClick={() => implementOptimization(rec.id)}
                disabled={isApplied}
                className={`w-full px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isApplied
                    ? 'bg-[#10b981]/20 text-[#10b981] cursor-not-allowed border border-[#10b981]/30'
                    : 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-lg shadow-[#10b981]/20 hover:shadow-xl'
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Optimisation déjà implémentée
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Implémenter cette optimisation
                  </>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}