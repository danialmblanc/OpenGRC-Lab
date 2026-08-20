# Content Model

OpenGRC Lab uses a hierarchical content model to organize learning materials.

## Hierarchy

1. **Journey**: The top-level container (e.g., "GRC Fundamentals").
2. **Module**: A thematic group within a journey (e.g., "Risk Management").
3. **Path**: A specific learning track within a module (e.g., "ISO 27001 Basics").
4. **Lab**: An interactive learning unit.
   - **Task**: A single interactive step within a lab (Multiple Choice, Scenario, etc.).

## Entity Definitions

### Journey
- `title`, `slug`, `description`, `category`, `difficulty`, `xpReward`.
- Contains many `Modules`.

### Lab
- `type`: `lab`, `case-study`, or `video`.
- `objectives`: JSON array of learning goals.
- `tasks`: List of interactive challenges.

### Task
- `type`: `multiple-choice`, `single-choice`, `text-input`, `scenario-analysis`.
- `question`, `options` (JSON), `correctAnswer` (JSON), `explanation`.

## Extensibility
The model is defined in `prisma/schema.prisma`. You can add new fields or entities by updating the schema and running `npx prisma migrate dev`.
