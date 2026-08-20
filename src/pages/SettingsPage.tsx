import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Bell, Shield, Palette, Globe, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../lib/utils';

export const SettingsPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          {[
            { label: 'Profile', icon: User, active: true },
            { label: 'Notifications', icon: Bell },
            { label: 'Security', icon: Shield },
            { label: 'Appearance', icon: Palette },
            { label: 'Language', icon: Globe },
          ].map((item, i) => (
            <button
              key={i}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left',
                item.active ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-muted/50'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card/50 border-white/5">
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>How others see you on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.[0]}
                </div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full bg-muted/50 border-white/5 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    disabled
                    className="w-full bg-muted/20 border-white/5 rounded-lg px-4 py-2 text-muted-foreground cursor-not-allowed"
                  />
                </div>
              </div>
              <Button className="font-bold">Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
