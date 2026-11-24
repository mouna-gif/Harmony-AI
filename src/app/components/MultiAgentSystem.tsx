import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, TrendingUp, Zap, MessageSquare, Send, Sparkles, 
  Upload, FileText, Trash2, Loader2, Globe, 
  Cpu, Sliders, GitBranch, Database, Bot, Wand2, 
  Layers, BarChart3, Code2, Play, Save, Copy, 
  RefreshCw, Settings2, ArrowRight, CheckCircle2,
  XCircle, AlertTriangle, Search,
  // Nouvelles icônes ajoutées
  CheckCircle, Activity, Sigma, Network, Microscope, Shield, Workflow, Dices
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
type Language = 'fr' | 'ar' | 'tn';
type UploadedFile = { id: string; name: string; size: number; status: 'pending' | 'analyzing' | 'done' };
type LLMModel = 'gpt-4' | 'claude' | 'llama' | 'mistral' | 'gemini';
type PromptTemplate = {
  id: string;
  name: string;
  description: string;
  template: string;
  category: 'analysis' | 'generation' | 'summarization' | 'translation' | 'code';
};

// --- TABLE DE TRADUCTION (FR / AR / TN) ---
const translations: Record<Language, Record<string, string>> = {
  fr: {
    agentsTitle: "Catalogue des Experts",
    selectAgent: "Sélectionnez un expert",
    chatPlaceholder: "Écrivez votre message...",
    startChat: "Commencez une conversation...",
    aiTitle: "Traitement de Données",
    uploadTitle: "Télécharger Fichiers",
    uploadDesc: "Glissez vos fichiers Excel, PDF ou CSV ici.",
    analyze: "Lancer l'Analyse IA",
    processing: "Traitement de l'analyse en cours...",
    analyzing: "Analyse du fichier...",
    finished: "Terminé",
    processingSteps: [
      "Initialisation du modèle...",
      "Extraction des données...",
      "Analyse sémantique...",
      "Génération des insights..."
    ],
    fileDetected: "Fichier détecté :",
    ready: "Prêt",
    // LLM Section
    generativeAITitle: "Générateur de Contenu IA",
    selectModel: "Sélectionner un modèle LLM",
    promptEngineering: "Prompt Engineering",
    enterPrompt: "Entrez votre prompt...",
    systemPrompt: "Prompt système",
    temperature: "Température",
    maxTokens: "Tokens max",
    topP: "Top P",
    frequencyPenalty: "Pénalité de fréquence",
    generate: "Générer",
    generating: "Génération en cours...",
    embeddingsTitle: "Recherche Sémantique",
    computeEmbedding: "Calculer Vecteurs",
    similaritySearch: "Recherche de similarité",
    embeddingDimensions: "Dimensions : 1536",
    cosineSimilarity: "Similarité cosinus :",
    fineTuningTitle: "Entraînement Personnalisé",
    uploadDataset: "Upload Dataset",
    startTraining: "Démarrer l'entraînement",
    trainingProgress: "Progression entraînement",
    epochs: "Epochs",
    learningRate: "Learning Rate",
    batchSize: "Batch Size",
    loss: "Loss",
    accuracy: "Accuracy",
    chatbotTitle: "Configuration de l'Assistant",
    personality: "Personnalité",
    knowledgeBase: "Base de connaissances",
    contextWindow: "Fenêtre de contexte",
    responseStyle: "Style de réponse",
    templates: "Templates",
    useTemplate: "Utiliser",
    savePrompt: "Sauvegarder",
    clearPrompt: "Effacer",
    result: "Résultat",
    copyResult: "Copier"
  },
  ar: {
    agentsTitle: "دليل الخبراء",
    selectAgent: "اختر خبيراً",
    chatPlaceholder: "اكتب رسالتك...",
    startChat: "ابدأ المحادثة...",
    aiTitle: "معالجة البيانات",
    uploadTitle: "تحميل الملفات",
    uploadDesc: "اسحب ملفات Excel أو PDF أو CSV هنا.",
    analyze: "تشغيل تحليل الذكاء الاصطناعي",
    processing: "جاري معالجة التحليل...",
    analyzing: "تحليل الملف...",
    finished: "مكتمل",
    processingSteps: [
      "بدء تشغيل النموذج...",
      "استخراج البيانات...",
      "التحليل الدلالي...",
      "توليد الأفكار..."
    ],
    fileDetected: "تم اكتشاف ملف:",
    ready: "جاهز",
    generativeAITitle: "مولد محتوى الذكاء الاصطناعي",
    selectModel: "اختر نموذج اللغة",
    promptEngineering: "هندسة الأوامر",
    enterPrompt: "أدخل الأمر...",
    systemPrompt: "أمر النظام",
    temperature: "درجة الحرارة",
    maxTokens: "الحد الأقصى للرموز",
    topP: "Top P",
    frequencyPenalty: "عقوبة التكرار",
    generate: "توليد",
    generating: "جاري التوليد...",
    embeddingsTitle: "البحث الدلالي",
    computeEmbedding: "حساب المتجهات",
    similaritySearch: "بحث التشابه",
    embeddingDimensions: "الأبعاد: 1536",
    cosineSimilarity: "تشابه جيب التمام:",
    fineTuningTitle: "التدريب المخصص",
    uploadDataset: "رفع مجموعة البيانات",
    startTraining: "بدء التدريب",
    trainingProgress: "تقدم التدريب",
    epochs: "الحقبات",
    learningRate: "معدل التعلم",
    batchSize: "حجم الدفعة",
    loss: "الخسارة",
    accuracy: "الدقة",
    chatbotTitle: "إعداد المساعد",
    personality: "الشخصية",
    knowledgeBase: "قاعدة المعرفة",
    contextWindow: "نافذة السياق",
    responseStyle: "أسلوب الرد",
    templates: "القوالب",
    useTemplate: "استخدام",
    savePrompt: "حفظ",
    clearPrompt: "مسح",
    result: "النتيجة",
    copyResult: "نسخ"
  },
  tn: {
    agentsTitle: "Catalogue Experts",
    selectAgent: "Khtar expert",
    chatPlaceholder: "Ektib messajtek...",
    startChat: "Bda t3awed...",
    aiTitle: "Traitement Data",
    uploadTitle: "Upload Fichiers",
    uploadDesc: "Hath fchiyer Excel, PDF w CSV hna.",
    analyze: "Sib Analyse AI",
    processing: "Traitement analyse yetsir...",
    analyzing: "Analyse f fchiyer...",
    finished: "Tamm",
    processingSteps: [
      "Badw Model...",
      "Extraction data...",
      "Analyse semantique...",
      "Generation insights..."
    ],
    fileDetected: "Fichier matleb :",
    ready: "Jez",
    generativeAITitle: "Generateur Content AI",
    selectModel: "Khtar LLM model",
    promptEngineering: "Prompt Engineering",
    enterPrompt: "Ektib promptek...",
    systemPrompt: "System prompt",
    temperature: "Temperature",
    maxTokens: "Max tokens",
    topP: "Top P",
    frequencyPenalty: "Frequency Penalty",
    generate: "Generate",
    generating: "Generation mchaaya...",
    embeddingsTitle: "Recherche Semantique",
    computeEmbedding: "7seb Vecteurs",
    similaritySearch: "Similarity search",
    embeddingDimensions: "Dimensions : 1536",
    cosineSimilarity: "Cosine similarity :",
    fineTuningTitle: "Training Personalisé",
    uploadDataset: "Upload dataset",
    startTraining: "Bda training",
    trainingProgress: "Avancement training",
    epochs: "Epochs",
    learningRate: "Learning Rate",
    batchSize: "Batch Size",
    loss: "Loss",
    accuracy: "Accuracy",
    chatbotTitle: "Config Assistant",
    personality: "Personnalité",
    knowledgeBase: "Base connaissance",
    contextWindow: "Fenetre contexte",
    responseStyle: "Style réponse",
    templates: "Templates",
    useTemplate: "Utiliser",
    savePrompt: "Save",
    clearPrompt: "Effacer",
    result: "Resultat",
    copyResult: "Copier"
  }
};

