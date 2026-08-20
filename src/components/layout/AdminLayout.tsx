import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Map as MapIcon, 
  Video, 
  FileText, 
  Trophy, 
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'motion/react';

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: Layers, label: 'Journeys', path: '/admin/journeys' },
  { icon: MapIcon, label: 'Paths', path: '/admin/paths' },
  { icon: BookOpen, label: 'Labs', path: '/admin/labs' },
  { icon: FileText, label: 'Case Studies', path: '/admin/case-studies' },
  { icon: Video, label: 'Videos', path: '/admin/videos' },
  { icon: Trophy, label: 'Achievements', path: '/admin/achievements' },
  { icon: ImageIcon, label: 'Media Library', path: '/admin/media' },
];

export const AdminLayout = () => {
  const { user, logout } = useAuthStore();

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-foreground flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#09090b] flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight">OpenGRC Admin</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Control Panel</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-sm',
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Learner View</span>
          </NavLink>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Admin Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-bold">{user?.name}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">System Administrator</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
