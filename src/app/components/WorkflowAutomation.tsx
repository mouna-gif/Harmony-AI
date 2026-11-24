import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Workflow,
  Play,
  Pause,
  CheckCircle,
  Clock,
  Zap,
  GitBranch,
  Settings,
  Plus,
  XCircle,
  Trash2,
  Edit,
  X
} from 'lucide-react';

export default function WorkflowAutomation() {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Onboarding Automatique',
      status: 'active',
      triggers: 3,
      actions: 8,
      executions: 247,
      success_rate: 98.4,
      avg_time: '2.3min',
      last_run: '5 min'
    },
    {
      id: 2,
      name: 'Provisionnement Ressources',
      status: 'active',
      triggers: 2,
      actions: 12,
      executions: 189,
      success_rate: 96.8,
      avg_time: '4.5min',
      last_run: '1h'
    },
    {
      id: 3,
      name: 'Détection & Résolution Incidents',
      status: 'active',
      triggers: 5,
      actions: 15,
      executions: 456,
      success_rate: 94.2,
      avg_time: '1.2min',
      last_run: '15 min'
    },
    {
      id: 4,
      name: 'Nettoyage Données Hebdomadaire',
      status: 'paused',
      triggers: 1,
      actions: 6,
      executions: 52,
      success_rate: 99.1,
      avg_time: '12.4min',
      last_run: '3 jours'
    }
  ]);

  // État pour le modal de création de workflow
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    triggers: 1,
    actions: 1,
    description: ''
  });
  const [formError, setFormError] = useState('');

  const workflowTemplates = [
    {
      id: 1,
      name: 'CI/CD Pipeline',
      category: 'DevOps',
      description: 'Build, test et déploiement automatique',
      steps: 10,
      popularity: 'Très populaire'
    },
    {
      id: 2,
      name: 'Alerte & Escalade',
      category: 'Monitoring',
      description: 'Détection anomalie + notification équipe',
      steps: 6,
      popularity: 'Populaire'
    },
    {
      id: 3,
      name: 'Backup & Recovery',
      category: 'Infrastructure',
      description: 'Sauvegarde automatique multi-cloud',
      steps: 8,
      popularity: 'Recommandé'
    },
    {
      id: 4,
      name: 'Compliance Check',
      category: 'Sécurité',
      description: 'Vérification RGPD + reporting',
      steps: 12,
      popularity: 'Nouveau'
    }
  ];

  const recentExecutions = [
    {
      id: 1,
      workflow: 'Onboarding Automatique',
      status: 'success',
      duration: '2.1min',
      trigger: 'Nouveau utilisateur',
      time: '3 min'
    },
    {
      id: 2,
      workflow: 'Détection & Résolution Incidents',
      status: 'success',
      duration: '0.8min',
      trigger: 'Anomalie CPU',
      time: '12 min'
    },
    {
      id: 3,
      workflow: 'Provisionnement Ressources',
      status: 'running',
      duration: '3.2min',
      trigger: 'API call',
      time: 'En cours'
    },
    {
      id: 4,
      workflow: 'Onboarding Automatique',
      status: 'failed',
      duration: '1.5min',
      trigger: 'Nouveau utilisateur',
      time: '45 min'
    }
  ];

  const automationStats = [
    { label: 'Automatisations Actives', value: workflows.filter(w => w.status === 'active').length.toString(), icon: Workflow, color: '#00d9ff' },
    { label: 'Tâches (24h)', value: '1,247', icon: Play, color: '#10b981' },
    { label: 'Temps Économisé', value: '145h', icon: Clock, color: '#fbbf24' },
    { label: 'Taux de Succès', value: '96.8%', icon: CheckCircle, color: '#8b5cf6' }
  ];

  const toggleWorkflowStatus = (id: number) => {
    setWorkflows(
      workflows.map((w) =>
        w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w
      )
    );
  };

  const deleteWorkflow = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce workflow ?')) {
      setWorkflows(workflows.filter(w => w.id !== id));
    }
  };

  const handleCreateWorkflow = () => {
    // Validation
    if (!newWorkflow.name.trim()) {
      setFormError('Le nom du workflow est obligatoire');
      return;
    }

    const newId = Math.max(...workflows.map(w => w.id), 0) + 1;
    const workflowToAdd = {
      id: newId,
      name: newWorkflow.name,
      status: 'active',
      triggers: newWorkflow.triggers,
      actions: newWorkflow.actions,
      executions: 0,
      success_rate: 100,
      avg_time: '0min',
      last_run: 'Jamais'
    };

    setWorkflows([...workflows, workflowToAdd]);
    setNewWorkflow({ name: '', triggers: 1, actions: 1, description: '' });
    setShowCreateModal(false);
    setFormError('');
  };

  const handleUseTemplate = (template: any) => {
    setNewWorkflow({
      name: template.name,
      triggers: Math.ceil(template.steps / 2),
      actions: template.steps,
      description: template.description
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Modal de création de workflow */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a1a]/80 backdrop-blur-sm"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md p-6 rounded-2xl border border-[#00d9ff]/30 bg-[#0f0f23] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                Créer une Automatisation
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-[#00d9ff]/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#9ca3af]" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] text-sm">
                {formError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#9ca3af] block mb-1">Nom de l'automatisation</label>
                <input
                  type="text"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  placeholder="Ex: Déploiement Automatique"
                  className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm focus:border-[#00d9ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[#9ca3af] block mb-1">Nombre de triggers</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newWorkflow.triggers}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, triggers: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm focus:border-[#00d9ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[#9ca3af] block mb-1">Nombre d'actions</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newWorkflow.actions}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, actions: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm focus:border-[#00d9ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[#9ca3af] block mb-1">Description (optionnelle)</label>
                <textarea
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                  placeholder="Description du workflow..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm resize-none focus:border-[#00d9ff] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateWorkflow}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Créer
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(false)}
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
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#e8e9f3] mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
            <Workflow className="w-8 h-8 text-[#00d9ff]" />
            Gestion des Automatisations
          </h2>
          <p className="text-[#9ca3af]">Orchestration intelligente de processus métier</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="w-full md:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Créer une Automatisation
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {automationStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Workflows */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Automatisations Actives
        </h3>
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="p-5 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60 hover:border-[#00d9ff]/30 transition-all"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h4 className="text-lg font-bold text-[#e8e9f3]">{workflow.name}</h4>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        workflow.status === 'active'
                          ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/20'
                          : 'bg-[#9ca3af]/20 text-[#9ca3af] border-[#9ca3af]/20'
                      }`}
                    >
                      {workflow.status === 'active' ? 'Actif' : 'En pause'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wider mb-1">Triggers</p>
                      <p className="text-[#e8e9f3] font-semibold">{workflow.triggers}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wider mb-1">Actions</p>
                      <p className="text-[#e8e9f3] font-semibold">{workflow.actions}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wider mb-1">Exécutions</p>
                      <p className="text-[#e8e9f3] font-semibold">{workflow.executions}</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wider mb-1">Succès</p>
                      <p className="text-[#10b981] font-semibold">{workflow.success_rate}%</p>
                    </div>
                    <div>
                      <p className="text-[#9ca3af] text-[10px] uppercase tracking-wider mb-1">Temps moyen</p>
                      <p className="text-[#00d9ff] font-semibold">{workflow.avg_time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleWorkflowStatus(workflow.id)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      workflow.status === 'active'
                        ? 'bg-[#fbbf24]/10 text-[#fbbf24] hover:bg-[#fbbf24]/20 border border-[#fbbf24]/20'
                        : 'bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20 border border-[#10b981]/20'
                    }`}
                  >
                    {workflow.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl bg-[#00d9ff]/10 text-[#00d9ff] hover:bg-[#00d9ff]/20 transition-colors border border-[#00d9ff]/20"
                  >
                    <Settings className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteWorkflow(workflow.id)}
                    className="p-2.5 rounded-xl bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors border border-[#ef4444]/20"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#9ca3af] border-t border-[#00d9ff]/5 pt-3">
                <Clock className="w-3 h-3" />
                <span>Dernière exécution: {workflow.last_run}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Workflow Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Bibliothèque de Modèles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              onClick={() => handleUseTemplate(template)}
              className="p-5 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60 hover:border-[#00d9ff]/30 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <GitBranch className="w-5 h-5 text-[#00d9ff] group-hover:scale-110 transition-transform" />
                <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/20">
                  {template.category}
                </span>
              </div>
              <h4 className="text-[#e8e9f3] font-semibold mb-2 leading-tight">{template.name}</h4>
              <p className="text-xs text-[#9ca3af] mb-4 h-8 overflow-hidden text-ellipsis">{template.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-[#9ca3af]">{template.steps} étapes</span>
                <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/20">
                  {template.popularity}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Executions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
          <Zap className="w-6 h-6 text-[#fbbf24]" />
          Historique des Actions
        </h3>
        <div className="space-y-3">
          {recentExecutions.map((exec) => (
            <div
              key={exec.id}
              className="p-4 rounded-xl border border-[#00d9ff]/10 bg-[#0f0f23]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    exec.status === 'success'
                      ? 'bg-[#10b981]/20'
                      : exec.status === 'running'
                      ? 'bg-[#00d9ff]/20'
                      : 'bg-[#ef4444]/20'
                  }`}
                >
                  {exec.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-[#10b981]" />
                  ) : exec.status === 'running' ? (
                    <Play className="w-5 h-5 text-[#00d9ff] fill-current" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#ef4444]" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[#e8e9f3] font-semibold mb-1 truncate">{exec.workflow}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#9ca3af]">
                    <span>Trigger: {exec.trigger}</span>
                    <span className="hidden sm:inline text-[#00d9ff]/50">•</span>
                    <span>Durée: {exec.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border ${
                    exec.status === 'success'
                      ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/20'
                      : exec.status === 'running'
                      ? 'bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/20'
                      : 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/20'
                  }`}
                >
                  {exec.status === 'success' ? 'Succès' : exec.status === 'running' ? 'En cours' : 'Échec'}
                </span>
                <p className="text-xs text-[#9ca3af] whitespace-nowrap">{exec.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}