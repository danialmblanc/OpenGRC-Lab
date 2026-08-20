#!/bin/bash

# Setup script for OpenGRC Lab

echo "🚀 Starting setup for OpenGRC Lab..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment variables
if [ ! -f .env ]; then
    echo "📄 Creating .env file..."
    cp .env.example .env
else
    echo "✅ .env file already exists."
fi

# Initialize database
echo "🗄️ Initializing database..."
npx prisma migrate dev --name init
npx tsx prisma/seed.ts

echo "✅ Setup complete! Run 'npm run dev' to start the application."
