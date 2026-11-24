# Intégration MongoDB - Harmony AI

## Configuration Serveur

### Base de données MongoDB
- **Host**: 127.0.0.1:27017
- **Cluster**: Standalone
- **Edition**: MongoDB 7.0.11 Community
- **Databases**: 9 DBs
- **Collections**: 22 Collections
- **Database name**: harmonyai

### Variables d'environnement (.env)
```
MONGODB_URI=mongodb://127.0.0.1:27017/harmonyai
PORT=5000
JWT_SECRET=harmony_ai_secret_key_2026_tuntrust_secure_token
NODE_ENV=development
```

## Démarrage

### 1. Démarrer MongoDB
Assurez-vous que MongoDB est en cours d'exécution sur le port 27017.

### 2. Démarrer le serveur backend
```bash
pnpm run server
```

Le serveur démarrera sur http://localhost:5000

### 3. L'application frontend
L'application frontend Vite continue de fonctionner normalement et se connecte automatiquement à l'API backend.

## Structure Backend

### Modèles MongoDB (`server/models/`)
- **User.js**: Gestion des utilisateurs (authentification, rôles)
- **Agent.js**: Conversations avec les agents IA
- **Analytics.js**: Données analytiques et KPIs
- **Sentiment.js**: Analyses de sentiment
- **Risk.js**: Évaluations de risques
- **Prediction.js**: Prédictions d'événements
- **Recommendation.js**: Recommandations par segment
- **DigitalTwin.js**: Simulations de jumeaux numériques
- **SystemMetrics.js**: Métriques système et monitoring

### Routes API (`server/routes/`)
Toutes les routes sont préfixées par `/api`

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

#### Agents IA
- `GET /api/agents` - Liste tous les agents
- `GET /api/agents/:agentType` - Récupère un agent spécifique
- `POST /api/agents/:agentType/message` - Envoie un message à un agent
- `DELETE /api/agents/:agentType/conversation` - Efface la conversation

#### Analytics
- `GET /api/analytics` - Récupère les données analytiques
- `POST /api/analytics` - Crée une entrée analytics

#### Analyse de Sentiment
- `POST /api/sentiment/analyze` - Analyse un texte
- `GET /api/sentiment/history` - Historique des analyses

#### Évaluation des Risques
- `POST /api/risk/assess` - Évalue un scénario de risque
- `GET /api/risk/history` - Historique des évaluations

#### Prédictions
- `GET /api/predictions?timeframe=7days` - Récupère les prédictions
- `POST /api/predictions` - Crée une prédiction

#### Recommandations
- `GET /api/recommendations/:segment` - Recommandations par segment (enterprise/pme/startup)
- `POST /api/recommendations/:segment/action-plan` - Génère un plan d'action

#### Jumeau Numérique
- `POST /api/digital-twin/simulate` - Lance une simulation
- `GET /api/digital-twin/history` - Historique des simulations

#### Gestion des Utilisateurs
- `GET /api/users` - Liste tous les utilisateurs
- `GET /api/users/:id` - Récupère un utilisateur
- `PUT /api/users/:id` - Met à jour un utilisateur
- `DELETE /api/users/:id` - Supprime un utilisateur
- `GET /api/users/search/:query` - Recherche d'utilisateurs

#### Monitoring
- `GET /api/monitoring/metrics` - Métriques système
- `GET /api/monitoring/database` - Statut de la base de données
- `GET /api/monitoring/history` - Historique des métriques

## Intégration Frontend

### Configuration API (`src/api/config.ts`)
Toutes les requêtes API passent par ce fichier centralisé qui gère:
- L'URL de base de l'API
- Les headers d'authentification (JWT tokens)
- La gestion des erreurs
- Les requêtes HTTP standardisées

### Composants Modifiés

#### ✅ Login.tsx
- Utilise `api.auth.login()` pour la connexion
- Stocke le token JWT et les données utilisateur

#### ✅ Register.tsx
- Utilise `api.auth.register()` pour l'inscription
- Validation des mots de passe (minimum 6 caractères)
- Stocke le token JWT et les données utilisateur

#### 🔄 À Modifier (Instructions pour chaque composant)

**MultiAgentSystem.tsx**:
```typescript
import api from '../../api/config';

// Dans handleSendMessage:
const response = await api.agents.sendMessage(activeAgent.id, message);
setConversation(response.conversation);
```

**Analytics.tsx**:
```typescript
import api from '../../api/config';

useEffect(() => {
  const fetchAnalytics = async () => {
    const data = await api.analytics.get();
    // Utiliser data.kpis, data.performanceTrends, etc.
  };
  fetchAnalytics();
}, []);
```

