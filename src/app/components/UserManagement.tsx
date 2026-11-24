import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, UserPlus, Shield, Edit, Trash2, Search, Filter,
  // Nouvelles icônes AI
  Brain, Activity, ShieldAlert, UserX, Fingerprint,
  TrendingDown, Crosshair, Scan, Check, X, Save, Mail, Lock,
  // Nouvelles icônes pour le tableau
  UserCheck, UserX as UserXIcon, UserPlus as UserPlusIcon
} from 'lucide-react';

// Types
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  permissions: string[];
};

export default function UserManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddUser, setShowAddUser] = useState(false);
  
  // --- USER MANAGEMENT STATE ---
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Mohamed Benali', email: 'mohamed.benali@tuntrust.com', role: 'Admin', status: 'Actif', lastActive: '2 min', permissions: ['Tous'] },
    { id: 2, name: 'Sarah Mansouri', email: 'sarah.mansouri@tuntrust.com', role: 'Manager', status: 'Actif', lastActive: '15 min', permissions: ['Analytics', 'Agents', 'Dashboard'] },
    { id: 3, name: 'Ahmed Toumi', email: 'ahmed.toumi@tuntrust.com', role: 'Analyste', status: 'Actif', lastActive: '1h', permissions: ['Analytics', 'Dashboard'] },
    { id: 4, name: 'Fatima Gharbi', email: 'fatima.gharbi@tuntrust.com', role: 'Analyste', status: 'Inactif', lastActive: '2 jours', permissions: ['Dashboard'] },
    { id: 5, name: 'Youssef Trabelsi', email: 'youssef.trabelsi@tuntrust.com', role: 'Manager', status: 'Actif', lastActive: '30 min', permissions: ['Analytics', 'Monitoring', 'Dashboard'] }
  ]);
  
  // --- EDIT STATE ---
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', status: '' });
  
  // --- DELETE CONFIRMATION STATE ---
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);
  
  // --- ADD USER STATE ---
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Analyste', password: '' });
  const [addError, setAddError] = useState('');
  
  // --- AI TOOLS STATE ---
  const [activeAITool, setActiveAITool] = useState<string>('uba');
  const [ubaRunning, setUbaRunning] = useState(false);
  const [ubaResults, setUbaResults] = useState<any>(null);
  const [riskScanning, setRiskScanning] = useState(false);
  const [riskResults, setRiskResults] = useState<any>(null);
  const [churnPredicting, setChurnPredicting] = useState(false);
  const [churnResults, setChurnResults] = useState<any>(null);
  const [loginAnomalyScanning, setLoginAnomalyScanning] = useState(false);
  const [loginAnomalyResults, setLoginAnomalyResults] = useState<any>(null);
  
  // --- NOTIFICATION STATE ---
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const roles = [
    { name: 'Admin', color: '#ef4444', permissions: ['Tous les accès', 'Gestion utilisateurs', 'Configuration système'] },
    { name: 'Manager', color: '#8b5cf6', permissions: ['Analytics', 'Agents IA', 'Monitoring', 'Dashboard'] },
    { name: 'Analyste', color: '#00d9ff', permissions: ['Analytics', 'Dashboard', 'Lecture seule'] }
  ];

  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.name === role);
    return roleData?.color || '#9ca3af';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // ========== NOTIFICATION ==========
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // ========== EDIT USER ==========
  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;
    
    setUsers(prev => prev.map(u => 
      u.id === editingUser.id 
        ? { ...u, name: editForm.name, email: editForm.email, role: editForm.role, status: editForm.status }
        : u
    ));
    
    showNotification(`Utilisateur "${editForm.name}" modifié avec succès`, 'success');
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // ========== DELETE USER ==========
  const handleDeleteClick = (user: User) => {
    setDeleteConfirm(user);
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    
    setUsers(prev => prev.filter(u => u.id !== deleteConfirm.id));
    showNotification(`Utilisateur "${deleteConfirm.name}" supprimé`, 'success');
    setDeleteConfirm(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  // ========== ADD USER ==========
  const handleAddUser = () => {
    // Validation
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) {
      setAddError('Tous les champs sont obligatoires');
      return;
    }
    
    if (!newUser.email.includes('@')) {
      setAddError('Email invalide');
      return;
    }
    
    if (users.find(u => u.email === newUser.email)) {
      setAddError('Cet email existe déjà');
      return;
    }
    
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    const userToAdd: User = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Actif',
      lastActive: 'À l\'instant',
      permissions: roles.find(r => r.name === newUser.role)?.permissions || []
    };
    
    setUsers(prev => [...prev, userToAdd]);
    showNotification(`Utilisateur "${newUser.name}" ajouté avec succès`, 'success');
    setNewUser({ name: '', email: '', role: 'Analyste', password: '' });
    setShowAddUser(false);
    setAddError('');
  };

  // ========== AI FUNCTIONS ==========
  const runUBA = async () => {
    setUbaRunning(true);
    setUbaResults(null);
    await new Promise(r => setTimeout(r, 3000));
    setUbaResults({
      users: users.map(u => ({
        name: u.name,
        role: u.role,
        behaviorScore: (Math.random() * 40 + 60).toFixed(0),
        loginFrequency: Math.floor(Math.random() * 50 + 10) + '/jour',
        avgSessionDuration: Math.floor(Math.random() * 60 + 15) + 'min',
        unusualActions: Math.floor(Math.random() * 5),
        riskLevel: Math.random() > 0.7 ? 'Attention' : Math.random() > 0.4 ? 'Surveillance' : 'Normal'
      })),
      overallStats: {
        totalSessions: '1,247',
        avgSessionTime: '32min',
        peakUsageHour: '14h-16h',
        mostActiveUser: users[0]?.name || 'N/A',
        inactiveAccounts: users.filter(u => u.status === 'Inactif').length,
        suspiciousActivities: 3
      },
      model: 'Behavioral Sequence Analysis + Markov Chains'
    });
    setUbaRunning(false);
  };

  const runRiskScoring = async () => {
    setRiskScanning(true);
    setRiskResults(null);
    await new Promise(r => setTimeout(r, 3500));
    setRiskResults({
      users: users.map((u, i) => ({
        name: u.name,
        overallRisk: (Math.random() * 60 + i * 5).toFixed(0),
        factors: [
          { name: 'Ancienneté compte', score: (Math.random() * 40 + 30).toFixed(0), status: 'Bon' },
          { name: 'Complexité mot de passe', score: (Math.random() * 30 + 60).toFixed(0), status: 'Fort' },
          { name: 'Tentatives échouées', score: (Math.random() * 20).toFixed(0), status: 'Faible' },
          { name: 'Permissions sensibles', score: u.role === 'Admin' ? '85' : u.role === 'Manager' ? '55' : '20', status: u.role === 'Admin' ? 'Élevé' : 'Normal' },
          { name: 'Localisation suspecte', score: (Math.random() * 15).toFixed(0), status: 'Normal' }
        ],
        status: Math.random() > 0.7 ? 'À risque' : Math.random() > 0.4 ? 'Acceptable' : 'Sécurisé'
      })),
      riskDistribution: { high: 1, medium: 2, low: 2 },
      model: 'Gradient Boosting + Logistic Regression',
      averageRiskScore: '42/100',
      auditRecommendations: ['Renforcer MFA pour Admins', 'Rotation mots de passe (90 jours)', 'Restreindre accès API aux Managers']
    });
    setRiskScanning(false);
  };

  const runChurnPrediction = async () => {
    setChurnPredicting(true);
    setChurnResults(null);
    await new Promise(r => setTimeout(r, 2800));
    setChurnResults({
      users: users.map(u => ({
        name: u.name,
        churnProbability: u.status === 'Inactif' ? (Math.random() * 30 + 65).toFixed(0) : (Math.random() * 25 + 5).toFixed(0),
        daysSinceLastLogin: u.status === 'Inactif' ? '48' : Math.floor(Math.random() * 5),
        engagementScore: (Math.random() * 50 + 30).toFixed(0),
        warningSignals: u.status === 'Inactif' ? ['Inactivité prolongée', 'Aucune interaction 7j', 'Emails non ouverts'] : [],
        retentionAction: u.status === 'Inactif' ? 'Contacter immédiatement' : 'Surveillance standard'
      })),
      overallChurnRate: (Math.random() * 10 + 2).toFixed(1) + '%',
      highRiskUsers: users.filter(u => u.status === 'Inactif').length,
      predictedLoss: '€12,500/an',
      model: 'Random Forest + Survival Analysis',
      accuracy: '89.3%'
    });
    setChurnPredicting(false);
  };

  const runLoginAnomalyDetection = async () => {
    setLoginAnomalyScanning(true);
    setLoginAnomalyResults(null);
    await new Promise(r => setTimeout(r, 3200));
    setLoginAnomalyResults({
      anomalies: [
        { user: 'Ahmed Toumi', type: 'Connexion hors horaires', time: '03:45 AM', location: 'Tunis → Paris', risk: 'Moyen', ipChange: true },
        { user: 'Fatima Gharbi', type: 'Multiples échecs', time: '08:15 AM', location: 'Tunis', risk: 'Faible', attempts: 5 },
        { user: 'Mohamed Benali', type: 'Nouvel appareil', time: '11:30 AM', location: 'Tunis', risk: 'Faible', device: 'MacBook Pro' },
        { user: 'Sarah Mansouri', type: 'Connexion VPN suspect', time: '14:22 PM', location: 'Tunis → Moscou', risk: 'Élevé', ipChange: true }
      ],
      totalAnomalies: 4,
      model: 'Isolation Forest + GeoIP Analysis',
      falsePositiveRate: '1.8%',
      detectionTime: '120ms',
      geofencingAlerts: 2,
      recommendations: ['Vérifier connexion Sarah Mansouri', 'Forcer MFA pour Ahmed Toumi', 'Bloquer plage IP suspecte']
    });
    setLoginAnomalyScanning(false);
  };

  const aiTools = [
    { id: 'uba', name: 'Comportement', icon: Activity, color: '#8b5cf6', desc: 'Analyse comportementale' },
    { id: 'risk', name: 'Score Risque', icon: ShieldAlert, color: '#ef4444', desc: 'Évaluation des risques' },
    { id: 'churn', name: 'Prédiction Churn', icon: UserX, color: '#fbbf24', desc: 'Risque de départ' },
    { id: 'login', name: 'Anomalies Login', icon: Fingerprint, color: '#10b981', desc: 'Connexions suspectes' }
  ];

  // --- NOUVELLES STATS AJOUTÉES ---
  const newStats = [
    { label: 'Total Utilisateurs', value: '328', icon: Users, color: '#00d9ff' },
    { label: 'Actifs (7j)', value: '287', icon: UserCheck, color: '#10b981' },
    { label: 'Nouveaux (30j)', value: '45', icon: UserPlusIcon, color: '#fbbf24' },
    { label: 'Inactifs', value: '41', icon: UserXIcon, color: '#ef4444' }
  ];

  // --- NOUVEAUX UTILISATEURS POUR LE TABLEAU AJOUTÉ ---
  const newUsersTable = [
    { id: 101, name: 'Sophie Martin', email: 'sophie.m@example.com', role: 'Admin', status: 'Actif', avatar: 'SM' },
    { id: 102, name: 'Thomas Dubois', email: 'thomas.d@example.com', role: 'Utilisateur', status: 'Actif', avatar: 'TD' },
    { id: 103, name: 'Marie Laurent', email: 'marie.l@example.com', role: 'Analyste', status: 'Actif', avatar: 'ML' },
    { id: 104, name: 'Pierre Bernard', email: 'pierre.b@example.com', role: 'Utilisateur', status: 'Inactif', avatar: 'PB' }
  ];

  return (
    <div className="space-y-6 relative">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl ${
              notification.type === 'success' ? 'bg-[#10b981] text-white' : 'bg-[#ef4444] text-white'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {notification.type === 'success' ? (
              <Check className="w-4 h-4 inline mr-2" />
            ) : (
              <X className="w-4 h-4 inline mr-2" />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#00d9ff]/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#00d9ff]" />
            </div>
            <div>
              <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Gestion des Utilisateurs
              </h2>
              <p className="text-[#9ca3af]" style={{ fontFamily: 'var(--font-body)' }}>
                {users.length} utilisateurs · {users.filter(u => u.status === 'Actif').length} actifs
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddUser(!showAddUser)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <UserPlus className="w-5 h-5" />
            Ajouter Utilisateur
          </motion.button>
        </div>
      </motion.div>

      {/* Nouvelles Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newStats.map((stat, i) => (
          <motion.div
            key={`new-stat-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.15 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <p className="text-[#9ca3af] text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[#e8e9f3]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Add User Form */}
      <AnimatePresence>
        {showAddUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-2xl border border-[#10b981]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
              <h3 className="text-xl text-[#e8e9f3] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Ajouter un Utilisateur</h3>
              
              {addError && (
                <div className="mb-4 p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] text-sm">
                  {addError}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Nom complet</label>
                  <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Nom et prénom"
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm focus:border-[#00d9ff] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Email</label>
                  <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="email@tuntrust.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm focus:border-[#00d9ff] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Rôle</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm focus:border-[#00d9ff] focus:outline-none">
                    {roles.map(r => (
                      <option key={r.name} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Mot de passe</label>
                  <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm focus:border-[#00d9ff] focus:outline-none" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleAddUser}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-sm flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setShowAddUser(false); setAddError(''); }}
                  className="px-6 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#9ca3af] text-sm">
                  Annuler
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a1a]/80 backdrop-blur-sm"
            onClick={handleCancelEdit}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-2xl border border-[#00d9ff]/30 bg-[#0f0f23] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl text-[#e8e9f3] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Modifier l'Utilisateur
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Nom</label>
                  <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm focus:border-[#00d9ff] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Email</label>
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm focus:border-[#00d9ff] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Rôle</label>
                  <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm focus:border-[#00d9ff] focus:outline-none">
                    {roles.map(r => (
                      <option key={r.name} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#9ca3af] block mb-1">Statut</label>
                  <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm focus:border-[#00d9ff] focus:outline-none">
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleSaveEdit}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-bold text-sm">
                  Sauvegarder
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleCancelEdit}
                  className="px-6 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#9ca3af] text-sm">
                  Annuler
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a1a]/80 backdrop-blur-sm"
            onClick={handleCancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 rounded-2xl border border-[#ef4444]/30 bg-[#0f0f23] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#ef4444]/20 flex items-center justify-center mx-auto mb-3">
                  <Trash2 className="w-8 h-8 text-[#ef4444]" />
                </div>
                <h3 className="text-xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
                  Confirmer la suppression
                </h3>
                <p className="text-[#9ca3af] text-sm mt-2">
                  Êtes-vous sûr de vouloir supprimer <br />
                  <span className="text-[#e8e9f3] font-semibold">{deleteConfirm.name}</span> ?
                </p>
                <p className="text-[#ef4444] text-xs mt-2">Cette action est irréversible.</p>
              </div>
              
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleConfirmDelete}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white font-bold text-sm">
                  Supprimer
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleCancelDelete}
                  className="flex-1 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#9ca3af] text-sm">
                  Annuler
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]/60" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom ou email..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#9ca3af]/50 focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/20"
              style={{ fontFamily: 'var(--font-body)' }} />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00d9ff]/60" />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] focus:border-[#00d9ff] focus:outline-none focus:ring-2 focus:ring-[#00d9ff]/20 appearance-none cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}>
              <option value="all">Tous les rôles</option>
              {roles.map(role => (
                <option key={role.name} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Roles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <motion.div key={role.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.05 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${role.color}20` }}>
                <Shield className="w-5 h-5" style={{ color: role.color }} />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#e8e9f3]" style={{ fontFamily: 'var(--font-body)' }}>{role.name}</p>
                <p className="text-sm text-[#9ca3af]">{users.filter(u => u.role === role.name).length} utilisateurs</p>
              </div>
            </div>
            <div className="space-y-2">
              {role.permissions.map((perm, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.color }} />
                  {perm}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Users Table Existant */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#00d9ff]/20">
                <th className="text-left py-4 px-4 text-[#9ca3af] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>Utilisateur</th>
                <th className="text-left py-4 px-4 text-[#9ca3af] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>Rôle</th>
                <th className="text-left py-4 px-4 text-[#9ca3af] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>Statut</th>
                <th className="text-left py-4 px-4 text-[#9ca3af] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>Dernière activité</th>
                <th className="text-left py-4 px-4 text-[#9ca3af] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr key={user.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + index * 0.05 }}
                  className="border-b border-[#00d9ff]/10 hover:bg-[#00d9ff]/5 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>{user.name}</p>
                      <p className="text-sm text-[#9ca3af]">{user.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-lg text-sm font-semibold"
                      style={{ fontFamily: 'var(--font-body)', backgroundColor: `${getRoleColor(user.role)}20`, color: getRoleColor(user.role) }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Actif' ? 'bg-[#10b981]' : 'bg-[#9ca3af]'}`} />
                      <span className="text-[#e8e9f3] text-sm" style={{ fontFamily: 'var(--font-body)' }}>{user.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[#9ca3af] text-sm">{user.lastActive}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditClick(user)}
                        className="p-2 rounded-lg bg-[#00d9ff]/10 text-[#00d9ff] hover:bg-[#00d9ff]/20 transition-colors"
                        title="Modifier">
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 rounded-lg bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors"
                        title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#9ca3af]">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* NOUVEAU TABLEAU UTILISATEURS AJOUTÉ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
            Gestion des Utilisateurs (Vue complémentaire)
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Ajouter Utilisateur
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#00d9ff]/10">
                <th className="text-left py-3 px-4 text-[#9ca3af] font-semibold text-sm">Utilisateur</th>
                <th className="text-left py-3 px-4 text-[#9ca3af] font-semibold text-sm">Email</th>
                <th className="text-left py-3 px-4 text-[#9ca3af] font-semibold text-sm">Rôle</th>
                <th className="text-left py-3 px-4 text-[#9ca3af] font-semibold text-sm">Statut</th>
                <th className="text-left py-3 px-4 text-[#9ca3af] font-semibold text-sm">Actions</th>
               </tr>
            </thead>
            <tbody>
              {newUsersTable.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-[#00d9ff]/5 hover:bg-[#00d9ff]/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#8b5cf6] flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{user.avatar}</span>
                      </div>
                      <span className="text-[#e8e9f3] font-semibold">{user.name}</span>
                    </div>
                   </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#9ca3af]" />
                      <span className="text-[#9ca3af] text-sm">{user.email}</span>
                    </div>
                   </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#8b5cf6]" />
                      <span className="text-[#e8e9f3] text-sm">{user.role}</span>
                    </div>
                   </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        user.status === 'Actif'
                          ? 'bg-[#10b981]/20 text-[#10b981]'
                          : 'bg-[#9ca3af]/20 text-[#9ca3af]'
                      }`}
                    >
                      {user.status}
                    </span>
                   </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 rounded-lg bg-[#00d9ff]/10 text-[#00d9ff] hover:bg-[#00d9ff]/20 transition-colors text-sm">
                        Modifier
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors text-sm">
                        Supprimer
                      </button>
                    </div>
                   </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ========== SECTION AI - USER INTELLIGENCE ========== */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-[#8b5cf6]" />
          </div>
          <div>
            <h3 className="text-2xl text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>Intelligence Utilisateur IA</h3>
            <p className="text-[#9ca3af] text-sm" style={{ fontFamily: 'var(--font-body)' }}>Analyse comportementale, risques et prédictions</p>
          </div>
        </div>

        {/* AI Tool Selector */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {aiTools.map((tool) => (
            <motion.button key={tool.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActiveAITool(tool.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                activeAITool === tool.id ? 'border-[#00d9ff] bg-[#00d9ff]/10 shadow-lg shadow-[#00d9ff]/5' : 'border-[#00d9ff]/20 bg-[#0f0f23]/40 hover:border-[#00d9ff]/40'
              }`}>
              <tool.icon className="w-6 h-6 mx-auto mb-2" style={{ color: tool.color }} />
              <p className="text-xs text-[#e8e9f3] font-semibold">{tool.name}</p>
              <p className="text-[10px] text-[#6b7280] mt-1">{tool.desc}</p>
            </motion.button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {/* UBA */}
          {activeAITool === 'uba' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg text-[#e8e9f3] flex items-center gap-2"><Activity className="w-5 h-5 text-[#8b5cf6]" />Analyse Comportementale (UBA)</h4>
                <motion.button whileTap={{ scale: 0.95 }} onClick={runUBA} disabled={ubaRunning}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {ubaRunning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Brain className="w-4 h-4" />}Analyser
                </motion.button>
              </div>
              {ubaResults && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10 text-center"><p className="text-[10px] text-[#6b7280]">Sessions</p><p className="text-lg text-[#e8e9f3] font-bold">{ubaResults.overallStats.totalSessions}</p></div>
                    <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/10 text-center"><p className="text-[10px] text-[#6b7280]">Heure de pointe</p><p className="text-lg text-[#fbbf24] font-bold">{ubaResults.overallStats.peakUsageHour}</p></div>
                    <div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10 text-center"><p className="text-[10px] text-[#6b7280]">Suspects</p><p className="text-lg text-[#ef4444] font-bold">{ubaResults.overallStats.suspiciousActivities}</p></div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {ubaResults.users.map((u: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/10">
                        <div className="flex items-center justify-between mb-2"><span className="text-xs text-[#e8e9f3] font-semibold">{u.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${u.riskLevel === 'Attention' ? 'bg-[#ef4444]/20 text-[#ef4444]' : u.riskLevel === 'Surveillance' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-[#10b981]/20 text-[#10b981]'}`}>{u.riskLevel}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[10px]"><div><span className="text-[#6b7280]">Score: </span><span className="text-[#e8e9f3]">{u.behaviorScore}%</span></div><div><span className="text-[#6b7280]">Fréq: </span><span className="text-[#e8e9f3]">{u.loginFrequency}</span></div><div><span className="text-[#6b7280]">Durée: </span><span className="text-[#e8e9f3]">{u.avgSessionDuration}</span></div></div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* RISK SCORING */}
          {activeAITool === 'risk' && (
            <div>
              <div className="flex items-center justify-between mb-4"><h4 className="text-lg text-[#e8e9f3] flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-[#ef4444]" />Score de Risque Utilisateur</h4>
                <motion.button whileTap={{ scale: 0.95 }} onClick={runRiskScoring} disabled={riskScanning}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {riskScanning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Crosshair className="w-4 h-4" />}Évaluer Risques
                </motion.button>
              </div>
              {riskResults && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#ef4444]/20 text-center"><p className="text-[10px] text-[#6b7280]">Score de Risque Moyen</p><p className="text-3xl text-[#ef4444] font-bold">{riskResults.averageRiskScore}</p></div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {riskResults.users.map((u: any, i: number) => (
                      <div key={i} className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10">
                        <div className="flex items-center justify-between mb-2"><span className="text-xs text-[#e8e9f3] font-semibold">{u.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-semibold ${u.status === 'À risque' ? 'bg-[#ef4444]/20 text-[#ef4444]' : u.status === 'Acceptable' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-[#10b981]/20 text-[#10b981]'}`}>{u.status}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-[10px]">{u.factors.slice(0, 3).map((f: any, j: number) => (<div key={j} className="flex justify-between"><span className="text-[#6b7280]">{f.name}</span><span className="text-[#e8e9f3]">{f.score}/100</span></div>))}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20"><p className="text-xs text-[#10b981] font-semibold mb-2">Recommandations d'Audit:</p>{riskResults.auditRecommendations.map((r: string, i: number) => (<div key={i} className="flex items-center gap-2 text-xs text-[#9ca3af] mb-1"><div className="w-1 h-1 rounded-full bg-[#10b981]" />{r}</div>))}</div>
                </motion.div>
              )}
            </div>
          )}

          {/* CHURN PREDICTION */}
          {activeAITool === 'churn' && (
            <div>
              <div className="flex items-center justify-between mb-4"><h4 className="text-lg text-[#e8e9f3] flex items-center gap-2"><UserX className="w-5 h-5 text-[#fbbf24]" />Prédiction de Churn</h4>
                <motion.button whileTap={{ scale: 0.95 }} onClick={runChurnPrediction} disabled={churnPredicting}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {churnPredicting ? <div className="w-4 h-4 border-2 border-[#0a0a1a] border-t-transparent rounded-full animate-spin" /> : <TrendingDown className="w-4 h-4" />}Prédire Churn
                </motion.button>
              </div>
              {churnResults && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3"><div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/10 text-center"><p className="text-[10px] text-[#6b7280]">Taux Churn</p><p className="text-lg text-[#fbbf24] font-bold">{churnResults.overallChurnRate}</p></div><div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#ef4444]/10 text-center"><p className="text-[10px] text-[#6b7280]">Haut Risque</p><p className="text-lg text-[#ef4444] font-bold">{churnResults.highRiskUsers}</p></div><div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center"><p className="text-[10px] text-[#6b7280]">Précision</p><p className="text-lg text-[#10b981] font-bold">{churnResults.accuracy}</p></div></div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {churnResults.users.map((u: any, i: number) => (
                      <div key={i} className={`p-3 rounded-lg border ${parseFloat(u.churnProbability) > 50 ? 'bg-[#ef4444]/5 border-[#ef4444]/20' : 'bg-[#0f0f23]/60 border-[#00d9ff]/10'}`}>
                        <div className="flex items-center justify-between mb-2"><span className="text-xs text-[#e8e9f3] font-semibold">{u.name}</span><span className={`text-xs font-bold ${parseFloat(u.churnProbability) > 50 ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>{u.churnProbability}%</span></div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]"><div><span className="text-[#6b7280]">Engagement: </span><span className="text-[#e8e9f3]">{u.engagementScore}%</span></div><div><span className="text-[#6b7280]">Inactif: </span><span className="text-[#e8e9f3]">{u.daysSinceLastLogin}j</span></div></div>
                        {u.warningSignals.length > 0 && (<div className="mt-2 pt-2 border-t border-[#ef4444]/10"><p className="text-[10px] text-[#ef4444] font-semibold">⚠️ {u.retentionAction}</p></div>)}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* LOGIN ANOMALIES */}
          {activeAITool === 'login' && (
            <div>
              <div className="flex items-center justify-between mb-4"><h4 className="text-lg text-[#e8e9f3] flex items-center gap-2"><Fingerprint className="w-5 h-5 text-[#10b981]" />Détection Anomalies de Connexion</h4>
                <motion.button whileTap={{ scale: 0.95 }} onClick={runLoginAnomalyDetection} disabled={loginAnomalyScanning}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {loginAnomalyScanning ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Scan className="w-4 h-4" />}Scanner
                </motion.button>
              </div>
              {loginAnomalyResults && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-3 gap-3"><div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center"><p className="text-[10px] text-[#6b7280]">Anomalies</p><p className="text-lg text-[#ef4444] font-bold">{loginAnomalyResults.totalAnomalies}</p></div><div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/10 text-center"><p className="text-[10px] text-[#6b7280]">Faux Positifs</p><p className="text-lg text-[#10b981] font-bold">{loginAnomalyResults.falsePositiveRate}</p></div><div className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/10 text-center"><p className="text-[10px] text-[#6b7280]">Geofencing</p><p className="text-lg text-[#fbbf24] font-bold">{loginAnomalyResults.geofencingAlerts}</p></div></div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {loginAnomalyResults.anomalies.map((a: any, i: number) => (
                      <div key={i} className={`p-3 rounded-lg border ${a.risk === 'Élevé' ? 'bg-[#ef4444]/5 border-[#ef4444]/20' : a.risk === 'Moyen' ? 'bg-[#fbbf24]/5 border-[#fbbf24]/20' : 'bg-[#0f0f23]/60 border-[#00d9ff]/10'}`}>
                        <div className="flex items-center justify-between mb-2"><span className="text-xs text-[#e8e9f3] font-semibold">{a.user}</span><span className={`text-xs px-2 py-0.5 rounded font-semibold ${a.risk === 'Élevé' ? 'bg-[#ef4444]/20 text-[#ef4444]' : a.risk === 'Moyen' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-[#10b981]/20 text-[#10b981]'}`}>{a.risk}</span></div>
                        <p className="text-xs text-[#9ca3af] mb-2">{a.type}</p>
                        <div className="grid grid-cols-2 gap-2 text-[10px]"><div><span className="text-[#6b7280]">Heure: </span><span className="text-[#e8e9f3]">{a.time}</span></div><div><span className="text-[#6b7280]">Lieu: </span><span className="text-[#e8e9f3]">{a.location}</span></div></div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20"><p className="text-xs text-[#10b981] font-semibold mb-2">Actions Recommandées:</p>{loginAnomalyResults.recommendations.map((r: string, i: number) => (<div key={i} className="flex items-center gap-2 text-xs text-[#9ca3af] mb-1"><div className="w-1 h-1 rounded-full bg-[#10b981]" />{r}</div>))}</div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}