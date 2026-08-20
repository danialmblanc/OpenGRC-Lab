# OpenGRC Lab Publishing Checklist

Follow these steps to professionally publish OpenGRC Lab to GitHub:

1.  **Review Code for Secrets**: Ensure no real API keys or credentials are hardcoded.
2.  **Initialize Git**: Run `git init` in the project root.
3.  **Add Remote**: Create a repository on GitHub and run `git remote add origin <url>`.
4.  **Configure Environment**: Copy `.env.example` to `.env` and ensure it works locally.
5.  **Verify Build**: Run `npm run build` to ensure the project compiles without errors.
6.  **Lint Check**: Run `npm run lint` to ensure code quality.
7.  **Final Commit**: Add all files and commit with a clear message.
8.  **Push**: Push to the main branch.
9.  **Set Up GitHub Metadata**: Add description, topics, and a social preview image.
10. **Create First Release**: Tag the commit as `v0.1.0` and create a release on GitHub.
