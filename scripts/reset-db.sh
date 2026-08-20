#!/bin/bash

# Reset DB script for OpenGRC Lab
echo "⚠️ Resetting database..."

rm -f prisma/dev.db
rm -f prisma/dev.db-journal
rm -rf prisma/migrations

npx prisma migrate dev --name init
npx tsx prisma/seed.ts

echo "✅ Database reset complete!"
