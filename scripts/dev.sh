#!/bin/bash

# Dev script for OpenGRC Lab
echo "🚀 Starting OpenGRC Lab in development mode..."

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 node_modules not found. Installing..."
    npm install
fi

# Run dev server
npm run dev