// --- PROMPT TEMPLATES ---
const promptTemplates: PromptTemplate[] = [
  {
    id: 't1',
    name: 'Analyse de données',
    description: 'Template pour analyser des données structurées',
    template: 'Analyse les données suivantes et fournis des insights détaillés sur les tendances, anomalies et recommandations :\n\n{donnees}\n\nFormat souhaité :\n- Résumé exécutif\n- Tendances clés\n- Anomalies détectées\n- Recommandations',
    category: 'analysis'
  },
  {
    id: 't2',
    name: 'Génération de rapport',
    description: 'Template pour générer des rapports professionnels',
    template: 'Génère un rapport professionnel complet sur le sujet suivant : {sujet}\n\nInclus :\n- Contexte\n- Analyse\n- Statistiques (si applicable)\n- Conclusions\n- Prochaines étapes',
    category: 'generation'
  },
  {
    id: 't3',
    name: 'Résumé exécutif',
    description: 'Template pour résumer des documents longs',
    template: 'Résume le texte suivant en {nombre} points clés, en conservant les informations essentielles :\n\n{texte}\n\nFormat :\n- Points listés avec emoji pour chaque catégorie\n- Un paragraphe de synthèse en fin',
    category: 'summarization'
  },
  {
    id: 't4',
    name: 'Traduction contextuelle',
    description: 'Template pour traduction avec contexte métier',
    template: 'Traduis le texte suivant de {source} vers {cible} en tenant compte du contexte métier {contexte} :\n\n{texte}\n\nGarde la terminologie technique précise.',
    category: 'translation'
  },
  {
    id: 't5',
    name: 'Code Review & Optimisation',
    description: 'Template pour review et optimiser du code',
    template: 'Analyse le code suivant et propose des optimisations :\n\n```{langage}\n{code}\n```\n\nCritères :\n- Performance\n- Lisibilité\n- Sécurité\n- Best practices\n\nFournis le code optimisé avec explications.',
    category: 'code'
  }
];

// --- LLM MODELS ---
const llmModels: { id: LLMModel; name: string; provider: string; maxTokens: number; strengths: string[] }[] = [
  { id: 'gpt-4', name: 'GPT-4 Turbo', provider: 'OpenAI', maxTokens: 128000, strengths: ['Raisonnement', 'Code', 'Multilingue'] },
  { id: 'claude', name: 'Claude 3 Opus', provider: 'Anthropic', maxTokens: 200000, strengths: ['Analyse longue', 'Éthique', 'Créativité'] },
  { id: 'llama', name: 'Llama 3 70B', provider: 'Meta', maxTokens: 8000, strengths: ['Open-source', 'Fine-tuning', 'Recherche'] },
  { id: 'mistral', name: 'Mistral Large', provider: 'Mistral AI', maxTokens: 32000, strengths: ['Français', 'Rapidité', 'Efficacité'] },
  { id: 'gemini', name: 'Gemini 1.5 Pro', provider: 'Google', maxTokens: 1000000, strengths: ['Multimodal', 'Contexte long', 'Recherche'] }
];

