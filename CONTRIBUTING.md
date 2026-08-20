# CONTRIBUTING

First off, thank you for considering contributing to **OpenGRC Lab**! It's people like you that make OpenGRC Lab such a great tool for the GRC community.

## 🌈 How Can I Contribute?

### Reporting Bugs
- Use the **Bug Report** template.
- Provide a clear summary and steps to reproduce.

### Suggesting Enhancements
- Use the **Feature Request** template.
- Explain the use case and how it benefits the platform.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

## 💻 Local Development Setup

1. Clone your fork.
2. Install dependencies: `npm install`.
3. Set up `.env`: `cp .env.example .env`.
4. Initialize DB: `npx prisma migrate dev`.
5. Run dev server: `npm run dev`.

## 🎨 Coding Standards

- **TypeScript**: Use strict typing where possible.
- **Components**: Prefer functional components and hooks.
- **Styling**: Use Tailwind CSS utility classes.
- **Icons**: Use `lucide-react`.
- **State**: Use `zustand` for global state and `TanStack Query` for server state.

## 📝 Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
- `feat: add new lab engine feature`
- `fix: resolve progress tracking bug`
- `docs: update architecture guide`
- `style: improve dashboard layout`

## 🤝 Community

Join our discussions on GitHub or reach out to the maintainers. We strive to maintain a welcoming and inclusive environment.

---

*Happy coding!*
