#!/bin/bash

# Seed script for OpenGRC Lab
echo "🌱 Seeding database..."

npx tsx prisma/seed.ts

echo "✅ Seeding complete!"
