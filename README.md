# OpenGRC Lab

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

> [!WARNING]
> **DEMO MODE ACTIVE**: This application is currently a **Demo MVP**. It uses mock authentication and local storage by default. It is **not production-hardened**. Do not use it to store sensitive GRC data without implementing real authentication and secure infrastructure.

**OpenGRC Lab** is a dynamic, interactive, web-based learning platform designed to teach Governance, Risk, and Compliance (GRC) through hands-on labs, role-based journeys, and scenario-driven exercises.

---

## 📸 Screenshots

| Learner Dashboard | Lab Interface | Admin Panel |
| :---: | :---: | :---: |
| ![Dashboard](/docs/screenshots/dashboard.png) | ![Lab Player](/docs/screenshots/lab-player.png) | ![Admin CMS](/docs/screenshots/admin-panel.png) |

---

## 🚀 Overview

Traditional GRC training is often static and theoretical. OpenGRC Lab changes that by providing a **browser-based interactive environment** where learners can:
- Explore role-based **Learning Journeys**.
- Complete **Interactive Labs** with instant feedback.
- Analyze **Case Studies** based on real-world scenarios.
- Watch **Video Explainers** integrated into the curriculum.
- Track progress via **XP, Levels, and Achievements**.

### Why OpenGRC Lab?
This project exists to bridge the gap between GRC theory and practice. It provides a safe, sandbox environment for aspiring GRC professionals to build "muscle memory" for tasks like risk assessment, control mapping, and audit preparation.

---

## ✨ Key Features

- **Interactive Lab Engine**: A custom-built engine for rendering multi-step tasks, quizzes, and scenario analyses.
- **Admin Content Panel**: A full-featured CMS for admins to upload and manage journeys, labs, and media.
- **Progress Tracking**: Local persistence of user XP, streaks, and completed modules.
- **Schema-Driven Architecture**: Content is defined via a structured Prisma schema, making it easy to extend.
- **Demo Mode**: Ready-to-use demo environment with mock authentication for immediate exploration.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, Lucide React.
- **Backend**: Express.js (integrated with Vite).
- **Database**: SQLite (via Prisma ORM).
- **State Management**: Zustand, TanStack Query.
- **Forms**: React Hook Form + Zod.

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/opengrc-lab.git
   cd opengrc-lab
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Initialize the database**:
   ```bash
   npx prisma migrate dev --name init
   npx tsx prisma/seed.ts
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`.

---

## 🐳 Running with Docker

You can also run the entire stack using Docker:

```bash
docker-compose up --build
```

---

## 🔑 Demo Access

OpenGRC Lab comes with a built-in **Demo Mode**. On the landing page, you can choose:

- **Continue as Demo Learner**: Access the dashboard and all learning content.
- **Continue as Demo Admin**: Access the Admin Panel at `/admin` to manage content.

*Note: Demo mode uses mock authentication. For production use, see [docs/DEMO_AUTH.md](docs/DEMO_AUTH.md).*

---

## 📂 Project Structure

```text
.
├── prisma/             # Database schema and migrations
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components and route handlers
│   ├── services/       # API and mock service logic
│   ├── store/          # Zustand state stores
│   ├── types/          # TypeScript interfaces
│   └── lib/            # Utility functions
├── server.ts           # Express backend entry point
└── docs/               # Detailed documentation
```

---

## 🗺 Roadmap

- [ ] **Real Authentication**: Integration with Auth0 or Firebase Auth.
- [ ] **RBAC**: Role-Based Access Control for granular permissions.
- [ ] **Cloud Storage**: Integration with AWS S3 or Google Cloud Storage for media.
- [ ] **AI Tutor**: Gemini-powered assistant for real-time lab help.
- [ ] **Certificates**: Generate PDF certificates upon journey completion.

See [ROADMAP.md](ROADMAP.md) for the full list.

---

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## 🛡 Security

If you discover a security vulnerability, please see our [SECURITY.md](SECURITY.md).

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Inspired by modern GRC learning platforms.
- Built with ❤️ for the open-source community.

---

**Maintainer**: [Your Name/Organization]  
**Contact**: [your-email@example.com]
