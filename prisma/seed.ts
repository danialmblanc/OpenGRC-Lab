import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.lab.deleteMany();
  await prisma.path.deleteMany();
  await prisma.module.deleteMany();
  await prisma.journey.deleteMany();
  await prisma.achievement.deleteMany();

  // Create Journey
  const journey = await prisma.journey.create({
    data: {
      slug: 'beginner-grc',
      title: 'GRC Fundamentals',
      description: 'Master the core concepts of Governance, Risk, and Compliance.',
      category: 'Risk Management',
      difficulty: 'Beginner',
      estimatedTime: '10 hours',
      xpReward: 1000,
      status: 'Published',
      modules: {
        create: [
          {
            title: 'Introduction to GRC',
            description: 'Understanding the three pillars of GRC.',
            status: 'Published',
            sortOrder: 1,
            paths: {
              create: [
                {
                  slug: 'grc-basics',
                  title: 'The GRC Landscape',
                  description: 'Overview of frameworks and regulations.',
                  status: 'Published',
                  sortOrder: 1,
                  labs: {
                    create: [
                      {
                        slug: 'risk-register-basics',
                        title: 'Building a Risk Register',
                        description: 'Learn how to identify and document organizational risks.',
                        type: 'lab',
                        difficulty: 'Beginner',
                        estimatedTime: '30 mins',
                        xpReward: 200,
                        status: 'Published',
                        objectives: JSON.stringify([
                          'Identify 5 common business risks',
                          'Assign impact and likelihood scores',
                          'Calculate inherent risk'
                        ]),
                        tasks: {
                          create: [
                            {
                              type: 'multiple-choice',
                              question: 'What is the primary purpose of a Risk Register?',
                              options: JSON.stringify([
                                'To list all employees in the company',
                                'To document and track identified risks and their mitigations',
                                'To store financial reports',
                                'To manage marketing campaigns'
                              ]),
                              correctAnswer: JSON.stringify('To document and track identified risks and their mitigations'),
                              explanation: 'A risk register is a central repository used to identify, assess, and manage risks throughout an organization.',
                              sortOrder: 1
                            },
                            {
                              type: 'scenario-analysis',
                              question: 'Scenario: A server room has no backup power. What is the most appropriate risk category?',
                              options: JSON.stringify([
                                'Financial Risk',
                                'Operational Risk',
                                'Strategic Risk',
                                'Compliance Risk'
                              ]),
                              correctAnswer: JSON.stringify('Operational Risk'),
                              explanation: 'Infrastructure failures that impact daily business operations fall under Operational Risk.',
                              sortOrder: 2
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });

  // Create Achievements
  await prisma.achievement.createMany({
    data: [
      { id: 'first-lab', title: 'First Steps', description: 'Complete your first interactive lab.', icon: 'target' },
      { id: 'streak-3', title: 'Consistent Learner', description: 'Maintain a 3-day learning streak.', icon: 'flame' },
      { id: 'risk-master', title: 'Risk Master', description: 'Complete all labs in the Risk Management category.', icon: 'shield' }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
