# Harmony AI - Plateforme d'Optimisation Intelligente et Autonome pour Tuntrust

## 🎯 Description

Harmony AI est une plateforme complète d'optimisation intelligente avec système multi-agents IA, jumeau numérique, analytics avancés, analyse de sentiment, évaluation de risques, et bien plus.

## 🏗️ Architecture

### Frontend
- **React 18.3.1** avec TypeScript
- **React Router 7** pour la navigation
- **Tailwind CSS v4** pour le styling
- **Motion** (Framer Motion) pour les animations
- **Recharts** pour les visualisations de données
- **i18next** pour le support multilingue (FR/AR/Darija)
- **Sonner** pour les notifications toast

### Backend
- **Express 5** - Serveur API REST
- **MongoDB 7.0.11** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par tokens
- **bcryptjs** - Hash sécurisé des mots de passe
- **CORS** - Gestion des requêtes cross-origin

## 📋 Prérequis

- **Node.js** 18+ et pnpm
- **MongoDB 7.0.11** Community Edition installé et en cours d'exécution

## 🚀 Installation

### 1. Installer les dépendances

```bash
pnpm install
```

### 2. Configuration de MongoDB

**Assurez-vous que MongoDB est installé et en cours d'exécution :**

```bash
# Vérifier si MongoDB est en cours d'exécution
mongosh --eval "db.version()"
```

Si MongoDB n'est pas installé, installez-le depuis [mongodb.com](https://www.mongodb.com/try/download/community)