// --- DONNÉES AGENTS (64 Agents) ---
const agentsData = [
  { "_id": "agent_001", "id": "cyber_analyst", "name": "Cybersecurity Analyst", "type": "analyst", "description": "Analyse les menaces de sécurité en temps réel et détecte les anomalies dans les logs.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_002", "id": "financial_analyst", "name": "Financial Data Analyst", "type": "analyst", "description": "Agrège et analyse les données financières pour créer des rapports détaillés.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_003", "id": "market_trend_analyst", "name": "Market Trend Analyst", "type": "analyst", "description": "Suit les tendances du marché mondial et analyse les indicateurs économiques clés.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_004", "id": "logistics_analyst", "name": "Logistics Flow Analyst", "type": "analyst", "description": "Optimise les données de la chaîne d'approvisionnement pour identifier les goulots d'étranglement.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_005", "id": "user_behavior_analyst", "name": "User Behavior Analyst", "type": "analyst", "description": "Étudie les interactions des utilisateurs pour améliorer l'expérience produit.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_006", "id": "risk_analyst", "name": "Operational Risk Analyst", "type": "analyst", "description": "Identifie et évalue les risques opérationnels potentiels dans les processus métier.", "icon": "Brain", "color": "#00d9ff", "status": "Inactif" },
  { "_id": "agent_007", "id": "legal_analyst", "name": "Legal Compliance Analyst", "type": "analyst", "description": "Vérifie la conformité des documents avec les lois et réglementations en vigueur.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_008", "id": "performance_analyst", "name": "System Performance Analyst", "type": "analyst", "description": "Surveille les métriques de performance du système et les temps de réponse.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_009", "id": "social_sentiment_analyst", "name": "Social Sentiment Analyst", "type": "analyst", "description": "Analyse les sentiments sur les réseaux sociaux concernant la marque.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_010", "id": "hr_analyst", "name": "HR Data Analyst", "type": "analyst", "description": "Analyse les données RH pour la rétention et le recrutement des talents.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_011", "id": "inventory_analyst", "name": "Inventory Analyst", "type": "analyst", "description": "Prédit les besoins en stock basés sur les données de vente historiques.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_012", "id": "quality_analyst", "name": "Quality Assurance Analyst", "type": "analyst", "description": "Vérifie la qualité des données avant intégration dans les rapports finaux.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_013", "id": "energy_analyst", "name": "Energy Consumption Analyst", "type": "analyst", "description": "Optimise la consommation énergétique des infrastructures informatiques.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_014", "id": "competitor_analyst", "name": "Competitor Intelligence Analyst", "type": "analyst", "description": "Surveille les mouvements stratégiques des concurrents sur le marché.", "icon": "Brain", "color": "#00d9ff", "status": "Maintenance" },
  { "_id": "agent_015", "id": "pricing_analyst", "name": "Pricing Strategy Analyst", "type": "analyst", "description": "Analyse l'élasticité des prix et recommande des ajustements tarifaires.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_016", "id": "sales_forecaster", "name": "Sales Volume Forecaster", "type": "predictor", "description": "Prédit les volumes de vente mensuels avec une précision de 95%.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_017", "id": "churn_predictor", "name": "Customer Churn Predictor", "type": "predictor", "description": "Identifie les clients susceptibles de quitter le service dans les 30 prochains jours.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_018", "id": "stock_predictor", "name": "Stock Market Predictor", "type": "predictor", "description": "Utilise l'analyse technique pour prédire les tendances boursières à court terme.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_019", "id": "weather_predictor", "name": "Local Weather Predictor", "type": "predictor", "description": "Fournit des prévisions météorologiques hyper-locales pour la logistique.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_020", "id": "server_load_predictor", "name": "Server Load Predictor", "type": "predictor", "description": "Anticipe les pics de charge sur les serveurs pour l'auto-scaling.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_021", "id": "lead_score_predictor", "name": "Lead Scoring Predictor", "type": "predictor", "description": "Note les prospects commerciaux pour prioriser les efforts de vente.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_022", "id": "demand_predictor", "name": "Product Demand Predictor", "type": "predictor", "description": "Estime la demande future pour les produits saisonniers.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_023", "id": "fraud_predictor", "name": "Fraud Detection Predictor", "type": "predictor", "description": "Score la probabilité de fraude pour chaque transaction en temps réel.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_024", "id": "employee_attrition_predictor", "name": "Employee Attrition Predictor", "type": "predictor", "description": "Identifie les employés à risque de départ pour prévenir la fuite de talents.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Inactif" },
  { "_id": "agent_025", "id": "traffic_predictor", "name": "Website Traffic Predictor", "type": "predictor", "description": "Prédit le trafic web pour préparer l'infrastructure.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_026", "id": "supply_chain_predictor", "name": "Supply Chain Disruptor Predictor", "type": "predictor", "description": "Prédit les ruptures de la chaîne d'approvisionnement.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_027", "id": "revenue_predictor", "name": "Quarterly Revenue Predictor", "type": "predictor", "description": "Estime le revenu trimestriel basé sur les pipelines actuels.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_028", "id": "ad_performance_predictor", "name": "Ad Performance Predictor", "type": "predictor", "description": "Prédit le ROI des campagnes publicitaires avant leur lancement.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Maintenance" },
  { "_id": "agent_029", "id": "lifecycle_predictor", "name": "Product Lifecycle Predictor", "type": "predictor", "description": "Estime la durée de vie restante d'un produit sur le marché.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_030", "id": "energy_price_predictor", "name": "Energy Price Predictor", "type": "predictor", "description": "Prédit les fluctuations des coûts énergétiques pour l'entreprise.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_031", "id": "cost_optimizer", "name": "Operational Cost Optimizer", "type": "optimizer", "description": "Identifie les coûts superflus et propose des stratégies de réduction.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_032", "id": "route_optimizer", "name": "Delivery Route Optimizer", "type": "optimizer", "description": "Calcule les itinéraires de livraison les plus efficaces pour réduire le carburant.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_033", "id": "code_optimizer", "name": "Code Performance Optimizer", "type": "optimizer", "description": "Refactorise le code pour améliorer sa vitesse et réduire sa consommation mémoire.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_034", "id": "resource_allocator", "name": "Cloud Resource Allocator", "type": "optimizer", "description": "Ajuste automatiquement l'allocation des ressources cloud en fonction de la charge.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_035", "id": "workflow_optimizer", "name": "Business Workflow Optimizer", "type": "optimizer", "description": "Élimine les étapes inutiles dans les processus métier automatisés.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_036", "id": "marketing_spender", "name": "Marketing Spend Optimizer", "type": "optimizer", "description": "Répartit le budget marketing sur les canaux les plus performants.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_037", "id": "storage_optimizer", "name": "Database Storage Optimizer", "type": "optimizer", "description": "Archive les anciennes données et compresse les bases de données actives.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_038", "id": "staffing_optimizer", "name": "Staffing Level Optimizer", "type": "optimizer", "description": "Préconise le nombre optimal d'employés par shift pour couvrir la demande.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_039", "id": "network_optimizer", "name": "Network Traffic Optimizer", "type": "optimizer", "description": "Priorise les paquets de données critiques pour réduire la latence.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_040", "id": "pricing_optimizer", "name": "Dynamic Pricing Optimizer", "type": "optimizer", "description": "Ajuste les prix en temps réel en fonction de l'offre et la demande.", "icon": "Zap", "color": "#fbbf24", "status": "Inactif" },
  { "_id": "agent_041", "id": "seo_optimizer", "name": "SEO Content Optimizer", "type": "optimizer", "description": "Suggère des améliorations de contenu pour un meilleur référencement naturel.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_042", "id": "inventory_optimizer", "name": "Safety Stock Optimizer", "type": "optimizer", "description": "Calcule le stock de sécurité optimal pour éviter les ruptures sans surstocker.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_043", "id": "energy_optimizer", "name": "Building Energy Optimizer", "type": "optimizer", "description": "Contrôle le chauffage et la climatisation pour minimiser l'empreinte énergétique.", "icon": "Zap", "color": "#fbbf24", "status": "Maintenance" },
  { "_id": "agent_044", "id": "tax_optimizer", "name": "Tax Liability Optimizer", "type": "optimizer", "description": "Identifie les déductions fiscales légales pour minimiser les impôts.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_045", "id": "logistics_optimizer", "name": "Last Mile Delivery Optimizer", "type": "optimizer", "description": "Optimise les livraisons de la dernière étape pour réduire le temps et le coût.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_046", "id": "qa_critic", "name": "Quality Assurance Critic", "type": "critic", "description": "Évalue la qualité des livrables avant la mise en production.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_047", "id": "logic_critic", "name": "Business Logic Critic", "type": "critic", "description": "Valide la cohérence logique des décisions automatisées.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_048", "id": "ethics_critic", "name": "AI Ethics & Compliance Critic", "type": "critic", "description": "S'assure que les décisions de l'IA respectent les normes éthiques et légales.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_049", "id": "security_critic", "name": "Security Protocols Critic", "type": "critic", "description": "Audite les nouvelles implémentations pour les failles de sécurité potentielles.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_050", "id": "content_critic", "name": "Content Accuracy Critic", "type": "critic", "description": "Vérifie la véracité des contenus générés automatiquement.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_051", "id": "ux_critic", "name": "User Experience Critic", "type": "critic", "description": "Évalue l'expérience utilisateur des nouvelles interfaces et fonctionnalités.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_052", "id": "financial_critic", "name": "Financial Feasibility Critic", "type": "critic", "description": "Analyse la viabilité financière des nouveaux projets et investissements.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_053", "id": "brand_critic", "name": "Brand Voice Critic", "type": "critic", "description": "Contrôle que les communications respectent la charte de marque.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_054", "id": "scalability_critic", "name": "System Scalability Critic", "type": "critic", "description": "Juge de la capacité du système à supporter une charge croissante.", "icon": "MessageSquare", "color": "#10b981", "status": "Inactif" },
  { "_id": "agent_055", "id": "accessibility_critic", "name": "Accessibility Compliance Critic", "type": "critic", "description": "Vérifie que les produits sont accessibles aux personnes handicapées.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_056", "id": "strategic_critic", "name": "Strategic Alignment Critic", "type": "critic", "description": "Évalue si les projets sont alignés avec la vision stratégique à long terme.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_057", "id": "data_privacy_critic", "name": "Data Privacy Critic", "type": "critic", "description": "Assure que l'utilisation des données respecte le RGPD et autres régulations.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_058", "id": "api_critic", "name": "API Design Critic", "type": "critic", "description": "Critique la structure et la cohérence des interfaces API.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_059", "id": "vendor_critic", "name": "Vendor Selection Critic", "type": "critic", "description": "Évalue les fournisseurs tiers sur le risque et la performance.", "icon": "MessageSquare", "color": "#10b981", "status": "Maintenance" },
  { "_id": "agent_060", "id": "code_review_critic", "name": "Code Quality Critic", "type": "critic", "description": "Effectue des revues de code automatiques pour détecter les mauvaises pratiques.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" },
  { "_id": "agent_061", "id": "data_analyst_v2", "name": "Big Data Analyst", "type": "analyst", "description": "Traite des jeux de données massifs pour en extraire des insights.", "icon": "Brain", "color": "#00d9ff", "status": "Actif" },
  { "_id": "agent_062", "id": "supply_predictor_v2", "name": "Raw Material Supply Predictor", "type": "predictor", "description": "Prédit la disponibilité des matières premières brutes.", "icon": "TrendingUp", "color": "#8b5cf6", "status": "Actif" },
  { "_id": "agent_063", "id": "db_optimizer_v2", "name": "SQL Query Optimizer", "type": "optimizer", "description": "Réécrit les requêtes SQL complexes pour les rendre plus performantes.", "icon": "Zap", "color": "#fbbf24", "status": "Actif" },
  { "_id": "agent_064", "id": "compliance_critic_v2", "name": "Internal Audit Critic", "type": "critic", "description": "Vérifie l'adhésion aux politiques internes de l'entreprise.", "icon": "MessageSquare", "color": "#10b981", "status": "Actif" }
];

