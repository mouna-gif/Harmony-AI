# ==========================================
# ÉTAPE 1 : Build du Frontend (Node.js)
# ==========================================
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copie des fichiers package pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copie de tout le code source frontend
COPY . .

# Construction de l'application (crée le dossier /dist)
RUN npm run build


# ==========================================
# ÉTAPE 2 : Backend & Production (Python)
# ==========================================
FROM python:3.9-slim

# Configuration des variables d'environnement Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Installation des dépendances système
RUN apt-get update && apt-get install -y gcc

# Installation des dépendances Python (FastAPI, MLflow, etc.)
COPY server/requirements.txt ./server/
RUN pip install --no-cache-dir -r server/requirements.txt

# Installation de Gunicorn
RUN pip install gunicorn

# Copie du code backend
COPY server/ ./server/

# Copie du frontend construit vers le dossier statique du serveur
COPY --from=frontend-builder /app/frontend/dist ./server/static

# ==========================================
# ÉTAPE 3 : Configuration MLOps
# ==========================================

# Copie du script de démarrage (lance MLflow + Gunicorn)
COPY start.sh .

# Donner les droits d'exécution au script
RUN chmod +x start.sh

# Exposition des ports
# 8000 : FastAPI (Application)
# 5000 : MLflow (UI)
EXPOSE 8000 5000

# Commande de lancement
CMD ["./start.sh"]