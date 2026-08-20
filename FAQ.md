# Frequently Asked Questions

### 1. Is OpenGRC Lab production-ready?
Not yet. It is currently a **Demo MVP**. While the architecture is production-minded, it uses mock authentication and local SQLite storage by default. You should implement real RBAC and secure authentication before public deployment.

### 2. How does Demo Mode work?
Demo mode bypasses real authentication providers. It uses a mock service to "log in" users as either a Learner or an Admin. This allows you to explore all features without setting up external auth services.

### 3. Can I use my own content?
Yes! You can use the Admin Panel (`/admin`) to upload your own journeys, modules, and labs. The content is stored in the database defined by your `DATABASE_URL`.

### 4. How do I add new labs?
You can add labs via the Admin Panel's "Content Editor". It provides a step-by-step wizard to define lab metadata, objectives, and interactive tasks.

### 5. Can I use PostgreSQL instead of SQLite?
Yes. Prisma supports both. Simply update your `DATABASE_URL` in `.env` and update the `provider` in `prisma/schema.prisma` to `postgresql`.

### 6. Does it support video uploads?
Currently, it supports embedding videos from providers like YouTube or Vimeo. Direct file uploads for videos are on the roadmap.

### 7. Can I use this commercially?
Yes, the project is licensed under the MIT License, which allows for commercial use. However, please check the licenses of any third-party content you might include.

### 8. How do I contribute a new lab template?
We love new content! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on how to propose and submit new lab templates.