// --- NOUVEAUX AGENTS POUR LE COMPOSANT SIMPLIFIÉ ---
const simpleAgents = [
  {
    id: 1,
    name: 'Agent Analyste',
    type: 'Analyse de Données',
    status: 'Actif',
    accuracy: 94.2,
    tasks: 145,
    icon: Brain,
    color: '#00d9ff',
    metrics: {
      completed: 132,
      pending: 13,
      avgTime: '2.3s'
    }
  },
  {
    id: 2,
    name: 'Agent Prédicteur',
    type: 'Prévisions',
    status: 'Actif',
    accuracy: 91.7,
    tasks: 89,
    icon: TrendingUp,
    color: '#8b5cf6',
    metrics: {
      completed: 78,
      pending: 11,
      avgTime: '3.1s'
    }
  },
  {
    id: 3,
    name: 'Agent Optimiseur',
    type: 'Optimisation Ressources',
    status: 'Actif',
    accuracy: 97.1,
    tasks: 234,
    icon: Zap,
    color: '#fbbf24',
    metrics: {
      completed: 218,
      pending: 16,
      avgTime: '1.8s'
    }
  },
  {
    id: 4,
    name: 'Agent Critique',
    type: 'Sécurité & Audit',
    status: 'En pause',
    accuracy: 99.3,
    tasks: 56,
    icon: Shield,
    color: '#9ca3af',
    metrics: {
      completed: 54,
      pending: 2,
      avgTime: '4.5s'
    }
  }
];

