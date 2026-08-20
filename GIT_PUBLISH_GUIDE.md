# Git Publishing Instructions

Follow these commands to push OpenGRC Lab to a new GitHub repository.

### 1. Initialize Local Repository
```bash
git init
git add .
git commit -m "feat: initial release of OpenGRC Lab v0.1.0"
```

### 2. Create Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name it `opengrc-lab`.
3. Keep it public.
4. Do **not** initialize with README, License, or .gitignore (we already have them).

### 3. Link and Push
```bash
git remote add origin https://github.com/yourusername/opengrc-lab.git
git branch -M main
git push -u origin main
```

### 4. Create First Release
```bash
git tag -a v0.1.0 -m "Initial MVP release"
git push origin v0.1.0
```

### 5. GitHub Metadata
- **Description**: 🚀 Open-source interactive learning platform for GRC professionals.
- **Topics**: `grc`, `learning-management-system`, `interactive-labs`, `cybersecurity`, `react`, `typescript`, `prisma`.
