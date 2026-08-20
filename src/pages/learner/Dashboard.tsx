import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  Zap, 
  Flame, 
  Trophy, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Clock, 
  BarChart3 
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { day: 'Mon', xp: 120 },
  { day: 'Tue', xp: 300 },
  { day: 'Wed', xp: 200 },
  { day: 'Thu', xp: 450 },
  { day: 'Fri', xp: 150 },
  { day: 'Sat', xp: 0 },
  { day: 'Sun', xp: 0 },
];

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
          <p className="text-blue-100 max-w-md mb-6">
            You're on a {user?.streak}-day streak. Keep it up and reach Level { (user?.level || 0) + 1 } by completing 2 more labs today.
          </p>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-bold">
            Continue Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 translate-y-1/4 translate-x-1/4">
          <Zap className="h-64 w-64" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total XP', value: user?.xp, icon: Zap, color: 'text-yellow-500' },
          { label: 'Current Streak', value: `${user?.streak} Days`, icon: Flame, color: 'text-orange-500' },
          { label: 'Labs Completed', value: user?.completedLabs.length, icon: CheckCircle2, color: 'text-green-500' },
          { label: 'Achievements', value: user?.achievements.length, icon: Trophy, color: 'text-purple-500' },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/50 border-white/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn('p-3 rounded-xl bg-muted/50', stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <Card className="lg:col-span-2 bg-card/50 border-white/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Learning Activity</CardTitle>
                <CardDescription>Your XP gain over the last 7 days</CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fafafa' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorXp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommended Content */}
        <Card className="bg-card/50 border-white/5">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your current journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: 'ISO 27001 Mapping', type: 'Lab', time: '45 mins', xp: 350 },
              { title: 'Vendor Risk Analysis', type: 'Case Study', time: '1 hour', xp: 500 },
              { title: 'Policy Drafting 101', type: 'Video', time: '15 mins', xp: 100 },
            ].map((item, i) => (
              <div key={i} className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary/60">{item.type}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                  <Zap className="h-3 w-3 fill-current" />
                  +{item.xp} XP
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4">
              View All Journeys
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