export default function MultiAgentSystem() {
  const { t } = useTranslation();
  const [lang, setLang] = useState<Language>('fr');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ agent: string; text: string; isUser: boolean }[]>([]);
  
  // --- AI & FILES STATE ---
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- GENERATIVE AI STATE ---
  const [selectedLLMModel, setSelectedLLMModel] = useState<LLMModel>('gpt-4');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState(0.9);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  
  // --- EMBEDDINGS STATE ---
  const [embeddingText, setEmbeddingText] = useState('');
  const [embeddingResult, setEmbeddingResult] = useState<number[] | null>(null);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  
  // --- FINE-TUNING STATE ---
  const [fineTuningDataset, setFineTuningDataset] = useState<File | null>(null);
  const [epochs, setEpochs] = useState(3);
  const [learningRate, setLearningRate] = useState(0.0001);
  const [batchSize, setBatchSize] = useState(32);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingLoss, setTrainingLoss] = useState<number[]>([]);
  const [trainingAccuracy, setTrainingAccuracy] = useState<number[]>([]);
  
  // --- CHATBOT CONFIG STATE ---
  const [chatbotPersonality, setChatbotPersonality] = useState('professional');
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [contextWindow, setContextWindow] = useState(4096);
  const [responseStyle, setResponseStyle] = useState('concise');

  const txt = (key: string) => translations[lang]?.[key] || key;
  const iconMap: Record<string, any> = { Brain, TrendingUp, Zap, MessageSquare };

  // --- FILE HANDLING LOGIC ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: 'pending' as const
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: 'pending' as const
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // --- DEEP LEARNING SIMULATION ---
  const runDeepLearningAnalysis = async () => {
    if (files.length === 0) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const steps = txt('processingSteps');
    
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      await new Promise(r => setTimeout(r, 1500));
    }

    setFiles(prev => prev.map(f => ({ ...f, status: 'done' as const })));
    setIsAnalyzing(false);

    const agentName = agentsData.find(a => a.id === selectedAgent)?.name || 'AI System';
    const resultMsg = lang === 'tn' 
      ? `Chnouya l resultat men ${files.map(f => f.name).join(', ')}. L'analyse semantique w l'embeddings w 3aytin 3la des tendances clés.`
      : lang === 'ar'
      ? `النتائج من ${files.map(f => f.name).join(', ')}. التحليل الدلالي والتضمينات (Embeddings) أشارت إلى اتجاهات رئيسية.`
      : `Résultats de l'analyse pour ${files.map(f => f.name).join(', ')}. L'analyse sémantique et les embeddings ont révélé des tendances clés.`;

    const agentMsg = {
      agent: agentName + ' (AI Core)',
      text: resultMsg,
      isUser: false
    };
    setConversation(prev => [...prev, agentMsg]);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedAgent) return;
    const userMsg = { agent: 'user', text: message, isUser: true };
    setConversation([...conversation, userMsg]);

    setTimeout(() => {
      const currentAgent = agentsData.find(a => a.id === selectedAgent);
      const responseText = lang === 'tn' 
        ? "J'analyzes mawjoud b les models ta3 Deep Learning. 3aynek 3la les insights."
        : lang === 'ar'
        ? "أحلل البيانات الحالية باستخدام نماذج التعلم العميق. إليك الرؤى المستخلصة."
        : "J'analyse les données actuelles avec les modèles Deep Learning. Voici les insights détectés.";

      const agentMsg = {
        agent: currentAgent?.name || 'Agent',
        text: responseText,
        isUser: false
      };
      setConversation(prev => [...prev, agentMsg]);
    }, 1000);
    setMessage('');
  };

  // --- GENERATIVE AI FUNCTIONS ---
  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedResult('');

    await new Promise(r => setTimeout(r, 2000));

    const model = llmModels.find(m => m.id === selectedLLMModel);
    const result = lang === 'tn'
      ? `Resultat ta3 ${model?.name}:\n\nPrompt: "${userPrompt}"\n\nRéponse générée avec succès. L'paramètres: Temperature ${temperature}, Max Tokens ${maxTokens}, Top P ${topP}, Frequency Penalty ${frequencyPenalty}.\n\nBasé sur l'analyse, les recommandations:\n1. Optimiser les processus actuels\n2. Implémenter les solutions proposées\n3. Suivre les KPIs définis`
      : lang === 'ar'
      ? `نتيجة ${model?.name}:\n\nالأمر: "${userPrompt}"\n\nتم إنشاء الرد بنجاح. المعايير: درجة الحرارة ${temperature}, الحد الأقصى للرموز ${maxTokens}, Top P ${topP}, عقوبة التكرار ${frequencyPenalty}.\n\nبناءً على التحليل، التوصيات:\n1. تحسين العمليات الحالية\n2. تنفيذ الحلول المقترحة\n3. متابعة مؤشرات الأداء المحددة`
      : `Résultat de ${model?.name}:\n\nPrompt: "${userPrompt}"\n\nRéponse générée avec succès. Paramètres: Temperature ${temperature}, Max Tokens ${maxTokens}, Top P ${topP}, Frequency Penalty ${frequencyPenalty}.\n\nBasé sur l'analyse, recommandations:\n1. Optimiser les processus actuels\n2. Implémenter les solutions proposées\n3. Suivre les KPIs définis`;

    setGeneratedResult(result);
    setIsGenerating(false);
  };

  const handleUseTemplate = (template: PromptTemplate) => {
    setUserPrompt(template.template);
  };

  const handleSavePrompt = () => {
    const savedPrompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]');
    savedPrompts.push({
      id: Date.now(),
      systemPrompt,
      userPrompt,
      model: selectedLLMModel,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
  };

  // --- EMBEDDINGS FUNCTIONS ---
  const computeEmbeddings = async () => {
    if (!embeddingText.trim()) return;
    
    const mockEmbedding = Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
    setEmbeddingResult(mockEmbedding);
    setSimilarityScore(Math.random() * 0.5 + 0.5);
  };

  // --- FINE-TUNING FUNCTIONS ---
  const startFineTuning = async () => {
    if (!fineTuningDataset) return;
    setIsTraining(true);
    setTrainingProgress(0);
    setTrainingLoss([]);
    setTrainingAccuracy([]);

    for (let epoch = 0; epoch < epochs; epoch++) {
      for (let step = 0; step < 10; step++) {
        await new Promise(r => setTimeout(r, 500));
        setTrainingProgress(((epoch * 10 + step + 1) / (epochs * 10)) * 100);
        setTrainingLoss(prev => [...prev, Math.random() * 0.5 + 0.1]);
        setTrainingAccuracy(prev => [...prev, Math.random() * 0.3 + 0.7]);
      }
    }

    setIsTraining(false);
  };

  const handleDatasetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFineTuningDataset(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* --- NOUVELLE SECTION 1: CARTES AGENTS SIMPLIFIÉES --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {simpleAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${agent.color}20` }}
              >
                <agent.icon className="w-6 h-6" style={{ color: agent.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                  {agent.name}
                </h3>
                <p className="text-xs text-[#9ca3af]">{agent.type}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9ca3af]">Statut</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${agent.status === 'Actif' ? 'bg-[#10b981]' : 'bg-[#9ca3af]'}`}
                  />
                  <span className="text-sm text-[#e8e9f3]">{agent.status}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9ca3af]">Précision</span>
                <span className="text-sm font-bold" style={{ color: agent.color }}>
                  {agent.accuracy}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9ca3af]">Tâches</span>
                <span className="text-sm text-[#e8e9f3]">{agent.tasks}</span>
              </div>

              <div className="pt-3 border-t border-[#00d9ff]/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#10b981]" />
                    <span className="text-xs text-[#9ca3af]">Terminées</span>
                  </div>
                  <span className="text-xs text-[#e8e9f3]">{agent.metrics.completed}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#fbbf24]" />
                    <span className="text-xs text-[#9ca3af]">En cours</span>
                  </div>
                  <span className="text-xs text-[#e8e9f3]">{agent.metrics.pending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9ca3af]">Temps moyen</span>
                  <span className="text-xs text-[#e8e9f3]">{agent.metrics.avgTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- NOUVELLE SECTION 2: COLLABORATION MULTI-AGENTS --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl"
      >
        <h3 className="text-2xl mb-6 text-[#e8e9f3]" style={{ fontFamily: 'var(--font-display)' }}>
          Flux de Travail Intelligent
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg text-[#e8e9f3]">Interactions récentes</h4>
            {[
              { from: 'Analyste', to: 'Prédicteur', action: 'Données transmises', time: '30s' },
              { from: 'Optimiseur', to: 'Analyste', action: 'Feedback reçu', time: '2min' },
              { from: 'Critique', to: 'Optimiseur', action: 'Audit validé', time: '5min' }
            ].map((interaction, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#00d9ff]/5 border border-[#00d9ff]/10">
                <Bot className="w-5 h-5 text-[#00d9ff]" />
                <div className="flex-1">
                  <p className="text-sm text-[#e8e9f3]">
                    <span className="font-semibold">{interaction.from}</span> → <span className="font-semibold">{interaction.to}</span>
                  </p>
                  <p className="text-xs text-[#9ca3af]">{interaction.action}</p>
                </div>
                <span className="text-xs text-[#00d9ff]">{interaction.time}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg text-[#e8e9f3]">Performance globale</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Synergie', value: '87%', color: '#10b981' },
                { label: 'Latence', value: '2.4s', color: '#00d9ff' },
                { label: 'Fiabilité', value: '99.1%', color: '#fbbf24' },
                { label: 'Efficacité', value: '92%', color: '#8b5cf6' }
              ].map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10">
                  <p className="text-xs text-[#9ca3af] mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- SECTION ORIGINALE: MULTI-AGENT SYSTEM AVEC 64 AGENTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* COLONNE 1: LISTE AGENTS */}
        <div className="lg:col-span-1 h-[600px] overflow-y-auto custom-scrollbar">
          <div className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl h-full flex flex-col">
            <h3 className="text-2xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
              <Sparkles className="w-6 h-6 text-[#00d9ff]" />
              {txt('agentsTitle')}
            </h3>
            
            {/* SELECTEUR DE LANGUE */}
            <div className="mb-6 p-2 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/10 flex justify-between">
              {(['fr', 'ar', 'tn'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 py-1 rounded-lg text-sm font-semibold transition-all ${
                    lang === l ? 'bg-[#00d9ff] text-[#0a0a1a]' : 'text-[#9ca3af] hover:text-[#e8e9f3]'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
              {agentsData.map((agent) => {
                const IconComponent = iconMap[agent.icon] || Brain;
                return (
                  <motion.button
                    key={agent._id}
                    onClick={() => setSelectedAgent(agent.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-3 rounded-xl border transition-all text-left ${
                      selectedAgent === agent.id ? 'border-[#00d9ff] bg-[#00d9ff]/10' : 'border-[#00d9ff]/10 bg-[#0f0f23]/40 hover:border-[#00d9ff]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${agent.color}20` }}>
                        <IconComponent className="w-5 h-5" style={{ color: agent.color }} />
                      </div>
                      <div>
                        <p className="text-[#e8e9f3] font-semibold text-sm">{agent.name}</p>
                        <p className="text-[#9ca3af] text-xs truncate w-32">{agent.description}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLONNE 2: CHAT INTERFACE */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl h-[600px] flex flex-col">
            {selectedAgent ? (
              (() => {
                const currentAgent = agentsData.find(a => a.id === selectedAgent);
                const IconComponent = iconMap[currentAgent?.icon || 'Brain'] || Brain;
                return (
                  <>
                    <div className="pb-4 border-b border-[#00d9ff]/20 mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${currentAgent?.color}20` }}>
                        <IconComponent className="w-5 h-5" style={{ color: currentAgent?.color }} />
                      </div>
                      <div>
                        <p className="text-[#e8e9f3] font-semibold">{currentAgent?.name}</p>
                        <p className="text-[#9ca3af] text-sm flex items-center gap-1"><Globe className="w-3 h-3" /> {txt('ready')}</p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                      {conversation.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                          <Sparkles className="w-12 h-12 text-[#00d9ff] mb-4" />
                          <p className="text-[#9ca3af]">{txt('startChat')}</p>
                        </div>
                      ) : (
                        conversation.map((msg, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.isUser ? 'bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a]' : 'bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3]'}`}>
                              {!msg.isUser && <p className="text-xs text-[#00d9ff] mb-1">{msg.agent}</p>}
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>

                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={txt('chatPlaceholder')}
                        className="flex-1 px-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#9ca3af]/50 focus:border-[#00d9ff] focus:outline-none"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                      <motion.button onClick={handleSendMessage} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold flex items-center gap-2">
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </>
                );
              })()
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-[#9ca3af]">{txt('selectAgent')}</p>
              </div>
            )}
          </div>
        </div>

        {/* COLONNE 3: AI DATA HUB */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl border border-[#00d9ff]/20 bg-gradient-to-br from-[#0f0f23]/80 to-[#0f0f23]/40 backdrop-blur-xl h-[600px] flex flex-col">
            <h3 className="text-xl mb-4 text-[#e8e9f3] font-bold flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#fbbf24]" />
              {txt('aiTitle')}
            </h3>

            {/* UPLOAD AREA */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#00d9ff]/30 rounded-xl p-6 text-center cursor-pointer hover:border-[#00d9ff]/60 transition-colors bg-[#0f0f23]/20 group"
            >
              <Upload className="w-8 h-8 mx-auto text-[#00d9ff] mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm text-[#9ca3af] mb-1">{txt('uploadTitle')}</p>
              <p className="text-xs text-[#6b7280]">{txt('uploadDesc')}</p>
              <input ref={fileInputRef} type="file" className="hidden" multiple onChange={handleFileUpload} />
            </div>

            {/* FILES LIST */}
            <div className="mt-6 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
              {files.length === 0 && (
                <div className="text-center py-10 opacity-30">
                  <FileText className="w-10 h-10 mx-auto mb-2 text-[#6b7280]" />
                  <p className="text-xs">No files</p>
                </div>
              )}
              
              {files.map(file => (
                <div key={file.id} className="p-3 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/10 flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="w-4 h-4 text-[#00d9ff] flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#e8e9f3] truncate">{file.name}</p>
                      <p className="text-[10px] text-[#6b7280]">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  {file.status === 'done' ? (
                    <span className="text-[#10b981] text-xs">✓</span>
                  ) : (
                    <button onClick={() => removeFile(file.id)} className="text-[#ef4444] hover:text-[#ff0000] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* ANALYZE BUTTON & PROGRESS */}
            <div className="mt-4 pt-4 border-t border-[#00d9ff]/10">
              {!isAnalyzing ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={runDeepLearningAnalysis}
                  disabled={files.length === 0}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a1a] font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#fbbf24]/20"
                >
                  <Brain className="w-4 h-4" />
                  {txt('analyze')}
                </motion.button>
              ) : (
                <div className="w-full p-3 rounded-xl bg-[#0f0f23]/60 border border-[#fbbf24]/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Loader2 className="w-4 h-4 text-[#fbbf24] animate-spin" />
                    <p className="text-xs font-bold text-[#fbbf24]">{txt('processing')}</p>
                  </div>
                  <div className="w-full h-1.5 bg-[#0f0f23] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6 }}
                      className="h-full bg-gradient-to-r from-[#00d9ff] to-[#fbbf24]"
                    />
                  </div>
                  <p className="text-[10px] text-[#9ca3af] mt-1 animate-pulse">
                    {txt('processingSteps')?.[analysisStep] || txt('processingSteps')?.[txt('processingSteps')?.length - 1] || ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: GENERATIVE AI LAB --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PROMPT ENGINEERING & GENERATION */}
        <div className="p-6 rounded-2xl border border-[#8b5cf6]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
          <h3 className="text-2xl mb-6 text-[#e8e9f3] flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            <Wand2 className="w-6 h-6 text-[#8b5cf6]" />
            {txt('generativeAITitle')}
          </h3>

          {/* MODEL SELECTION */}
          <div className="mb-6">
            <label className="text-sm text-[#9ca3af] mb-2 block">{txt('selectModel')}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {llmModels.map((model) => (
                <motion.button
                  key={model.id}
                  onClick={() => setSelectedLLMModel(model.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg border transition-all text-center ${
                    selectedLLMModel === model.id 
                      ? 'border-[#8b5cf6] bg-[#8b5cf6]/20 shadow-lg shadow-[#8b5cf6]/20' 
                      : 'border-[#8b5cf6]/20 bg-[#0f0f23]/40 hover:border-[#8b5cf6]/40'
                  }`}
                >
                  <Cpu className="w-5 h-5 mx-auto mb-1" style={{ color: selectedLLMModel === model.id ? '#8b5cf6' : '#6b7280' }} />
                  <p className="text-xs text-[#e8e9f3]">{model.name}</p>
                  <p className="text-[10px] text-[#6b7280]">{model.provider}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* PROMPT ENGINEERING */}
          <div className="mb-4">
            <h4 className="text-lg text-[#e8e9f3] mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#8b5cf6]" />
              {txt('promptEngineering')}
            </h4>
            
            {/* System Prompt */}
            <div className="mb-3">
              <label className="text-xs text-[#8b5cf6] mb-1 block font-semibold">{txt('systemPrompt')}</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Tu es un assistant IA expert en analyse de données..."
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm resize-none focus:border-[#8b5cf6] focus:outline-none"
              />
            </div>

            {/* User Prompt */}
            <div className="mb-4">
              <label className="text-xs text-[#8b5cf6] mb-1 block font-semibold">{txt('enterPrompt')}</label>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Analyse les données suivantes et fournis des insights..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#8b5cf6]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm resize-none focus:border-[#8b5cf6] focus:outline-none"
              />
            </div>

            {/* PARAMETERS */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('temperature')}: {temperature}</label>
                <input                 type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[#8b5cf6]"
                />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('maxTokens')}: {maxTokens}</label>
                <input
                  type="range"
                  min="256"
                  max="4096"
                  step="256"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full accent-[#8b5cf6]"
                />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('topP')}: {topP}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={topP}
                  onChange={(e) => setTopP(parseFloat(e.target.value))}
                  className="w-full accent-[#8b5cf6]"
                />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('frequencyPenalty')}: {frequencyPenalty}</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={frequencyPenalty}
                  onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
                  className="w-full accent-[#8b5cf6]"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mb-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerate}
                disabled={!userPrompt.trim() || isGenerating}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#8b5cf6]/20"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {txt('generating')}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    {txt('generate')}
                  </>
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSavePrompt}
                className="px-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#8b5cf6]/30 text-[#9ca3af] hover:text-[#e8e9f3]"
              >
                <Save className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setUserPrompt(''); setSystemPrompt(''); setGeneratedResult(''); }}
                className="px-4 py-3 rounded-xl bg-[#0f0f23]/60 border border-[#8b5cf6]/30 text-[#9ca3af] hover:text-[#e8e9f3]"
              >
                <XCircle className="w-4 h-4" />
              </motion.button>
            </div>

            {/* RAPPORT EXPLICATIF GENERATIVE AI */}
            {generatedResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#10b981]/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-[#10b981] font-semibold">{txt('result')}</p>
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedResult)}
                    className="text-[#6b7280] hover:text-[#e8e9f3]"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-xs text-[#e8e9f3] whitespace-pre-wrap font-sans">{generatedResult}</pre>
              </motion.div>
            )}
          </div>

          {/* PROMPT TEMPLATES */}
          <div>
            <h4 className="text-sm text-[#8b5cf6] mb-2 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              {txt('templates')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {promptTemplates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleUseTemplate(template)}
                  className="p-3 rounded-lg border border-[#8b5cf6]/20 bg-[#0f0f23]/40 hover:border-[#8b5cf6]/40 transition-all text-left"
                >
                  <p className="text-xs text-[#e8e9f3] font-semibold">{template.name}</p>
                  <p className="text-[10px] text-[#6b7280] mt-1">{template.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* EMBEDDINGS, FINE-TUNING & CHATBOT */}
        <div className="space-y-6">
          
          {/* EMBEDDINGS & VECTOR STORE */}
          <div className="p-6 rounded-2xl border border-[#fbbf24]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#fbbf24]" />
              {txt('embeddingsTitle')}
            </h4>

            <textarea
              value={embeddingText}
              onChange={(e) => setEmbeddingText(e.target.value)}
              placeholder="Entrez du texte pour calculer les embeddings..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm resize-none mb-3 focus:border-[#fbbf24] focus:outline-none"
            />

            <div className="flex gap-3 mb-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={computeEmbeddings}
                disabled={!embeddingText.trim()}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0a0a1a] font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Brain className="w-4 h-4" />
                {txt('computeEmbedding')}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={computeEmbeddings}
                disabled={!embeddingText.trim()}
                className="flex-1 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#fbbf24]/30 text-[#9ca3af] text-sm hover:text-[#e8e9f3] flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                {txt('similaritySearch')}
              </motion.button>
            </div>

            {embeddingResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#fbbf24]/30"
              >
                <p className="text-xs text-[#9ca3af] mb-2">{txt('embeddingDimensions')}</p>
                <div className="h-8 bg-[#0f0f23] rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full"
                  />
                </div>
                {similarityScore !== null && (
                  <p className="text-sm text-[#fbbf24] font-semibold">
                    {txt('cosineSimilarity')} {similarityScore.toFixed(4)}
                  </p>
                )}
              </motion.div>
            )}

            {/* RAPPORT EXPLICATIF EMBEDDINGS */}
            {embeddingResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#fbbf24]/10 to-[#f59e0b]/5 border border-[#fbbf24]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
                    <Database className="w-4 h-4 text-[#fbbf24]" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-[#fbbf24] mb-2">🔢 Rapport d'Analyse - Recherche Sémantique</h5>
                    <div className="text-xs text-[#9ca3af] space-y-2">
                      <p><span className="text-[#fbbf24] font-semibold">🔬 Méthodologie :</span> Modèle d'embedding OpenAI text-embedding-3-small, dimension 1536. Similarité cosinus calculée dans l'espace vectoriel.</p>
                      <p><span className="text-[#fbbf24] font-semibold">📈 Interprétation :</span> Similarité = {similarityScore?.toFixed(4)}. Score &gt; 0.7 = forte similarité, &lt; 0.3 = faible similarité.</p>
                      <p><span className="text-[#fbbf24] font-semibold">💡 Recommandation :</span> {similarityScore && similarityScore > 0.7 
                        ? "Textes très similaires. Envisager déduplication." 
                        : similarityScore && similarityScore > 0.4 
                        ? "Similarité moyenne. Vérifier manuellement."
                        : "Textes très différents. OK pour diversité."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* FINE-TUNING LAB */}
          <div className="p-6 rounded-2xl border border-[#10b981]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-[#10b981]" />
              {txt('fineTuningTitle')}
            </h4>

            {/* DATASET UPLOAD */}
            <div className="mb-4">
              <label className="text-xs text-[#9ca3af] mb-2 block">{txt('uploadDataset')}</label>
              <label className="block p-4 rounded-lg border-2 border-dashed border-[#10b981]/30 bg-[#0f0f23]/20 cursor-pointer hover:border-[#10b981]/60 transition-colors text-center">
                <Upload className="w-6 h-6 mx-auto text-[#10b981] mb-1" />
                <p className="text-xs text-[#9ca3af]">
                  {fineTuningDataset ? fineTuningDataset.name : 'JSON, CSV, JSONL'}
                </p>
                <input type="file" accept=".json,.csv,.jsonl" className="hidden" onChange={handleDatasetUpload} />
              </label>
            </div>

            {/* HYPERPARAMETERS */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-[10px] text-[#6b7280] block mb-1">{txt('epochs')}: {epochs}</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className="w-full px-2 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/20 text-[#e8e9f3] text-sm text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#6b7280] block mb-1">{txt('learningRate')}</label>
                <input
                  type="number"
                  min="0.00001"
                  max="0.1"
                  step="0.0001"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full px-2 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/20 text-[#e8e9f3] text-sm text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#6b7280] block mb-1">{txt('batchSize')}</label>
                <input
                  type="number"
                  min="8"
                  max="128"
                  step="8"
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  className="w-full px-2 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#10b981]/20 text-[#e8e9f3] text-sm text-center"
                />
              </div>
            </div>

            {/* TRAINING BUTTON & PROGRESS */}
            {!isTraining ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={startFineTuning}
                disabled={!fineTuningDataset}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#10b981]/20"
              >
                <Play className="w-4 h-4" />
                {txt('startTraining')}
              </motion.button>
            ) : (
              <div className="p-4 rounded-xl bg-[#0f0f23]/60 border border-[#10b981]/30">
                <p className="text-sm text-[#10b981] font-semibold mb-2">{txt('trainingProgress')}: {trainingProgress.toFixed(1)}%</p>
                <div className="w-full h-2 bg-[#0f0f23] rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trainingProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-[#6b7280] mb-1">{txt('loss')}</p>
                    <div className="h-16 bg-[#0f0f23] rounded-lg border border-[#10b981]/10 p-1">
                      <svg viewBox="0 0 100 50" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          points={trainingLoss.map((val, i) => `${(i / (trainingLoss.length || 1)) * 100},${50 - val * 50}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6b7280] mb-1">{txt('accuracy')}</p>
                    <div className="h-16 bg-[#0f0f23] rounded-lg border border-[#10b981]/10 p-1">
                      <svg viewBox="0 0 100 50" className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="1.5"
                          points={trainingAccuracy.map((val, i) => `${(i / (trainingAccuracy.length || 1)) * 100},${50 - val * 50}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RAPPORT EXPLICATIF FINE-TUNING */}
            {!isTraining && trainingAccuracy.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#059669]/5 border border-[#10b981]/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-[#10b981] mb-2">🎓 Rapport d'Analyse - Entraînement Personnalisé</h5>
                    <div className="text-xs text-[#9ca3af] space-y-2">
                      <p><span className="text-[#10b981] font-semibold">🔬 Méthodologie :</span> Fine-tuning supervisé sur {epochs} epochs. Learning rate = {learningRate}, batch size = {batchSize}. Modèle base GPT-3.5-turbo.</p>
                      <p><span className="text-[#10b981] font-semibold">📈 Interprétation :</span> Loss finale = {trainingLoss[trainingLoss.length - 1]?.toFixed(4) || 'N/A'}, Accuracy finale = {trainingAccuracy[trainingAccuracy.length - 1]?.toFixed(1) || 'N/A'}%.</p>
                      <p><span className="text-[#10b981] font-semibold">💡 Recommandation :</span> {trainingAccuracy[trainingAccuracy.length - 1] > 85 
                        ? "Modèle entraîné performant. Déployer en production." 
                        : "Accuracy faible. Augmenter epochs ou dataset."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* CHATBOT CONFIG */}
          <div className="p-6 rounded-2xl border border-[#00d9ff]/30 bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/50 backdrop-blur-xl">
            <h4 className="text-lg text-[#e8e9f3] mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#00d9ff]" />
              {txt('chatbotTitle')}
            </h4>

            <div className="space-y-3">
              {/* PERSONALITY */}
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('personality')}</label>
                <select
                  value={chatbotPersonality}
                  onChange={(e) => setChatbotPersonality(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm"
                >
                  <option value="professional">Professionnel</option>
                  <option value="friendly">Amical</option>
                  <option value="technical">Technique</option>
                  <option value="creative">Créatif</option>
                  <option value="humorous">Humoristique</option>
                </select>
              </div>

              {/* KNOWLEDGE BASE */}
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('knowledgeBase')}</label>
                <textarea
                  value={knowledgeBase}
                  onChange={(e) => setKnowledgeBase(e.target.value)}
                  placeholder="Ajoutez des connaissances spécifiques..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] placeholder-[#6b7280] text-sm resize-none"
                />
              </div>

              {/* CONTEXT WINDOW */}
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('contextWindow')}: {contextWindow}</label>
                <input
                  type="range"
                  min="512"
                  max="8192"
                  step="512"
                  value={contextWindow}
                  onChange={(e) => setContextWindow(parseInt(e.target.value))}
                  className="w-full accent-[#00d9ff]"
                />
              </div>

              {/* RESPONSE STYLE */}
              <div>
                <label className="text-xs text-[#9ca3af] mb-1 block">{txt('responseStyle')}</label>
                <select
                  value={responseStyle}
                  onChange={(e) => setResponseStyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#e8e9f3] text-sm"
                >
                  <option value="concise">Concis</option>
                  <option value="detailed">Détaillé</option>
                  <option value="balanced">Équilibré</option>
                  <option value="academic">Académique</option>
                  <option value="casual">Décontracté</option>
                </select>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 pt-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#00d9ff] to-[#8b5cf6] text-[#0a0a1a] font-semibold text-sm"
                >
                  {txt('savePrompt')}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setChatbotPersonality('professional');
                    setKnowledgeBase('');
                    setContextWindow(4096);
                    setResponseStyle('concise');
                  }}
                  className="flex-1 py-2 rounded-lg bg-[#0f0f23]/60 border border-[#00d9ff]/20 text-[#9ca3af] text-sm"
                >
                  <RefreshCw className="w-4 h-4 mx-auto" />
                </motion.button>
              </div>
            </div>

            {/* RAPPORT EXPLICATIF CHATBOT CONFIG */}
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
                  <h5 className="text-sm font-semibold text-[#00d9ff] mb-2">💬 Rapport d'Analyse - Configuration de l'Assistant</h5>
                  <div className="text-xs text-[#9ca3af] space-y-2">
                    <p><span className="text-[#00d9ff] font-semibold">🔬 Configuration actuelle :</span> Personnalité = {chatbotPersonality === 'professional' ? 'Professionnelle' : chatbotPersonality === 'friendly' ? 'Amicale' : chatbotPersonality === 'technical' ? 'Technique' : chatbotPersonality === 'creative' ? 'Créative' : 'Humoristique'}, Fenêtre contexte = {contextWindow} tokens, Style = {responseStyle === 'concise' ? 'Concis' : responseStyle === 'detailed' ? 'Détaillé' : responseStyle === 'balanced' ? 'Équilibré' : responseStyle === 'academic' ? 'Académique' : 'Décontracté'}.</p>
                    <p><span className="text-[#00d9ff] font-semibold">📈 Impact attendu :</span> {contextWindow >= 4096 ? "Fenêtre contexte large idéale pour conversations longues." : "Fenêtre contexte limitée, privilégier dialogues courts."} Personnalité {chatbotPersonality} optimisée pour {chatbotPersonality === 'professional' ? 'clients B2B exigeants' : chatbotPersonality === 'technical' ? 'support technique qualifié' : 'expérience utilisateur engageante'}.</p>
                    <p><span className="text-[#00d9ff] font-semibold">💡 Recommandation :</span> {knowledgeBase 
                      ? "Base connaissance personnalisée détectée. Optimale pour réponses contextuelles." 
                      : "Ajouter une base de connaissances pour améliorer la pertinence des réponses."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}