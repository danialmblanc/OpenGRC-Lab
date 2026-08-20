# Security Policy

## Supported Versions

Currently, only the latest version of OpenGRC Lab is supported for security updates.

| Version | Supported          |
| ------- | ------------------ |
| v0.1.x  | :white_check_mark: |
| < v0.1  | :x:                |

## Reporting a Vulnerability

We take the security of OpenGRC Lab seriously. If you believe you have found a security vulnerability, please do **not** report it via a public issue.

Instead, please send an email to [your-security-email@example.com].

Please include:
- A description of the vulnerability.
- Steps to reproduce.
- Potential impact.

We will acknowledge your report within 48 hours and provide a timeline for resolution.

## Demo Mode Warning

**IMPORTANT**: OpenGRC Lab is currently in **Demo Mode** by default.
- Mock authentication is used.
- JWT tokens are dummy and not cryptographically secure in the default configuration.
- Do not use demo mode for production environments or with sensitive data.

Always configure a real authentication provider (e.g., Auth0, Firebase, or a custom OAuth server) before deploying to a public environment.
