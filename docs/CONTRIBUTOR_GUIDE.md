# Contributor Guide

Welcome to the OpenGRC Lab contributor community!

## Development Workflow

1. **Pick an Issue**: Look for `good first issue` labels.
2. **Branching**: Create a feature branch from `main`.
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Develop**: Write your code and follow the [Coding Standards](CONTRIBUTING.md#coding-standards).
4. **Test**: Ensure your changes don't break existing functionality.
5. **Commit**: Use [Conventional Commits](CONTRIBUTING.md#commit-messages).
6. **Push & PR**: Push to your fork and open a Pull Request.

## Adding New Content Types
If you want to add a new type of learning content (e.g., "Interactive Quiz"):
1. Update `prisma/schema.prisma`.
2. Run `npx prisma migrate dev`.
3. Update `src/types/index.ts`.
4. Add the rendering logic in `src/pages/learner/`.
5. Update the Admin Editor in `src/pages/admin/`.

## Proposing a New Lab
We welcome community-contributed labs!
1. Create a new JSON file in `prisma/seeds/` (optional).
2. Or simply use the Admin Panel to export a lab configuration.
3. Open an issue with the "Lab Proposal" template (coming soon).

## Getting Help
- Open a Discussion on GitHub.
- Reach out to the maintainers.
