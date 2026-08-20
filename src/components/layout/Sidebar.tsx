import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Trophy, 
  Settings, 
  Info, 
  ShieldCheck,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Map, label: 'Journeys', path: '/journeys' },
  { icon: BookOpen, label: 'Case Studies', path: '/case-studies' },
  { icon: Trophy, label: 'Achievements', path: '/achievements' },
  { icon: ShieldCheck, label: 'Admin CMS', path: '/admin' },
];

const secondaryNav = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: Info, label: 'About', path: '/about' },
];

export const Sidebar = () => {
  const { logout } = useAuthStore();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-card/50 backdrop-blur-xl flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-tight">OpenGRC Lab</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
          Main Menu
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground')} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                )}
                <ChevronRight className={cn('h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity', isActive && 'opacity-0')} />
              </>
            )}
          </NavLink>
        ))}

        <div className="pt-8 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
          System
        </div>
        {secondaryNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
