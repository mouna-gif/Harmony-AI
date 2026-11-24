# server/app.py
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mlflow
import mlflow.sklearn
from sklearn.linear_model import LinearRegression
import numpy as np
from prometheus_client import make_asgi_app
import uvicorn

app = FastAPI()

# --- 1. CONFIGURATION MLFLOW ---
mlflow.set_tracking_uri("http://localhost:5000")
# --- AJOUT IMPORTANT : Créer l'expérience pour éviter l'erreur ID 0 ---
mlflow.set_experiment("Harmony_Experiment")

# ... le reste du code reste inchangé ...

# --- 2. PROMETHEUS METRICS (Pour Grafana) ---
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# --- 3. DUMMY MODEL (Déploiement) ---
# Entraînement d'un modèle simple au démarrage
model = LinearRegression()
X_train = np.array([[1], [2], [3], [4]])
y_train = np.array([2, 4, 6, 8])
model.fit(X_train, y_train)

# Définir le schéma de données pour l'API
class PredictionInput(BaseModel):
    feature: float

# --- ROUTES ---

@app.get("/")
def read_root():
    return {"status": "Harmony MLOps API is running", "mlflow_ui": "http://localhost:5000"}

@app.post("/predict")
def predict(input_data: PredictionInput):
    """
    Fait une prédiction et log le résultat dans MLflow.
    """
    try:
        # Prédiction
        features = np.array([[input_data.feature]])
        prediction = model.predict(features)[0]
        
        # Logging MLflow (On log la prédiction comme artifact ou métrique simple)
        with mlflow.start_run():
            mlflow.log_metric("input_value", input_data.feature)
            mlflow.log_metric("prediction_value", prediction)
            mlflow.sklearn.log_model(model, "model")
            
        return {"input": input_data.feature, "prediction": float(prediction)}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy"}