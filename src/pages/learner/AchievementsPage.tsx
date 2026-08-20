import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trophy, Star, Zap, Target, Shield, Award } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { ACHIEVEMENTS } from '../../services/mockData';
import { motion } from 'motion/react';

export const AchievementsPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Your Achievements</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your progress, unlock badges, and showcase your GRC expertise.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total XP', value: user?.xp, icon: Zap, color: 'text-yellow-500' },
          { label: 'Level', value: user?.level, icon: Star, color: 'text-blue-500' },
          { label: 'Badges Unlocked', value: user?.achievements.length, icon: Trophy, color: 'text-purple-500' },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/50 border-white/5 text-center p-8">
            <div className={cn('h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4', stat.color)}>
              <stat.icon className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Badges & Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((achievement, i) => {
            const isUnlocked = user?.achievements.includes(achievement.id);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={cn(
                  'h-full flex flex-col items-center text-center p-6 transition-all duration-300',
                  isUnlocked ? 'bg-card/80 border-primary/20 shadow-lg shadow-primary/5' : 'bg-card/30 border-white/5 opacity-50 grayscale'
                )}>
                  <div className={cn(
                    'h-20 w-20 rounded-full flex items-center justify-center mb-4 border-4',
                    isUnlocked ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                  )}>
                    {achievement.id === 'first-lab' && <Target className="h-10 w-10" />}
                    {achievement.id === 'streak-3' && <Award className="h-10 w-10" />}
                    {achievement.id === 'risk-master' && <Shield className="h-10 w-10" />}
                  </div>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                  {!isUnlocked && (
                    <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Locked
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