**Démarrer MongoDB (si ce n'est pas déjà fait) :**

```bash
# Sur macOS (avec Homebrew)
brew services start mongodb-community@7.0

# Sur Linux
sudo systemctl start mongod

# Sur Windows
net start MongoDB
```

### 3. Configuration des variables d'environnement

Le fichier `.env` est déjà créé avec les valeurs par défaut :

```env
MONGODB_URI=mongodb://127.0.0.1:27017/harmonyai
PORT=5000
JWT_SECRET=harmony_ai_secret_key_2026_tuntrust_secure_token
NODE_ENV=development
```

## 🎬 Démarrage de l'application

### Démarrage en développement

**Terminal 1 - Backend API :**
```bash
pnpm run server
```

Le serveur API démarrera sur http://localhost:5000

**Terminal 2 - Frontend (géré par Figma Make) :**
Le frontend est déjà en cours d'exécution dans Figma Make.

## 🔗 URLs et Endpoints

### Frontend
- Application principale : Voir dans Figma Make

### Backend API
- Base URL: `http://localhost:5000/api`
- Health check: `http://localhost:5000/api/health`

#### Endpoints Disponibles

**Authentification**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

**Agents IA**
- `GET /api/agents` - Liste des agents
- `GET /api/agents/:agentType` - Agent spécifique
- `POST /api/agents/:agentType/message` - Envoyer un message
- `DELETE /api/agents/:agentType/conversation` - Effacer conversation

**Analytics**
- `GET /api/analytics` - Récupérer données
- `POST /api/analytics` - Créer entrée

**Analyse de Sentiment**
- `POST /api/sentiment/analyze` - Analyser texte
- `GET /api/sentiment/history` - Historique

**Évaluation des Risques**
- `POST /api/risk/assess` - Évaluer risque
- `GET /api/risk/history` - Historique

**Prédictions**
- `GET /api/predictions?timeframe=7days` - Récupérer prédictions
- `POST /api/predictions` - Créer prédiction

**Recommandations**
- `GET /api/recommendations/:segment` - Par segment
- `POST /api/recommendations/:segment/action-plan` - Plan d'action

**Jumeau Numérique**
- `POST /api/digital-twin/simulate` - Lancer simulation
- `GET /api/digital-twin/history` - Historique

**Utilisateurs**
- `GET /api/users` - Liste utilisateurs
- `GET /api/users/:id` - Utilisateur spécifique
- `PUT /api/users/:id` - Mettre à jour
- `DELETE /api/users/:id` - Supprimer
- `GET /api/users/search/:query` - Rechercher

**Monitoring**
- `GET /api/monitoring/metrics` - Métriques système
- `GET /api/monitoring/database` - Statut MongoDB
- `GET /api/monitoring/history` - Historique

## 🗄️ Structure de la Base de Données MongoDB

### Collections Créées Automatiquement

1. **users** - Utilisateurs de la plateforme
   - name, email, password (hashé), company, role, status
   
2. **agents** - Conversations avec agents IA
   - agentType, conversation[], status, tasksCompleted
   
3. **analytics** - Données analytiques
   - type, data, period, date
   
4. **sentiments** - Analyses de sentiment
   - text, sentiment, scores, emotions, keywords
   
5. **risks** - Évaluations de risques
   - scenario, probability, impact, riskScore, mitigationStrategies
   
6. **predictions** - Prédictions d'événements
   - event, probability, date, impact, category, actions
   
7. **recommendations** - Recommandations par segment
   - segment, recommendations[], segmentStats
   
8. **digitaltwins** - Simulations
   - scenario, results, recommendations
   
9. **systemmetrics** - Métriques système
   - cpu, memory, database, network, activityLogs

### Informations MongoDB de Votre Instance

- **Host:** 127.0.0.1:27017
- **Cluster:** Standalone
- **Edition:** MongoDB 7.0.11 Community
- **Databases:** 9 DBs (incluant harmonyai)
- **Collections:** 22 Collections (9 créées par Harmony AI + autres)

## 🔐 Sécurité

### Authentification JWT
- Durée de validité: 7 jours
- Token stocké dans localStorage côté frontend
- Header Authorization: `Bearer <token>`

### Mots de Passe
- Hashés avec bcrypt (10 rounds de salt)
- Jamais stockés en clair
- Minimum 6 caractères requis

### Middleware d'Authentification
Tous les endpoints sauf `/auth/login` et `/auth/register` nécessitent un token JWT valide.

## 🌍 Support Multilingue

L'application supporte 3 langues :
- 🇫🇷 Français
- 🇸🇦 Arabe
- 🇲🇦 Darija (Arabe marocain)

## 🎨 Thèmes

- **Mode Sombre** (par défaut) - Cyber-luxe avec gradients holographiques
- **Mode Clair** - Design professionnel épuré

## 📊 Fonctionnalités Principales

### ✅ Page d'Accueil (Landing Page)
- Hero section avec animations
- Présentation des fonctionnalités
- CTA pour inscription/connexion

### ✅ Authentification
- Inscription avec validation
- Connexion sécurisée
- Gestion des sessions JWT

### ✅ Dashboard
- Vue d'ensemble avec KPIs
- Navigation par onglets
- Statistiques en temps réel

### ✅ Système Multi-Agents IA
- **Analyste** - Analyse de données
- **Prédicteur** - Prévisions et tendances
- **Optimiseur** - Optimisation de ressources
- **Critique** - Évaluation qualité

Interface de chat interactive avec historique des conversations.

### ✅ Jumeau Numérique (Digital Twin)
- 4 scénarios de simulation
- Métriques détaillées (revenus, coûts, profit, efficacité, risques)
- Recommandations personnalisées

### ✅ Analytics
- Charts interactifs (LineChart, PieChart, BarChart)
- KPIs dynamiques
- Tendances de performance
- Analyse des économies

### ✅ Analyse de Sentiment
- Analyse de texte en temps réel
- Scores de sentiment (positif/neutre/négatif)
- Détection d'émotions
- Extraction de mots-clés

### ✅ Évaluation des Risques
- 4 types de risques (Marché, Opérationnel, Financier, Stratégique)
- Calcul automatique du score de risque
- Stratégies de mitigation
- Projections sur 6 mois

### ✅ Prédiction d'Événements
- Timeline prédictive
- Probabilités et impacts
- Actions recommandées
- Filtrage par période (24h/7j/30j)

### ✅ Système de Recommandations
- 3 segments clients (Entreprises/PME/Startups)
- Recommandations personnalisées
- Métriques ROI, Impact, Effort
- Génération de plans d'action

### ✅ Monitoring Système
- Métriques en temps réel (CPU, Mémoire, DB, Réseau)
- Statut MongoDB détaillé
- Logs d'activité
- Rafraîchissement automatique

### ✅ Gestion des Utilisateurs
- Liste complète des utilisateurs
- Recherche et filtrage
- 3 rôles (Admin, Manager, Analyste)
- Actions CRUD

## 🔧 Développement

### Structure du Projet

```
/workspaces/default/code/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Application principale
│   │   └── components/                # Composants React
│   │       ├── LandingPage.tsx        # Page d'accueil
│   │       ├── Login.tsx              # Connexion
│   │       ├── Register.tsx           # Inscription
│   │       ├── Dashboard.tsx          # Dashboard principal
│   │       ├── Header.tsx             # En-tête
│   │       ├── ThemeToggle.tsx        # Basculement thème
│   │       ├── MultiAgentSystem.tsx   # Système multi-agents
│   │       ├── DigitalTwin.tsx        # Jumeau numérique
│   │       ├── Analytics.tsx          # Analytics
│   │       ├── SentimentAnalysis.tsx  # Analyse sentiment
│   │       ├── RiskAssessment.tsx     # Évaluation risques
│   │       ├── EventPrediction.tsx    # Prédictions
│   │       ├── RecommendationSystem.tsx # Recommandations
│   │       ├── Monitoring.tsx         # Monitoring
│   │       └── UserManagement.tsx     # Gestion utilisateurs
│   ├── api/
│   │   └── config.ts                  # Configuration API
│   ├── i18n/
│   │   └── config.ts                  # Configuration i18n
│   └── styles/
│       ├── fonts.css                  # Importation fonts
│       └── theme.css                  # Variables CSS thème
├── server/
│   ├── server.js                      # Serveur Express
│   ├── config/
│   │   └── database.js                # Configuration MongoDB
│   ├── middleware/
│   │   └── auth.js                    # Middleware JWT
│   ├── models/                        # Modèles Mongoose
│   │   ├── User.js
│   │   ├── Agent.js
│   │   ├── Analytics.js
│   │   ├── Sentiment.js
│   │   ├── Risk.js
│   │   ├── Prediction.js
│   │   ├── Recommendation.js
│   │   ├── DigitalTwin.js
│   │   └── SystemMetrics.js
│   └── routes/                        # Routes API
│       ├── auth.js
│       ├── agents.js
│       ├── analytics.js
│       ├── sentiment.js
│       ├── risk.js
│       ├── predictions.js
│       ├── recommendations.js
│       ├── digitalTwin.js
│       ├── monitoring.js
│       └── users.js
├── .env                              # Variables d'environnement
├── package.json
├── README.md                         # Ce fichier
└── MONGODB_INTEGRATION.md           # Guide intégration MongoDB
```

## 📝 Scripts Disponibles

```bash
# Démarrer le serveur backend
pnpm run server

# Démarrer le serveur backend en mode dev (avec nodemon)
pnpm run dev:server

# Build de l'application frontend (si nécessaire)
pnpm run build
```

## ✅ État d'Intégration MongoDB

### Backend
- ✅ Serveur Express configuré
- ✅ Connexion MongoDB avec Mongoose
- ✅ 9 modèles MongoDB créés
- ✅ 10 routes API complètes
- ✅ Middleware d'authentification JWT
- ✅ Hash sécurisé des mots de passe
- ✅ Syntaxe ES6 modules

### Frontend
- ✅ Configuration API centralisée (`src/api/config.ts`)
- ✅ Login intégré avec MongoDB
- ✅ Register intégré avec MongoDB
- ✅ Gestion des tokens JWT
- 🔄 Autres composants à connecter à l'API (instructions dans MONGODB_INTEGRATION.md)

## 🐛 Débogage

### Vérifier que MongoDB est en cours d'exécution

```bash
# Test de connexion
mongosh mongodb://127.0.0.1:27017

# Vérifier les processus
ps aux | grep mongod
```

### Vérifier le serveur backend

```bash
# Health check
curl http://localhost:5000/api/health

# Statut MongoDB via API
curl http://localhost:5000/api/monitoring/database
```

### Problèmes Courants

**Erreur: ECONNREFUSED 127.0.0.1:27017**
- MongoDB n'est pas démarré
- Solution: Démarrer MongoDB avec `mongod` ou votre gestionnaire de services

**Erreur: Unauthorized**
- Token JWT invalide ou expiré
- Solution: Se reconnecter pour obtenir un nouveau token

**Erreur: User already exists**
- Un utilisateur avec cet email existe déjà
- Solution: Utiliser un autre email ou se connecter

## 📚 Documentation Complète

Pour des informations détaillées sur l'intégration MongoDB, consultez :
- **MONGODB_INTEGRATION.md** - Guide complet d'intégration

## 🎯 Prochaines Étapes

1. ✅ Backend complet configuré
2. ✅ Login/Register intégrés
3. 🔄 Connecter les composants restants à l'API MongoDB
4. 🔄 Tester l'ensemble des fonctionnalités
5. 🔄 Peupler la base avec des données de démonstration
6. 🚀 Prêt pour la production!

## 🌟 Fonctionnalités Techniques Avancées

- **Cyber-luxe Design System** avec gradients holographiques
- **Animations fluides** avec Motion (Framer Motion)
- **Responsive Design** sur tous les appareils
- **Performance optimisée** avec lazy loading
- **Sécurité renforcée** avec JWT et bcrypt
- **Code modulaire** et maintenable
- **TypeScript** pour la sécurité du typage
- **API REST complète** et bien structurée

## 📞 Support

Pour toute question ou problème :
1. Vérifier ce README et MONGODB_INTEGRATION.md
2. Consulter les logs du serveur
3. Vérifier que MongoDB est en cours d'exécution

---

**Développé avec ❤️ pour Tuntrust**

*Harmony AI - L'intelligence artificielle au service de votre optimisation*