**SentimentAnalysis.tsx**:
```typescript
import api from '../../api/config';

const analyzeSentiment = async () => {
  const result = await api.sentiment.analyze(text);
  setResult(result);
};
```

**RiskAssessment.tsx**:
```typescript
import api from '../../api/config';

const handleSelectScenario = async (scenario: string) => {
  const riskData = await api.risk.assess(scenario);
  setSelectedScenario(scenario);
  setRiskScore(riskData.riskScore);
  // etc.
};
```

**EventPrediction.tsx**:
```typescript
import api from '../../api/config';

useEffect(() => {
  const fetchPredictions = async () => {
    const data = await api.predictions.get(selectedTimeframe);
    setPredictions(data);
  };
  fetchPredictions();
}, [selectedTimeframe]);
```

**RecommendationSystem.tsx**:
```typescript
import api from '../../api/config';

const handleSelectSegment = async (segment: string) => {
  const data = await api.recommendations.getBySegment(segment);
  setSelectedSegment(segment);
  setRecommendations(data.recommendations);
  setSegmentStats(data.segmentStats);
};
```

**DigitalTwin.tsx**:
```typescript
import api from '../../api/config';

const handleRunSimulation = async () => {
  const result = await api.digitalTwin.simulate(selectedScenario);
  setResults(result.results);
  setRecommendations(result.recommendations);
};
```

**UserManagement.tsx**:
```typescript
import api from '../../api/config';

useEffect(() => {
  const fetchUsers = async () => {
    const data = await api.users.getAll();
    setUsers(data);
  };
  fetchUsers();
}, []);

const handleDeleteUser = async (userId: string) => {
  await api.users.delete(userId);
  // Rafraîchir la liste
};
```

**Monitoring.tsx**:
```typescript
import api from '../../api/config';

useEffect(() => {
  const fetchMetrics = async () => {
    const metrics = await api.monitoring.getMetrics();
    const dbStatus = await api.monitoring.getDatabaseStatus();
    // Mettre à jour l'état
  };
  fetchMetrics();
  const interval = setInterval(fetchMetrics, 30000); // Refresh every 30s
  return () => clearInterval(interval);
}, []);
```

## Sécurité

### Authentification JWT
- Tous les endpoints (sauf login/register) nécessitent un token JWT
- Le token est stocké dans localStorage
- Le token est automatiquement envoyé dans les headers des requêtes
- Durée de validité: 7 jours

### Middleware d'Authentification
Le middleware `server/middleware/auth.js` vérifie:
1. Présence du token dans les headers
2. Validité du token JWT
3. Existence de l'utilisateur

### Hash des Mots de Passe
- Les mots de passe sont hashés avec bcrypt (10 rounds)
- Les mots de passe ne sont jamais stockés en clair
- Fonction de comparaison sécurisée pour la vérification

## Collections MongoDB Créées

Le serveur créera automatiquement les collections suivantes:

1. **users** - Utilisateurs de la plateforme
2. **agents** - Conversations et états des agents IA
3. **analytics** - Données analytiques et KPIs
4. **sentiments** - Analyses de sentiment
5. **risks** - Évaluations de risques
6. **predictions** - Prédictions d'événements
7. **recommendations** - Recommandations par segment
8. **digitaltwins** - Simulations de jumeaux numériques
9. **systemmetrics** - Métriques système

## Vérification de la Connexion

### Health Check
```bash
curl http://localhost:5000/api/health
```

Réponse attendue:
```json
{
  "status": "OK",
  "message": "Harmony AI API is running",
  "mongodb": "Connected",
  "timestamp": "2026-04-14T..."
}
```

### Statut MongoDB
```bash
curl http://localhost:5000/api/monitoring/database
```

## Débogage

### Logs Serveur
Le serveur affiche:
- ✅ Connexion MongoDB réussie
- 📊 Nom de la database
- 🔌 Port de connexion
- 📁 Liste des collections

### Erreurs Communes

**Erreur: Connection refused**
- Vérifier que MongoDB tourne sur le port 27017
- Vérifier la variable MONGODB_URI dans .env

**Erreur: Unauthorized**
- Le token JWT est invalide ou expiré
- Se reconnecter pour obtenir un nouveau token

**Erreur: User not found**
- L'utilisateur n'existe pas dans la base de données
- Créer un compte via /register

## Prochaines Étapes

1. ✅ Backend MongoDB configuré et fonctionnel
2. ✅ API REST complète avec toutes les routes
3. ✅ Login et Register intégrés
4. 🔄 Mettre à jour les composants restants pour utiliser l'API
5. 🔄 Tester toutes les fonctionnalités end-to-end
6. 📊 Peupler la base avec des données de test
7. 🚀 Production ready!
