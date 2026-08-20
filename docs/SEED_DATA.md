# Seed Data Guide

OpenGRC Lab uses a Prisma-based seed script to populate the database with initial learning content. This ensures that the platform is ready for exploration immediately after setup.

## How it Works

The seed script is located at `prisma/seed.ts`. It uses the Prisma Client to create records for:
- **Journeys**: High-level learning paths.
- **Modules**: Thematic groups within journeys.
- **Paths**: Specific tracks within modules.
- **Labs**: Interactive learning units.
- **Achievements**: Rewards for learner progress.

## Running the Seed Script

You can run the seed script manually using the following command:

```bash
npm run db:seed
```

This is also automatically called during the `npm run setup` process.

## Customizing Content

To add your own initial content, you can modify `prisma/seed.ts`. 

### Example: Adding a New Journey

```typescript
const journey = await prisma.journey.create({
  data: {
    title: "My Custom Journey",
    slug: "my-custom-journey",
    description: "A journey into custom GRC topics.",
    category: "Custom",
    difficulty: "Beginner",
    xpReward: 500,
    status: "published",
  }
});
```

## Resetting the Database

If you want to clear all data and re-run the seed script, use the reset script:

```bash
npm run reset-db
```

**Warning**: This will delete all existing records in your local database.
