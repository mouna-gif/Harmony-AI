import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, Users, Target, Activity, TrendingDown, Brain, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, AlertCircle } from 'lucide-react';

export default function Analytics() {
  const { t } = useTranslation();

  // --- VOTRE BASE DE DONNÉES COMPLÈTE ---
  const analyticsData = [
    { "date": "2024-01-02", "type_operation": "Verification_Signature", "secteur_client": "e-banking (BIAT)", "volume_transactions": 45200, "statut": "Succes", "temps_moyen_ms": 120, "erreurs": 0 },
    { "date": "2024-01-05", "type_operation": "Generation_Certificat", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 1250, "statut": "Succes", "temps_moyen_ms": 450, "erreurs": 2 },
    { "date": "2024-01-08", "type_operation": "Authentification_PKI", "secteur_client": "e-procurement (Tuneps)", "volume_transactions": 8940, "statut": "Succes", "temps_moyen_ms": 310, "erreurs": 5 },
    { "date": "2024-01-11", "type_operation": "Horodatage", "secteur_client": "Administration (CNSS)", "volume_transactions": 15200, "statut": "Succes", "temps_moyen_ms": 90, "erreurs": 0 },
    { "date": "2024-01-14", "type_operation": "Revocation_Certificat", "secteur_client": "e-commerce", "volume_transactions": 45, "statut": "Echec", "temps_moyen_ms": 1200, "erreurs": 45 },
    { "date": "2024-01-17", "type_operation": "Verification_Signature", "secteur_client": "e-banking (STB)", "volume_transactions": 32100, "statut": "Succes", "temps_moyen_ms": 115, "erreurs": 0 },
    { "date": "2024-01-20", "type_operation": "Generation_Certificat", "secteur_client": "Secteur_Prive", "volume_transactions": 340, "statut": "Succes", "temps_moyen_ms": 820, "erreurs": 0 },
    { "date": "2024-01-23", "type_operation": "Authentification_PKI", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 28500, "statut": "Succes", "temps_moyen_ms": 250, "erreurs": 12 },
    { "date": "2024-01-26", "type_operation": "Horodatage", "secteur_client": "e-procurement (Tuneps)", "volume_transactions": 19100, "statut": "Succes", "temps_moyen_ms": 95, "erreurs": 2 },
    { "date": "2024-01-29", "type_operation": "Chiffrement_Donnees", "secteur_client": "Administration (CNSS)", "volume_transactions": 7200, "statut": "Succes", "temps_moyen_ms": 600, "erreurs": 0 },
    { "date": "2024-02-01", "type_operation": "Generation_Certificat", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 1800, "statut": "Echec", "temps_moyen_ms": 4500, "erreurs": 1800 },
    { "date": "2024-02-04", "type_operation": "Verification_Signature", "secteur_client": "e-banking (UIB)", "volume_transactions": 41000, "statut": "Succes", "temps_moyen_ms": 118, "erreurs": 0 },
    { "date": "2024-02-07", "type_operation": "Revocation_Certificat", "secteur_client": "e-banking (Attijari)", "volume_transactions": 120, "statut": "Succes", "temps_moyen_ms": 450, "erreurs": 0 },
    { "date": "2024-02-10", "type_operation": "Authentification_PKI", "secteur_client": "Secteur_Prive", "volume_transactions": 5200, "statut": "Succes", "temps_moyen_ms": 270, "erreurs": 0 },
    { "date": "2024-02-13", "type_operation": "Horodatage", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 61000, "statut": "Succes", "temps_moyen_ms": 110, "erreurs": 5 },
    { "date": "2024-02-16", "type_operation": "Generation_Certificat", "secteur_client": "e-procurement (Tuneps)", "volume_transactions": 950, "statut": "Succes", "temps_moyen_ms": 500, "erreurs": 1 },
    { "date": "2024-02-19", "type_operation": "Chiffrement_Donnees", "secteur_client": "e-banking (BIAT)", "volume_transactions": 7800, "statut": "Succes", "temps_moyen_ms": 650, "erreurs": 0 },
    { "date": "2024-02-22", "type_operation": "Verification_Signature", "secteur_client": "e-commerce", "volume_transactions": 12000, "statut": "Succes", "temps_moyen_ms": 130, "erreurs": 0 },
    { "date": "2024-02-25", "type_operation": "Authentification_PKI", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 35000, "statut": "Succes", "temps_moyen_ms": 280, "erreurs": 3 },
    { "date": "2024-02-28", "type_operation": "Generation_Certificat", "secteur_client": "Administration (CNSS)", "volume_transactions": 4500, "statut": "Succes", "temps_moyen_ms": 550, "erreurs": 2 },
    { "date": "2024-03-02", "type_operation": "Verification_Signature", "secteur_client": "e-banking (Amen Bank)", "volume_transactions": 18500, "statut": "Succes", "temps_moyen_ms": 125, "erreurs": 1 },
    { "date": "2024-03-05", "type_operation": "Horodatage", "secteur_client": "e-procurement (Tuneps)", "volume_transactions": 22000, "statut": "Succes", "temps_moyen_ms": 88, "erreurs": 0 },
    { "date": "2024-03-08", "type_operation": "Revocation_Certificat", "secteur_client": "Secteur_Prive", "volume_transactions": 85, "statut": "Succes", "temps_moyen_ms": 420, "erreurs": 0 },
    { "date": "2024-03-11", "type_operation": "Authentification_PKI", "secteur_client": "Administration (DGI)", "volume_transactions": 41000, "statut": "Succes", "temps_moyen_ms": 240, "erreurs": 8 },
    { "date": "2024-03-14", "type_operation": "Generation_Certificat", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 9200, "statut": "Succes", "temps_moyen_ms": 480, "erreurs": 4 },
    { "date": "2024-03-17", "type_operation": "Verification_Signature", "secteur_client": "e-banking (STB)", "volume_transactions": 29500, "statut": "Echec", "temps_moyen_ms": 3200, "erreurs": 29500 },
    { "date": "2024-03-20", "type_operation": "Chiffrement_Donnees", "secteur_client": "e-commerce", "volume_transactions": 6100, "statut": "Succes", "temps_moyen_ms": 590, "erreurs": 0 },
    { "date": "2024-03-23", "type_operation": "Horodatage", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 55000, "statut": "Succes", "temps_moyen_ms": 105, "erreurs": 2 },
    { "date": "2024-03-26", "type_operation": "Generation_Certificat", "secteur_client": "e-banking (BIAT)", "volume_transactions": 1200, "statut": "Succes", "temps_moyen_ms": 750, "erreurs": 0 },
    { "date": "2024-03-29", "type_operation": "Authentification_PKI", "secteur_client": "e-procurement (Tuneps)", "volume_transactions": 14200, "statut": "Succes", "temps_moyen_ms": 290, "erreurs": 6 },
    { "date": "2024-04-01", "type_operation": "Revocation_Certificat", "secteur_client": "e-banking (UIB)", "volume_transactions": 220, "statut": "Succes", "temps_moyen_ms": 380, "erreurs": 0 },
    { "date": "2024-04-04", "type_operation": "Verification_Signature", "secteur_client": "Administration (CNSS)", "volume_transactions": 8900, "statut": "Succes", "temps_moyen_ms": 140, "erreurs": 0 },
    { "date": "2024-04-07", "type_operation": "Chiffrement_Donnees", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 11200, "statut": "Succes", "temps_moyen_ms": 620, "erreurs": 1 },
    { "date": "2024-04-10", "type_operation": "Generation_Certificat", "secteur_client": "Secteur_Prive", "volume_transactions": 450, "statut": "Succes", "temps_moyen_ms": 810, "erreurs": 0 },
    { "date": "2024-04-13", "type_operation": "Horodatage", "secteur_client": "e-banking (Attijari)", "volume_transactions": 31000, "statut": "Succes", "temps_moyen_ms": 92, "erreurs": 0 },
    { "date": "2024-04-16", "type_operation": "Authentification_PKI", "secteur_client": "e-commerce", "volume_transactions": 7500, "statut": "Succes", "temps_moyen_ms": 260, "erreurs": 3 },
    { "date": "2024-04-19", "type_operation": "Verification_Signature", "secteur_client": "e-procurement (Tuneps)", "volume_transactions": 48000, "statut": "Succes", "temps_moyen_ms": 108, "erreurs": 0 },
    { "date": "2024-04-22", "type_operation": "Revocation_Certificat", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 150, "statut": "Succes", "temps_moyen_ms": 410, "erreurs": 0 },
    { "date": "2024-04-25", "type_operation": "Generation_Certificat", "secteur_client": "Administration (DGI)", "volume_transactions": 3200, "statut": "Succes", "temps_moyen_ms": 520, "erreurs": 1 },
    { "date": "2024-04-28", "type_operation": "Chiffrement_Donnees", "secteur_client": "e-banking (Amen Bank)", "volume_transactions": 5400, "statut": "Succes", "temps_moyen_ms": 680, "erreurs": 0 },
    { "date": "2024-05-01", "type_operation": "Horodatage", "secteur_client": "Secteur_Prive", "volume_transactions": 8200, "statut": "Succes", "temps_moyen_ms": 99, "erreurs": 0 },
    { "date": "2024-05-04", "type_operation": "Verification_Signature", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 71000, "statut": "Succes", "temps_moyen_ms": 115, "erreurs": 4 },
    { "date": "2024-05-07", "type_operation": "Authentification_PKI", "secteur_client": "e-banking (STB)", "volume_transactions": 33000, "statut": "Succes", "temps_moyen_ms": 245, "erreurs": 2 },
    { "date": "2024-05-10", "type_operation": "Generation_Certificat", "secteur_client": "e-commerce", "volume_transactions": 1800, "statut": "Succes", "temps_moyen_ms": 690, "erreurs": 0 },
    { "date": "2024-05-13", "type_operation": "Revocation_Certificat", "secteur_client": "Administration (CNSS)", "volume_transactions": 90, "statut": "Echec", "temps_moyen_ms": 1100, "erreurs": 90 },
    { "date": "2024-05-16", "type_operation": "Chiffrement_Donnees", "secteur_client": "e-procurement (Tuneps)", "volume_transactions": 14500, "statut": "Succes", "temps_moyen_ms": 640, "erreurs": 0 },
    { "date": "2024-05-19", "type_operation": "Horodatage", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 68000, "statut": "Succes", "temps_moyen_ms": 102, "erreurs": 1 },
    { "date": "2024-05-22", "type_operation": "Verification_Signature", "secteur_client": "e-banking (BIAT)", "volume_transactions": 52000, "statut": "Succes", "temps_moyen_ms": 121, "erreurs": 0 },
    { "date": "2024-05-25", "type_operation": "Authentification_PKI", "secteur_client": "Secteur_Prive", "volume_transactions": 9100, "statut": "Succes", "temps_moyen_ms": 275, "erreurs": 5 },
    { "date": "2024-05-28", "type_operation": "Generation_Certificat", "secteur_client": "e-banking (UIB)", "volume_transactions": 1100, "statut": "Succes", "temps_moyen_ms": 800, "erreurs": 0 },
    { "date": "2024-05-31", "type_operation": "Revocation_Certificat", "secteur_client": "e-gouvernement (TTN)", "volume_transactions": 310, "statut": "Succes", "temps_moyen_ms": 390, "erreurs": 0 }
  ];

  // --- LOGIQUE DE TRAITEMENT DES DONNÉES ---

  // 1. Calculs KPI Globaux
  const totalVolume = analyticsData.reduce((acc, curr) => acc + curr.volume_transactions, 0);
  const totalErrors = analyticsData.reduce((acc, curr) => acc + curr.erreurs, 0);
  const avgTime = Math.round(analyticsData.reduce((acc, curr) => acc + curr.temps_moyen_ms, 0) / analyticsData.length);
  const successCount = analyticsData.filter(item => item.statut === 'Succes').length;
  const successRate = ((successCount / analyticsData.length) * 100).toFixed(1);

  // 2. Graphique Tendance Mensuelle (Volume)
  const monthlyDataRaw = {};
  analyticsData.forEach(item => {
    const monthIdx = parseInt(item.date.substring(5, 7)) - 1;
    const monthName = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"][monthIdx];
    if (!monthlyDataRaw[monthName]) monthlyDataRaw[monthName] = 0;
    monthlyDataRaw[monthName] += item.volume_transactions;
  });
  const monthlyTrend = Object.keys(monthlyDataRaw).map(key => ({
    month: key,
    volume: monthlyDataRaw[key]
  }));

  // 3. Graphique Répartition par Secteur
  const sectorDataRaw = {};
  analyticsData.forEach(item => {
    const cleanName = item.secteur_client.includes('(') ? item.secteur_client.split('(')[0].trim() : item.secteur_client;
    if (!sectorDataRaw[cleanName]) sectorDataRaw[cleanName] = 0;
    sectorDataRaw[cleanName] += item.volume_transactions;
  });
  
  const COLORS = ['#00d9ff', '#8b5cf6', '#fbbf24', '#10b981', '#ef4444', '#6366f1'];
  const sectorDistribution = Object.keys(sectorDataRaw).map((name, index) => ({
    name: name,
    value: sectorDataRaw[name],
    color: COLORS[index % COLORS.length]
  })).sort((a, b) => b.value - a.value);

  // 4. Graphique Performance par Opération (Volume)
  const operationDataRaw = {};
  analyticsData.forEach(item => {
    if (!operationDataRaw[item.type_operation]) operationDataRaw[item.type_operation] = 0;
    operationDataRaw[item.type_operation] += item.volume_transactions;
  });

  // Mapping pour renommer les opérations selon la demande
  const operationNameMap: Record<string, string> = {
    "Verification Signature": "Vérification de Signature",
    "Horodatage": "Horodatage Sécurisé",
    "Authentification PKI": "Authentification PKI",
    "Chiffrement Donnees": "Chiffrement de Données",
    "Generation Certificat": "Émission de Certificats",
    "Revocation Certificat": "Révocation de Certificats"
  };

  const operationPerformance = Object.keys(operationDataRaw).map(name => {
    const rawName = name.replace(/_/g, ' ');
    return {
      name: operationNameMap[rawName] || rawName,
      volume: operationDataRaw[name]
    };
  });

  // Données pour les cartes KPI
  const kpis = [
    {
      label: 'Volume Total Tx',
      value: (totalVolume / 1000).toFixed(1) + 'k',
      change: 'Real-time',
      icon: TrendingUp,
      color: '#00d9ff'
    },
    {
      label: 'Taux de Succès',
      value: successRate + '%',
      change: 'Stable',
      icon: Users,
      color: '#10b981'
    },
    {
      label: 'Latence Moyenne',
      value: `${avgTime}ms`,
      change: '+2ms',
      icon: Target,
      color: '#fbbf24'
    },
    {
      label: 'Erreurs Détectées',
      value: totalErrors.toLocaleString(),
      change: 'Alerte',
      icon: DollarSign,
      color: '#ef4444'
    }
  ];

  // --- NOUVELLES DONNÉES AJOUTÉES ---
  const lineData = [
    { name: 'Lun', decisions: 120, precision: 92 },
    { name: 'Mar', decisions: 145, precision: 94 },
    { name: 'Mer', decisions: 132, precision: 91 },
    { name: 'Jeu', decisions: 167, precision: 95 },
    { name: 'Ven', decisions: 189, precision: 93 },
    { name: 'Sam', decisions: 154, precision: 96 },
    { name: 'Dim', decisions: 142, precision: 94 }
  ];

  const barData = [
    { name: 'Analyste', tasks: 145 },
    { name: 'Prédicteur', tasks: 89 },
    { name: 'Optimiseur', tasks: 234 },
    { name: 'Critique', tasks: 56 }
  ];

  const pieData = [
    { name: 'Optimisation', value: 35, color: '#fbbf24' },
    { name: 'Analyse', value: 28, color: '#00d9ff' },
    { name: 'Prédiction', value: 22, color: '#8b5cf6' },
    { name: 'Audit', value: 15, color: '#10b981' }
  ];

  const newKpis = [
    { label: 'Décisions IA (7j)', value: '1,049', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { label: 'Précision Moyenne', value: '93.6%', change: '+2.1%', trend: 'up', icon: Activity },
    { label: 'Temps Réponse', value: '2.4s', change: '-8.3%', trend: 'down', icon: TrendingDown }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs Existants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${kpi.color}20` }}
              >
                <kpi.icon className="w-6 h-6" style={{ color: kpi.color }} />
              </div>
              <span
                className="text-sm font-semibold px-2 py-1 rounded-lg bg-[#ffffff]/5 text-[#9ca3af]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {kpi.change}
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
              {kpi.label}
            </p>
            <p className="text-3xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* RAPPORT EXPLICATIF KPIS GLOBAUX */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#8b5cf6]/5 border border-[#00d9ff]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-4 h-4 text-[#00d9ff]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">📊 Rapport Synthétique - KPIs Globaux</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#00d9ff] font-semibold">🔬 Synthèse des métriques :</span> Volume total traité = {(totalVolume / 1000).toFixed(1)}k transactions, Taux de succès = {successRate}%, Latence moyenne = {avgTime}ms, Erreurs détectées = {totalErrors.toLocaleString()}.</p>
              <p><span className="text-[#00d9ff] font-semibold">📈 Interprétation :</span> Le taux de succès élevé ({successRate}%) indique une fiabilité robuste du système. La latence moyenne ({avgTime}ms) est dans les normes acceptables. Les erreurs détectées nécessitent une investigation ciblée.</p>
              <p><span className="text-[#00d9ff] font-semibold">💡 Recommandation :</span> Prioriser l'analyse des causes racines des erreurs, particulièrement sur les opérations à forte volumétrie.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nouveaux KPIs IA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newKpis.map((kpi, i) => (
          <motion.div
            key={`new-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <kpi.icon
                className="w-8 h-8"
                style={{ color: kpi.trend === 'up' ? '#10b981' : '#ef4444' }}
              />
              <span
                className="text-sm font-semibold px-2 py-1 rounded-lg"
                style={{
                  color: kpi.trend === 'up' ? '#10b981' : '#ef4444',
                  backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                }}
              >
                {kpi.change}
              </span>
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-[#e8e9f3]">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* RAPPORT EXPLICATIF KPIS IA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6]/10 to-[#a78bfa]/5 border border-[#8b5cf6]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 text-[#8b5cf6]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#8b5cf6] mb-2">🤖 Rapport Intelligence Artificielle - KPIs IA</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#8b5cf6] font-semibold">🔬 Métriques IA :</span> {newKpis[0].value} décisions IA (7j), Précision moyenne = {newKpis[1].value}, Temps réponse = {newKpis[2].value}.</p>
              <p><span className="text-[#8b5cf6] font-semibold">📈 Performance IA :</span> {newKpis[0].change} de décisions, {newKpis[1].change} de précision, {newKpis[2].change} de latence.</p>
              <p><span className="text-[#8b5cf6] font-semibold">💡 Optimisation :</span> La tendance positive indique une amélioration continue des capacités IA.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Existants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique 1: Tendance Mensuelle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-2xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Tendance du Volume Mensuel
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontFamily: 'var(--font-body)' }} />
              <YAxis stroke="#9ca3af" style={{ fontFamily: 'var(--font-body)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.95)',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body)'
                }}
              />
              <Legend wrapperStyle={{ fontFamily: 'var(--font-body)' }} />
              <Line type="monotone" dataKey="volume" stroke="#00d9ff" strokeWidth={2} name="Volume Tx" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Graphique 2: Répartition par Secteur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-2xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Répartition par Partenaire
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.95)',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Graphique 3: Volume par Type d'Opération */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl lg:col-span-2"
        >
          <h3 className="text-2xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Activité des Services PKI
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={operationPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#9ca3af" style={{ fontFamily: 'var(--font-body)' }} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" style={{ fontFamily: 'var(--font-body)' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 15, 35, 0.95)',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-body)'
                }}
              />
              <Bar dataKey="volume" fill="url(#colorOps)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorOps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d9ff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* RAPPORT EXPLICATIF ANALYSE TRANSACTIONNELLE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/5 border border-[#fbbf24]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
            <LineChartIcon className="w-4 h-4 text-[#fbbf24]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#fbbf24] mb-2">📈 Rapport Analyse Transactionnelle</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#fbbf24] font-semibold">🔬 Tendance volumétrique :</span> Le volume mensuel montre {monthlyTrend.length > 1 && monthlyTrend[monthlyTrend.length-1].volume > monthlyTrend[0].volume ? 'une croissance progressive' : 'une certaine stabilité'}.</p>
              <p><span className="text-[#fbbf24] font-semibold">📊 Répartition sectorielle :</span> Le secteur dominant est <span className="text-[#fbbf24]">{sectorDistribution[0]?.name || 'N/A'}</span> avec {((sectorDistribution[0]?.value / totalVolume) * 100).toFixed(0)}% du volume total.</p>
              <p><span className="text-[#fbbf24] font-semibold">⚙️ Opérations clés :</span> {operationPerformance.sort((a,b) => b.volume - a.volume)[0]?.name || 'Verification_Signature'} représente l'opération la plus fréquente.</p>
              <p><span className="text-[#fbbf24] font-semibold">💡 Actions stratégiques :</span> Optimiser les opérations à fort volume pour réduire la latence globale.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nouveaux graphiques IA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Activité des Décisions IA
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f0f23',
                  border: '1px solid #00d9ff',
                  borderRadius: '12px'
                }}
              />
              <Line type="monotone" dataKey="decisions" stroke="#00d9ff" strokeWidth={3} dot={{ fill: '#00d9ff' }} />
              <Line type="monotone" dataKey="precision" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
        >
          <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Charge de Travail par Agent
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f0f23',
                  border: '1px solid #00d9ff',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="tasks" fill="#00d9ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* RAPPORT EXPLICATIF PERFORMANCE IA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#10b981] mb-2">⚡ Rapport Performance Agents IA</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#10b981] font-semibold">🔬 Décisions IA :</span> Volume journalier moyen = {(lineData.reduce((a,b) => a + b.decisions, 0) / lineData.length).toFixed(0)} décisions. Pic observé le Jeudi ({lineData.find(d => d.name === 'Jeu')?.decisions}).</p>
              <p><span className="text-[#10b981] font-semibold">📊 Précision :</span> La précision moyenne est de {(lineData.reduce((a,b) => a + b.precision, 0) / lineData.length).toFixed(1)}%, avec un maximum le Samedi ({lineData.find(d => d.name === 'Sam')?.precision}%).</p>
              <p><span className="text-[#10b981] font-semibold">👥 Distribution agents :</span> L'Agent Optimiseur traite {barData.find(b => b.name === 'Optimiseur')?.tasks} tâches, soit {(barData.find(b => b.name === 'Optimiseur')?.tasks / barData.reduce((a,b) => a + b.tasks, 0) * 100).toFixed(0)}% du total.</p>
              <p><span className="text-[#10b981] font-semibold">💡 Optimisation :</span> Rééquilibrer la charge entre agents pour maximiser l'efficacité globale.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pie Chart IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Répartition par Type d'Action
        </h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* RAPPORT EXPLICATIF RÉPARTITION ACTIONS IA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#ef4444]/10 to-[#f97316]/5 border border-[#ef4444]/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
            <PieChartIcon className="w-4 h-4 text-[#ef4444]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#ef4444] mb-2">🥧 Rapport Répartition - Actions IA</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#ef4444] font-semibold">🔬 Distribution :</span> Optimisation ({pieData.find(p => p.name === 'Optimisation')?.value}%), Analyse ({pieData.find(p => p.name === 'Analyse')?.value}%), Prédiction ({pieData.find(p => p.name === 'Prédiction')?.value}%), Audit ({pieData.find(p => p.name === 'Audit')?.value}%).</p>
              <p><span className="text-[#ef4444] font-semibold">📊 Analyse :</span> L'optimisation domine les actions IA, reflétant une priorité sur l'efficacité opérationnelle.</p>
              <p><span className="text-[#ef4444] font-semibold">💡 Recommandation :</span> Renforcer les capacités d'analyse prédictive pour anticiper les tendances futures.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RAPPORT EXPLICATIF GLOBAL */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-gradient-to-r from-[#00d9ff]/20 to-[#8b5cf6]/20 border border-[#00d9ff]/30"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00d9ff]/30 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-[#00d9ff]" />
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">📋 Synthèse Executive - Tableau de Bord Analytics</h5>
            <div className="text-xs text-[#9ca3af] space-y-2">
              <p><span className="text-[#00d9ff] font-semibold">🏆 Points forts :</span> Taux de succès élevé ({successRate}%), Volume transactionnel important ({(totalVolume/1000).toFixed(0)}k), Décisions IA en croissance (+12.5%).</p>
              <p><span className="text-[#00d9ff] font-semibold">⚠️ Points d'attention :</span> Latence moyenne ({avgTime}ms) à surveiller, Erreurs détectées ({totalErrors.toLocaleString()}) à investiguer.</p>
              <p><span className="text-[#00d9ff] font-semibold">🎯 Recommandations stratégiques :</span> Optimiser les opérations à fort volume, Renforcer les capacités prédictives, Équilibrer la charge entre agents.</p>
              <p><span className="text-[#00d9ff] font-semibold">📅 Prochain audit :</span> Planifier une revue des KPIs dans 30 jours pour mesurer l'impact des optimisations.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}