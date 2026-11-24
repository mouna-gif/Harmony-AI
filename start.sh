#!/bin/bash

echo "Démarrage du serveur MLflow sur le port 5000..."
# Lancement de MLflow en arrière-plan
mlflow server --backend-store-uri ./mlruns --default-artifact-root ./mlruns/artifacts --host 0.0.0.0 --port 5000 &

echo "Démarrage de l'API FastAPI..."
# Lancement de Gunicorn (processus principal)
exec gunicorn -c server/gunicorn_config.py server.app:app