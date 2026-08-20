import { Journey, Lab, Achievement } from '../types';

export const JOURNEYS: Journey[] = [
  {
    id: 'journey-1',
    slug: 'beginner-grc',
    title: 'GRC Fundamentals',
    description: 'Master the core concepts of Governance, Risk, and Compliance.',
    category: 'Risk Management',
    difficulty: 'Beginner',
    estimatedTime: '10 hours',
    xpReward: 1000,
    status: 'Published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to GRC',
        description: 'Understanding the three pillars of GRC.',
        status: 'Published',
        sortOrder: 1,
        paths: [
          {
            id: 'path-1',
            slug: 'grc-basics',
            title: 'The GRC Landscape',
            description: 'Overview of frameworks and regulations.',
            status: 'Published',
            sortOrder: 1,
            labs: [
              {
                id: 'lab-1',
                slug: 'risk-register-basics',
                title: 'Building a Risk Register',
                description: 'Learn how to identify and document organizational risks.',
                type: 'lab',
                difficulty: 'Beginner',
                estimatedTime: '30 mins',
                xpReward: 200,
                status: 'Published',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                objectives: [
                  'Identify 5 common business risks',
                  'Assign impact and likelihood scores',
                  'Calculate inherent risk'
                ],
                tasks: [
                  {
                    id: 'task-1',
                    type: 'multiple-choice',
                    question: 'What is the primary purpose of a Risk Register?',
                    options: [
                      'To list all employees in the company',
                      'To document and track identified risks and their mitigations',
                      'To store financial reports',
                      'To manage marketing campaigns'
                    ],
                    correctAnswer: 'To document and track identified risks and their mitigations',
                    explanation: 'A risk register is a central repository used to identify, assess, and manage risks throughout an organization.',
                    sortOrder: 1
                  },
                  {
                    id: 'task-2',
                    type: 'scenario-analysis',
                    question: 'Scenario: A server room has no backup power. What is the most appropriate risk category?',
                    options: [
                      'Financial Risk',
                      'Operational Risk',
                      'Strategic Risk',
                      'Compliance Risk'
                    ],
                    correctAnswer: 'Operational Risk',
                    explanation: 'Infrastructure failures that impact daily business operations fall under Operational Risk.',
                    sortOrder: 2
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-lab',
    title: 'First Steps',
    description: 'Complete your first interactive lab.',
    icon: 'target'
  },
  {
    id: 'streak-3',
    title: 'Consistent Learner',
    description: 'Maintain a 3-day learning streak.',
    icon: 'flame'
  },
  {
    id: 'risk-master',
    title: 'Risk Master',
    description: 'Complete all labs in the Risk Management category.',
    icon: 'shield'
  }
];
