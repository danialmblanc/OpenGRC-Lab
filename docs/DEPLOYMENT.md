# Deployment Guide

## Local Deployment

### Using npm
1. `npm install`
2. `npx prisma migrate dev`
3. `npm run build`
4. `npm start`

### Using Docker
1. `docker-compose up --build`

## Cloud Deployment (General)

### 1. Database
- Provision a PostgreSQL database (e.g., AWS RDS, Supabase, Railway).
- Update `DATABASE_URL` in your production environment.

### 2. Authentication
- Set up an OAuth provider.
- Update the auth adapter in `src/services/mockService.ts`.

### 3. Media Storage
- Configure a cloud storage bucket (e.g., S3).
- Update `MEDIA_STORAGE_MODE` and provide credentials.

### 4. Hosting
- **Vercel/Netlify**: Best for the frontend. You may need to move the Express server to a separate service or use serverless functions.
- **Railway/Render/Heroku**: Best for the full-stack Express + React setup.
- **Docker/K8s**: Use the provided `Dockerfile` for containerized environments.

## Production Hardening
- Change `DEMO_AUTH_ENABLED` to `false`.
- Set a strong `DEMO_JWT_SECRET` (if still using mock tokens).
- Enable HTTPS.
- Configure CORS in `server.ts`.
