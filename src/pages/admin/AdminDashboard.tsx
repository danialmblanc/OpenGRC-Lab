import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Map as MapIcon, 
  BookOpen, 
  FileText, 
  Video, 
  Plus, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  FileEdit
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { mockService } from '../../services/mockService';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: journeys } = useQuery({
    queryKey: ['admin-content'],
    queryFn: mockService.getAdminContent
  });

  const stats = [
    { label: 'Total Journeys', value: journeys?.length || 0, icon: Layers, color: 'text-blue-500' },
    { label: 'Active Labs', value: '1', icon: BookOpen, color: 'text-green-500' },
    { label: 'Case Studies', value: '0', icon: FileText, color: 'text-purple-500' },
    { label: 'Video Lessons', value: '0', icon: Video, color: 'text-orange-500' },
  ];

  const recentActivity = [
    { type: 'edit', title: 'Risk Register Basics', time: '2 hours ago', user: 'Admin' },
    { type: 'publish', title: 'ISO 27001 Mapping', time: '5 hours ago', user: 'Admin' },
    { type: 'create', title: 'Vendor Risk Analysis', time: '1 day ago', user: 'Admin' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Overview</h1>
          <p className="text-muted-foreground">Manage your platform content and monitor learner activity.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/admin/media')}>
            Media Library
          </Button>
          <Button onClick={() => navigate('/admin/content/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-card/50 border-white/5">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={cn('p-2 rounded-lg bg-muted/50', stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Health */}
        <Card className="lg:col-span-2 bg-card/50 border-white/5">
          <CardHeader>
            <CardTitle>Content Status</CardTitle>
            <CardDescription>Overview of published vs draft content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: 'Published Content', value: 85, color: 'bg-green-500' },
                { label: 'Drafts', value: 10, color: 'bg-yellow-500' },
                { label: 'Archived', value: 5, color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', item.color)} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/50 border-white/5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes to the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="mt-1">
                  {activity.type === 'edit' && <FileEdit className="h-4 w-4 text-blue-500" />}
                  {activity.type === 'publish' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {activity.type === 'create' && <Plus className="h-4 w-4 text-purple-500" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold group-hover:text-primary transition-colors">{activity.title}</div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                    <span>•</span>
                    <span>{activity.user}</span>
                  </div>
                </div>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-xs font-bold uppercase tracking-widest">
              View All Logs
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
