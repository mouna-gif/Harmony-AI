import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Settings2, TrendingUp, AlertTriangle, Activity, Shield, RefreshCw, Gauge, Zap, Cpu, Boxes } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DigitalTwin() {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [scenario, setScenario] = useState('baseline');
  const [results, setResults] = useState<any>(null);

  // --- ÉTAT FICHIER 2 ---
  const [isSimulating, setIsSimulating] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    efficiency: 87,
    performance: 92,
    energyCost: 145,
    resourceUsage: 68
  });

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setRealTimeMetrics((prev) => ({
          efficiency: Math.max(70, Math.min(99, prev.efficiency + (Math.random() * 6 - 3))),
          performance: Math.max(75, Math.min(99, prev.performance + (Math.random() * 4 - 2))),
          energyCost: Math.max(100, Math.min(200, prev.energyCost + (Math.random() * 10 - 5))),
          resourceUsage: Math.max(50, Math.min(90, prev.resourceUsage + (Math.random() * 8 - 4)))
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  // --- DONNÉES DU JUMEAU NUMÉRIQUE (Table complète) ---
  const digitalTwinAssets = [
    { "nom_actif": "PKI_Racine_Principale", "type": "Serveur_Racine", "capacite_max_req_sec": 10000, "charge_actuelle": 7500, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "PKI_Intermediaire_1", "type": "Serveur_Racine", "capacite_max_req_sec": 15000, "charge_actuelle": 8200, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "PKI_Intermediaire_2", "type": "Serveur_Racine", "capacite_max_req_sec": 15000, "charge_actuelle": 5100, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "HSM_Signature_Qualifiee", "type": "Module_Hardware", "capacite_max_req_sec": 50000, "charge_actuelle": 42000, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "HSM_Chiffrement_General", "type": "Module_Hardware", "capacite_max_req_sec": 60000, "charge_actuelle": 15000, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "HSM_Backup_Clef", "type": "Module_Hardware", "capacite_max_req_sec": 10000, "charge_actuelle": 500, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Passerelle_Tuneps", "type": "Gateway_API", "capacite_max_req_sec": 15000, "charge_actuelle": 14500, "statut": "Critique", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Passerelle_TTN", "type": "Gateway_API", "capacite_max_req_sec": 25000, "charge_actuelle": 21000, "statut": "Actif", "localisation": "Datacenter_Etat" },
    { "nom_actif": "Passerelle_Banking", "type": "Gateway_API", "capacite_max_req_sec": 40000, "charge_actuelle": 28000, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Passerelle_CNSS", "type": "Gateway_API", "capacite_max_req_sec": 10000, "charge_actuelle": 7500, "statut": "Actif", "localisation": "Datacenter_Etat" },
    { "nom_actif": "Passerelle_Ecommerce", "type": "Gateway_API", "capacite_max_req_sec": 8000, "charge_actuelle": 1200, "statut": "Actif", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Autorite_Enregistrement_Nord", "type": "Web_Service", "capacite_max_req_sec": 2000, "charge_actuelle": 400, "statut": "Inactif", "localisation": "Tunis" },
    { "nom_actif": "Autorite_Enregistrement_Sud", "type": "Web_Service", "capacite_max_req_sec": 2000, "charge_actuelle": 1800, "statut": "Actif", "localisation": "Sfax" },
    { "nom_actif": "Autorite_Enregistrement_Centre", "type": "Web_Service", "capacite_max_req_sec": 2000, "charge_actuelle": 900, "statut": "Actif", "localisation": "Sousse" },
    { "nom_actif": "Serveur_CRL_Public_1", "type": "Serveur_Annuaire", "capacite_max_req_sec": 8000, "charge_actuelle": 3200, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Serveur_CRL_Public_2", "type": "Serveur_Annuaire", "capacite_max_req_sec": 8000, "charge_actuelle": 3100, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Module_Horodatage_Principal", "type": "Serveur_Applicatif", "capacite_max_req_sec": 30000, "charge_actuelle": 12000, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Module_Horodatage_Backup", "type": "Serveur_Applicatif", "capacite_max_req_sec": 30000, "charge_actuelle": 500, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Serveur_OCS_Primary", "type": "Web_Service", "capacite_max_req_sec": 5000, "charge_actuelle": 4200, "statut": "Actif", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Serveur_OCS_Secondary", "type": "Web_Service", "capacite_max_req_sec": 5000, "charge_actuelle": 100, "statut": "Actif", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Load_Balancer_Principal", "type": "Reseau", "capacite_max_req_sec": 100000, "charge_actuelle": 45000, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Load_Balancer_Backup", "type": "Reseau", "capacite_max_req_sec": 100000, "charge_actuelle": 1000, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Base_Donnees_Certificats_Primary", "type": "Stockage", "capacite_max_iops": 15000, "charge_actuelle": 9000, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Base_Donnees_Certificats_Replica", "type": "Stockage", "capacite_max_iops": 15000, "charge_actuelle": 2500, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Serveur_Backup_Tape", "type": "Stockage", "capacite_max_iops": 5000, "charge_actuelle": 500, "statut": "Actif", "localisation": "Sousse" },
    { "nom_actif": "Module_AI_Harmony", "type": "Compute_GPU", "capacite_max_vram": 32, "charge_actuelle": 28, "statut": "Actif", "localisation": "Cloud_Local" },
    { "nom_actif": "Switch_Core_1", "type": "Reseau", "capacite_max_gbps": 100, "charge_actuelle": 45, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Switch_Core_2", "type": "Reseau", "capacite_max_gbps": 100, "charge_actuelle": 42, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Firewall_Perimetrique", "type": "Securite", "capacite_max_gbps": 40, "charge_actuelle": 15, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Serveur_DNS_Interne", "type": "Reseau", "capacite_max_req_sec": 50000, "charge_actuelle": 12000, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Reverse_Proxy", "type": "Reseau", "capacite_max_req_sec": 80000, "charge_actuelle": 35000, "statut": "Actif", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Systeme_Monitoring_Zabbix", "type": "Maintenance", "capacite_max_hosts": 1000, "charge_actuelle": 450, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Systeme_Logs_ELK", "type": "Stockage", "capacite_max_mo_jour": 50000, "charge_actuelle": 22000, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "PKI_Test_Qualification", "type": "Serveur_Racine", "capacite_max_req_sec": 2000, "charge_actuelle": 100, "statut": "Inactif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "HSM_Test", "type": "Module_Hardware", "capacite_max_req_sec": 5000, "charge_actuelle": 0, "statut": "Inactif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Passerelle_DGI", "type": "Gateway_API", "capacite_max_req_sec": 12000, "charge_actuelle": 9500, "statut": "Actif", "localisation": "Datacenter_Etat" },
    { "nom_actif": "Serveur_SMTP_Securise", "type": "Web_Service", "capacite_max_req_sec": 1000, "charge_actuelle": 150, "statut": "Actif", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Cluster_Kafka_Logs", "type": "Stockage", "capacite_max_msg_sec": 100000, "charge_actuelle": 45000, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Serveur_NTP", "type": "Reseau", "capacite_max_req_sec": 50000, "charge_actuelle": 5000, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "RA_Client_BIAT", "type": "Web_Service", "capacite_max_req_sec": 3000, "charge_actuelle": 1200, "statut": "Actif", "localisation": "BIAT_DC" },
    { "nom_actif": "RA_Client_STB", "type": "Web_Service", "capacite_max_req_sec": 3000, "charge_actuelle": 1100, "statut": "Actif", "localisation": "STB_DC" },
    { "nom_actif": "RA_Client_UIB", "type": "Web_Service", "capacite_max_req_sec": 3000, "charge_actuelle": 900, "statut": "Actif", "localisation": "UIB_DC" },
    { "nom_actif": "RA_Client_Attijari", "type": "Web_Service", "capacite_max_req_sec": 3000, "charge_actuelle": 1500, "statut": "Actif", "localisation": "Attijari_DC" },
    { "nom_actif": "RA_Client_AmenBank", "type": "Web_Service", "capacite_max_req_sec": 3000, "charge_actuelle": 800, "statut": "Actif", "localisation": "Amen_DC" },
    { "nom_actif": "Stockage_NFS_Certificats", "type": "Stockage", "capacite_max_to": 50, "charge_actuelle": 32, "statut": "Actif", "localisation": "Datacenter_Tunis_Sud" },
    { "nom_actif": "Serveur_WAF", "type": "Securite", "capacite_max_req_sec": 60000, "charge_actuelle": 28000, "statut": "Actif", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Passerelle_Amen_Bank", "type": "Gateway_API", "capacite_max_req_sec": 15000, "charge_actuelle": 6500, "statut": "Actif", "localisation": "Cloud_Tunisie" },
    { "nom_actif": "Cluster_Redis_Cache", "type": "Compute_RAM", "capacite_max_mo": 64000, "charge_actuelle": 42000, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" },
    { "nom_actif": "Systeme_Antivirus_Gateway", "type": "Securite", "capacite_max_req_sec": 40000, "charge_actuelle": 18000, "statut": "Actif", "localisation": "Datacenter_Tunis_Nord" }
  ];

  const scenarios = [
    {
      id: 'baseline',
      name: 'Fonctionnement Normal',
      description: 'Métriques temps réel de l\'infrastructure PKI',
      color: '#00d9ff'
    },
    {
      id: 'traffic_surge',
      name: 'Test de Forte Charge',
      description: 'Simulation charge +75% (Ex: Black Friday)',
      color: '#8b5cf6'
    },
    {
      id: 'critical_failure',
      name: 'Test de Panne Système',
      description: 'Perte du Load Balancer Principal',
      color: '#ef4444'
    },
    {
      id: 'autoscaling',
      name: 'Test d\'Auto-Guérison',
      description: 'Activation automatique des backups',
      color: '#10b981'
    }
  ];

  // Données fichier 2
  const simulationData = [
    { time: 'T0', actual: 85, predicted: 85, optimized: 85 },
    { time: 'T1', actual: 87, predicted: 88, optimized: 92 },
    { time: 'T2', actual: 83, predicted: 84, optimized: 89 },
    { time: 'T3', actual: 89, predicted: 90, optimized: 94 },
    { time: 'T4', actual: 91, predicted: 92, optimized: 96 },
    { time: 'T5', actual: 88, predicted: 89, optimized: 93 }
  ];

  const optimizationScenarios = [
    {
      name: 'Scénario A: Économie Énergie',
      savings: '€12.5K/mois',
      efficiency: '+18%',
      impact: 'Élevé',
      color: '#10b981'
    },
    {
      name: 'Scénario B: Performance Max',
      savings: '€8.2K/mois',
      efficiency: '+25%',
      impact: 'Moyen',
      color: '#00d9ff'
    },
    {
      name: 'Scénario C: Équilibré',
      savings: '€15.8K/mois',
      efficiency: '+21%',
      impact: 'Optimal',
      color: '#fbbf24'
    }
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);

    const reqSecAssets = digitalTwinAssets.filter((a: any) => a.capacite_max_req_sec);

    let totalLoad = reqSecAssets.reduce((acc: number, a: any) => acc + a.charge_actuelle, 0);
    const totalCapacity = reqSecAssets.reduce((acc: number, a: any) => acc + a.capacite_max_req_sec, 0);
    const activeAssets = digitalTwinAssets.filter((a: any) => a.statut === 'Actif').length;
    const totalAssets = digitalTwinAssets.length;

    let calculatedLoad = totalLoad;
    let calculatedLatency = 42;
    let calculatedAvailability = (activeAssets / totalAssets) * 100;
    let calculatedAlerts = digitalTwinAssets.filter((a: any) => a.statut === 'Critique').length;
    let riskLevel = 'Faible';

    setTimeout(() => {
      if (scenario === 'traffic_surge') {
        calculatedLoad = Math.round(totalLoad * 1.75);
        calculatedLatency = 150;
        calculatedAvailability = 99.9;
        calculatedAlerts = 8;
        riskLevel = 'Élevé';
      } else if (scenario === 'critical_failure') {
        calculatedLatency = 850;
        calculatedAvailability = 85.4;
        calculatedAlerts = 25;
        riskLevel = 'Critique';
      } else if (scenario === 'autoscaling') {
        const simulatedCapacity = totalCapacity * 1.3;
        calculatedLatency = 28;
        calculatedAvailability = 100.0;
        calculatedAlerts = 0;
        riskLevel = 'Nul';
      } else {
        const loadPercent = (totalLoad / totalCapacity) * 100;
        if (loadPercent > 80) riskLevel = 'Modéré';
        if (loadPercent > 90) riskLevel = 'Élevé';
      }

      const simulatedResults = {
        load: `${(calculatedLoad / 1000).toFixed(1)}k req/s`,
        loadPercent: scenario === 'autoscaling' ? '-15%' : scenario === 'traffic_surge' ? '+120%' : '+5%',
        latency: `${calculatedLatency} ms`,
        latencyTrend: scenario === 'autoscaling' ? '-33%' : scenario === 'critical_failure' ? '+2000%' : '+2%',
        availability: `${calculatedAvailability.toFixed(1)}%`,
        availabilityTrend: scenario === 'critical_failure' ? '-14.6%' : '0%',
        alerts: calculatedAlerts.toString(),
        risk: riskLevel
      };

      setResults(simulatedResults);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">

      {/* ===================== SECTION FICHIER 1 (ancien code) ===================== */}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-3xl mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Simulateur d'Infrastructure PKI
            </h2>
            <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
              Simulation et test de résistance de l'infrastructure de confiance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold disabled:opacity-50"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 animate-pulse" />
                  Calcul...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Lancer le Test
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setResults(null)}
              className="p-3 rounded-xl border border-[#00d9ff]/20 bg-[#0f0f23]/60 text-[#00d9ff] hover:bg-[#0f0f23]/80"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl h-full">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-6 h-6 text-[#00d9ff]" />
              <h3
                className="text-xl text-[#e8e9f3]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Tests de Résistance
              </h3>
            </div>

            <div className="space-y-3">
              {scenarios.map((s) => (
                <motion.button
                  key={s.id}
                  onClick={() => setScenario(s.id)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    scenario === s.id
                      ? 'border-[#00d9ff] bg-[#00d9ff]/10'
                      : 'border-[#00d9ff]/10 bg-[#0f0f23]/40 hover:border-[#00d9ff]/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[#e8e9f3] font-semibold mb-1"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {s.name}
                      </p>
                      <p className="text-[#9ca3af] text-sm">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl h-full">
            <h3
              className="text-xl mb-6 text-[#e8e9f3]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Analyse des Résultats
            </h3>

            {results ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#9ca3af] text-sm">Charge Globale</p>
                      <Activity className="w-5 h-5 text-[#00d9ff]" />
                    </div>
                    <p
                      className="text-3xl text-[#00d9ff]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {results.load}
                    </p>
                    <p className="text-xs text-[#9ca3af] mt-1">{results.loadPercent}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#9ca3af] text-sm">Latence Moyenne</p>
                      <TrendingUp className="w-5 h-5 text-[#fbbf24]" />
                    </div>
                    <p
                      className="text-3xl text-[#fbbf24]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {results.latency}
                    </p>
                    <p className="text-xs text-[#9ca3af] mt-1">{results.latencyTrend}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#9ca3af] text-sm">Disponibilité</p>
                      <Shield className="w-5 h-5 text-[#10b981]" />
                    </div>
                    <p
                      className="text-3xl text-[#10b981]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {results.availability}
                    </p>
                    <p className="text-xs text-[#9ca3af] mt-1">{results.availabilityTrend}</p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#9ca3af] text-sm">Alertes Actives</p>
                      <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
                    </div>
                    <p
                      className="text-3xl text-[#ef4444]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {results.alerts}
                    </p>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-[#00d9ff]/10 to-[#8b5cf6]/10 border border-[#00d9ff]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#9ca3af] text-sm mb-1">Niveau de Risque Infrastructure</p>
                      <p
                        className="text-2xl text-[#e8e9f3]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {results.risk}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-xl font-semibold ${
                        results.risk === 'Faible' || results.risk === 'Nul'
                          ? 'bg-[#10b981]/20 text-[#10b981]'
                          : results.risk === 'Modéré'
                          ? 'bg-[#fbbf24]/20 text-[#fbbf24]'
                          : 'bg-[#ef4444]/20 text-[#ef4444]'
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {results.risk}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-5 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                  <h4
                    className="text-lg mb-3 text-[#e8e9f3]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Plans d'Action Recommandés
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[#9ca3af]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] mt-2 flex-shrink-0" />
                      <span>Ajuster les pools de connexion sur le Load Balancer</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#9ca3af]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] mt-2 flex-shrink-0" />
                      <span>Vérifier la saturation du HSM Signature Qualifiée</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#9ca3af]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] mt-2 flex-shrink-0" />
                      <span>Optimiser le cache Redis pour réduire les latences DB</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#00d9ff]/10 flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-[#00d9ff]" />
                  </div>
                  <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
                    Sélectionnez un scénario et lancez la simulation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================== SECTION FICHIER 2 (ajoutée) ===================== */}

      {/* Header Controls (fichier 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#e8e9f3] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Optimisation Dynamique
          </h2>
          <p className="text-[#9ca3af]">Simulez et optimisez vos ressources en temps réel</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSimulating(!isSimulating)}
          className={`px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all ${
            isSimulating
              ? 'bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white'
              : 'bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a]'
          }`}
        >
          <RefreshCw className={`w-5 h-5 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? 'Arrêter Simulation' : 'Démarrer Simulation'}
        </motion.button>
      </motion.div>

      {/* Real-Time Metrics (fichier 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Efficacité Système',
            value: Math.round(realTimeMetrics.efficiency),
            unit: '%',
            icon: Gauge,
            color: '#10b981'
          },
          {
            label: 'Performance',
            value: Math.round(realTimeMetrics.performance),
            unit: '%',
            icon: TrendingUp,
            color: '#00d9ff'
          },
          {
            label: 'Coût Énergétique',
            value: Math.round(realTimeMetrics.energyCost),
            unit: '€/h',
            icon: Zap,
            color: '#fbbf24'
          },
          {
            label: 'Usage Ressources',
            value: Math.round(realTimeMetrics.resourceUsage),
            unit: '%',
            icon: Cpu,
            color: '#8b5cf6'
          }
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${metric.color}20` }}
            >
              <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-1">
              <motion.p
                className="text-3xl font-bold text-[#e8e9f3]"
                animate={isSimulating ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {metric.value}
              </motion.p>
              <span className="text-sm text-[#9ca3af]">{metric.unit}</span>
            </div>
            {isSimulating && (
              <div className="mt-3">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse inline-block mr-2" />
                <span className="text-xs text-[#10b981]">Live</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Simulation Chart (fichier 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Comparatif de Performance
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={simulationData}>
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
            <Line type="monotone" dataKey="actual" stroke="#9ca3af" strokeWidth={2} name="Réel" />
            <Line type="monotone" dataKey="predicted" stroke="#00d9ff" strokeWidth={2} name="Prédit" />
            <Line type="monotone" dataKey="optimized" stroke="#10b981" strokeWidth={3} name="Optimisé" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Optimization Scenarios (fichier 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Stratégies d'Optimisation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {optimizationScenarios.map((scenario, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-5 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60 cursor-pointer hover:border-[#00d9ff]/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
                <h4 className="text-[#e8e9f3] font-semibold">{scenario.name}</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9ca3af]">Économies</span>
                  <span className="text-sm font-bold" style={{ color: scenario.color }}>
                    {scenario.savings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9ca3af]">Efficacité</span>
                  <span className="text-sm font-bold text-[#e8e9f3]">{scenario.efficiency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9ca3af]">Impact</span>
                  <span
                    className="text-xs px-2 py-1 rounded-lg font-semibold"
                    style={{ color: scenario.color, backgroundColor: `${scenario.color}20` }}
                  >
                    {scenario.impact}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}