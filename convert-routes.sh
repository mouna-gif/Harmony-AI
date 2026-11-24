#!/bin/bash

cd /workspaces/default/code/server/routes

# Convert all route files
for file in *.js; do
  echo "Converting $file..."

  # Replace require with import for express
  sed -i "s/const express = require('express');/import express from 'express';/g" "$file"

  # Replace require with import for router
  sed -i "s/const router = express.Router();/import express from 'express';\nconst router = express.Router();/g" "$file"

  # Fix duplicate imports
  sed -i '/^import express/!b;n;/^import express/d' "$file"

  # Replace authMiddleware
  sed -i "s/const authMiddleware = require('..\/middleware\/auth');/import authMiddleware from '..\/middleware\/auth.js';/g" "$file"

  # Replace jwt
  sed -i "s/const jwt = require('jsonwebtoken');/import jwt from 'jsonwebtoken';/g" "$file"

  # Replace mongoose
  sed -i "s/const mongoose = require('mongoose');/import mongoose from 'mongoose';/g" "$file"

  # Replace model imports
  sed -i "s/const User = require('..\/models\/User');/import User from '..\/models\/User.js';/g" "$file"
  sed -i "s/const Agent = require('..\/models\/Agent');/import Agent from '..\/models\/Agent.js';/g" "$file"
  sed -i "s/const Analytics = require('..\/models\/Analytics');/import Analytics from '..\/models\/Analytics.js';/g" "$file"
  sed -i "s/const Sentiment = require('..\/models\/Sentiment');/import Sentiment from '..\/models\/Sentiment.js';/g" "$file"
  sed -i "s/const Risk = require('..\/models\/Risk');/import Risk from '..\/models\/Risk.js';/g" "$file"
  sed -i "s/const Prediction = require('..\/models\/Prediction');/import Prediction from '..\/models\/Prediction.js';/g" "$file"
  sed -i "s/const Recommendation = require('..\/models\/Recommendation');/import Recommendation from '..\/models\/Recommendation.js';/g" "$file"
  sed -i "s/const DigitalTwin = require('..\/models\/DigitalTwin');/import DigitalTwin from '..\/models\/DigitalTwin.js';/g" "$file"
  sed -i "s/const SystemMetrics = require('..\/models\/SystemMetrics');/import SystemMetrics from '..\/models\/SystemMetrics.js';/g" "$file"

  # Replace module.exports
  sed -i "s/module.exports = router;/export default router;/g" "$file"

  echo "✓ $file converted"
done

echo "All route files converted to ES6!"
