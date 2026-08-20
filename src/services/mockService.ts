import { User, Journey, Lab, Progress, Achievement } from '../types';

export const mockService = {
  getJourneys: async (): Promise<Journey[]> => {
    const response = await fetch('/api/journeys');
    return response.json();
  },

  getJourneyBySlug: async (slug: string): Promise<Journey | undefined> => {
    const response = await fetch(`/api/journeys/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  },

  getLabBySlug: async (slug: string): Promise<Lab | undefined> => {
    const response = await fetch(`/api/labs/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  },

  getAchievements: async (): Promise<Achievement[]> => {
    const response = await fetch('/api/achievements');
    return response.json();
  },

  loginDemo: async (role: 'learner' | 'admin' = 'learner'): Promise<{ user: User; token: string }> => {
    const response = await fetch('/api/auth/demo', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
    return response.json();
  },

  saveProgress: async (progress: Progress): Promise<void> => {
    console.log('Saving progress to backend:', progress);
    // In real app, call /api/progress
    return new Promise((resolve) => setTimeout(resolve, 500));
  },

  // Admin APIs
  getAdminContent: async (): Promise<Journey[]> => {
    const response = await fetch('/api/admin/content');
    return response.json();
  },

  createContent: async (data: any): Promise<any> => {
    const response = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  updateContent: async (id: string, data: any): Promise<any> => {
    const response = await fetch(`/api/admin/content/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteContent: async (id: string): Promise<void> => {
    await fetch(`/api/admin/content/${id}`, { method: 'DELETE' });
  }
};
