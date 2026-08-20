import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';
import { LandingPage } from './pages/LandingPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminContentList } from './pages/admin/AdminContentList';
import { ContentEditor } from './pages/admin/AdminContentEditor';
import { AdminMediaLibrary } from './pages/admin/AdminMediaLibrary';
import { Dashboard } from './pages/learner/Dashboard';
import { JourneysPage } from './pages/learner/JourneysPage';
import { JourneyDetailPage } from './pages/learner/JourneyDetailPage';
import { LabPlayerPage } from './pages/learner/LabPlayerPage';
import { CaseStudiesPage } from './pages/learner/CaseStudiesPage';
import { AchievementsPage } from './pages/learner/AchievementsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Learner Routes */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journeys" element={<JourneysPage />} />
            <Route path="/journeys/:slug" element={<JourneyDetailPage />} />
            <Route path="/labs/:slug" element={<LabPlayerPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/journeys" element={<AdminContentList />} />
            <Route path="/admin/paths" element={<AdminContentList />} />
            <Route path="/admin/labs" element={<AdminContentList />} />
            <Route path="/admin/case-studies" element={<AdminContentList />} />
            <Route path="/admin/videos" element={<AdminContentList />} />
            <Route path="/admin/achievements" element={<AdminContentList />} />
            <Route path="/admin/media" element={<AdminMediaLibrary />} />
            <Route path="/admin/content/new" element={<ContentEditor />} />
            <Route path="/admin/content/:id" element={<ContentEditor />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
