import React from 'react';
import { Search, Bell, Flame, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../lib/utils';

export const Topbar = () => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 h-16 border-b bg-background/80 backdrop-blur-md z-40 px-8 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search journeys, labs, or topics..."
            className="w-full bg-muted/50 border-transparent focus:border-primary/20 focus:bg-background h-10 pl-10 pr-4 rounded-full text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 px-4 py-1.5 bg-muted/50 rounded-full border border-white/5">
          <div className="flex items-center gap-1.5 text-orange-500 font-bold text-sm">
            <Flame className="h-4 w-4 fill-current" />
            <span>{user?.streak || 0}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm">
            <Zap className="h-4 w-4 fill-current" />
            <span>{user?.xp || 0} XP</span>
          </div>
        </div>

        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold">{user?.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {user?.name?.[0]}
          </div>
        </div>
      </div>
    </header>
  );
};
