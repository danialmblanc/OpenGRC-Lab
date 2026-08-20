import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Auth Mock
  app.post("/api/auth/demo", (req, res) => {
    const { role } = req.body;
    res.json({
      token: "demo-jwt-token-placeholder",
      user: {
        id: role === 'admin' ? "demo-admin-1" : "demo-user-1",
        name: role === 'admin' ? "Demo Admin" : "Demo Learner",
        email: role === 'admin' ? "admin@opengrc.lab" : "demo@opengrc.lab",
        role: role || "learner",
        xp: role === 'admin' ? 0 : 1250,
        level: role === 'admin' ? 1 : 5,
        streak: role === 'admin' ? 0 : 3,
        completedLabs: [],
        achievements: [],
        preferences: { theme: "dark" }
      }
    });
  });

  // Journeys
  app.get("/api/journeys", async (req, res) => {
    const journeys = await prisma.journey.findMany({
      include: {
        modules: {
          include: {
            paths: {
              include: {
                labs: {
                  include: {
                    tasks: true
                  }
                }
              }
            }
          }
        }
      }
    });
    res.json(journeys);
  });

  app.get("/api/journeys/:slug", async (req, res) => {
    const journey = await prisma.journey.findUnique({
      where: { slug: req.params.slug },
      include: {
        modules: {
          include: {
            paths: {
              include: {
                labs: {
                  include: {
                    tasks: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!journey) return res.status(404).json({ error: "Journey not found" });
    res.json(journey);
  });

  // Labs
  app.get("/api/labs/:slug", async (req, res) => {
    const lab = await prisma.lab.findUnique({
      where: { slug: req.params.slug },
      include: { tasks: true }
    });
    if (!lab) return res.status(404).json({ error: "Lab not found" });
    
    // Parse JSON strings back to objects
    const parsedLab = {
      ...lab,
      objectives: JSON.parse(lab.objectives),
      tasks: lab.tasks.map(task => ({
        ...task,
        options: task.options ? JSON.parse(task.options) : undefined,
        correctAnswer: JSON.parse(task.correctAnswer)
      }))
    };
    res.json(parsedLab);
  });

  // Admin Content Management
  app.get("/api/admin/content", async (req, res) => {
    const journeys = await prisma.journey.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    res.json(journeys);
  });

  app.post("/api/admin/content", async (req, res) => {
    const { type, ...data } = req.body;
    if (type === 'journey') {
      const journey = await prisma.journey.create({
        data: {
          slug: data.slug,
          title: data.title,
          description: data.description,
          category: data.category,
          difficulty: data.difficulty,
          estimatedTime: data.estimatedTime,
          xpReward: data.xpReward,
          status: data.status || 'Draft'
        }
      });
      return res.json(journey);
    }
    // Handle other types as needed
    res.status(400).json({ error: "Unsupported type in this demo" });
  });

  app.put("/api/admin/content/:id", async (req, res) => {
    const { id } = req.params;
    const { type, ...data } = req.body;
    if (type === 'journey') {
      const journey = await prisma.journey.update({
        where: { id },
        data: {
          slug: data.slug,
          title: data.title,
          description: data.description,
          category: data.category,
          difficulty: data.difficulty,
          estimatedTime: data.estimatedTime,
          xpReward: data.xpReward,
          status: data.status
        }
      });
      return res.json(journey);
    }
    res.status(400).json({ error: "Unsupported type in this demo" });
  });

  app.delete("/api/admin/content/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.journey.delete({ where: { id } });
    res.json({ success: true });
  });

  // Achievements
  app.get("/api/achievements", async (req, res) => {
    const achievements = await prisma.achievement.findMany();
    res.json(achievements);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
