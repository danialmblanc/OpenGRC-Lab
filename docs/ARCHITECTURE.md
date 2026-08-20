# OpenGRC Lab Architecture

## High-Level Overview
OpenGRC Lab is a full-stack TypeScript application built with a modern, reactive frontend and a lightweight Express backend.

## Layers

### 1. Frontend (React)
- **Framework**: React 19 with Vite.
- **Styling**: Tailwind CSS 4 for utility-first styling.
- **Animations**: Framer Motion for smooth transitions.
- **State Management**: 
  - `Zustand`: Client-side state (auth, progress).
  - `TanStack Query`: Server-side state (fetching, caching).

### 2. Backend (Express)
- **Server**: Express.js integrated with Vite's development server.
- **API**: RESTful endpoints for content, auth, and progress.
- **ORM**: Prisma for type-safe database access.

### 3. Data Model (Prisma)
- **Entities**: Journeys, Modules, Paths, Labs, Tasks, Achievements.
- **Storage**: SQLite by default (extensible to PostgreSQL).

## Key Components

### Lab Engine
The Lab Engine is a reusable React component that renders interactive tasks. It handles:
- Task sequencing.
- User input validation.
- Feedback rendering.
- Progress reporting.

### Admin CMS
A dedicated area for content creators to manage the platform.
- **Wizard**: Multi-step form for content creation.
- **Media Library**: Asset management for thumbnails and videos.

### Demo Auth Adapter
A flexible authentication layer that defaults to a mock service for demo purposes but can be easily swapped for real providers.
