export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ContentStatus = 'Draft' | 'Published' | 'Archived';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'admin';
  xp: number;
  level: number;
  streak: number;
  completedLabs: string[];
  achievements: string[];
  preferences: {
    theme: 'light' | 'dark';
  };
}

export interface Journey {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  estimatedTime: string;
  modules: Module[];
  xpReward: number;
  thumbnail?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  paths: Path[];
  status: ContentStatus;
  sortOrder: number;
}

export interface Path {
  id: string;
  slug: string;
  title: string;
  description: string;
  labs: Lab[];
  status: ContentStatus;
  sortOrder: number;
}

export type LabType = 'lab' | 'case-study' | 'video';

export interface Lab {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: LabType;
  difficulty: Difficulty;
  estimatedTime: string;
  xpReward: number;
  objectives: string[];
  videoUrl?: string;
  transcript?: string;
  tasks: Task[];
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export type TaskType = 
  | 'multiple-choice' 
  | 'single-choice' 
  | 'text-input' 
  | 'sort' 
  | 'matching' 
  | 'checklist' 
  | 'scenario-analysis';

export interface Task {
  id: string;
  type: TaskType;
  question: string;
  description?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
  sortOrder: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Progress {
  userId: string;
  labId: string;
  completed: boolean;
  score: number;
  xpEarned: number;
  lastAccessed: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  createdAt: string;
}
