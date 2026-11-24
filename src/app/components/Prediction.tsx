// src/app/components/Prediction.tsx
import React, { useState } from 'react';

export const PredictionComponent = () => {
  const [feature, setFeature] = useState<number>(10);
  const [result, setResult] = useState<string | null>(null);

  const handlePredict = async () => {
    try {
      // Appel à l'API (chemin relatif car même domaine/que port)
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feature: feature })
      });

      const data = await response.json();
      setResult(`Prédiction : ${data.prediction}`);
      
    } catch (error) {
      console.error('Erreur API :', error);
      setResult('Erreur de connexion');
    }
  };

  return (
    <div className="bg-input/10 p-4 rounded border border-border">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-1">
            Valeur d'entrée (Feature)
          </label>
          <input
            type="number"
            value={feature}
            onChange={(e) => setFeature(Number(e.target.value))}
            className="w-full bg-background border border-input rounded px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        
        <button 
          onClick={handlePredict}
          className="bg-primary text-primary-foreground px-6 py-2 rounded font-medium hover:bg-primary/90 transition-colors"
        >
          Prédire
        </button>
      </div>

      {result && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded text-foreground">
          <strong>Résultat :</strong> {result}
        </div>
      )}
    </div>
  );
};