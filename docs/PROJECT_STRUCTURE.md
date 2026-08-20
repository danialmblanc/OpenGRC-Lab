# Project Structure

```text
.
├── .github/            # GitHub Actions and templates
├── docs/               # Detailed documentation
├── prisma/             # Database schema, migrations, and seeds
├── scripts/            # Helper scripts for setup and dev
├── src/
│   ├── components/
│   │   ├── layout/     # Sidebar, Topbar, AdminLayout
│   │   └── ui/         # Reusable atomic components (Button, Card)
│   ├── pages/          # Route-level components
│   │   ├── admin/      # Admin Panel pages
│   │   └── learner/    # Learner Dashboard and Lab Player
│   ├── services/       # API clients and mock services
│   ├── store/          # Zustand stores for global state
│   ├── types/          # TypeScript interfaces and enums
│   └── lib/            # Shared utilities (cn, queryClient)
├── server.ts           # Express server entry point
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```
