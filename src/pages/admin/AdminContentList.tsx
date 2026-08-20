import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Copy, 
  Trash2, 
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockService } from '../../services/mockService';
import { cn } from '../../lib/utils';

export const AdminContentList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: journeys, isLoading } = useQuery({
    queryKey: ['admin-content'],
    queryFn: mockService.getAdminContent
  });

  const deleteMutation = useMutation({
    mutationFn: mockService.deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Content Library</h1>
          <p className="text-muted-foreground">Manage all learning journeys, labs, and case studies.</p>
        </div>
        <Button onClick={() => navigate('/admin/content/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Content
        </Button>
      </div>

      <Card className="bg-card/50 border-white/5">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col md:row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search content..."
                  className="bg-background border-white/10 rounded-lg pl-10 pr-4 h-9 text-sm outline-none focus:ring-1 focus:ring-primary w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">85 Published</Badge>
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">10 Drafts</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-4">Content</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {journeys?.map((journey) => (
                  <tr key={journey.id} className="border-b hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          <Layers className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-bold">{journey.title}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{journey.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-[10px] uppercase tracking-widest">Journey</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn('h-2 w-2 rounded-full', journey.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500')} />
                        <span className="text-xs font-medium">{journey.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs">{journey.difficulty}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(journey.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/admin/content/${journey.id}`)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(journey.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function Layers(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m2.6 12.08 8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83l-8.58 3.9a2 2 0 0 0-1.66 0L2.6 10.25a1 1 0 0 0 0 1.83Z" />
      <path d="m2.6 17.08 8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83l-8.58 3.9a2 2 0 0 0-1.66 0L2.6 15.25a1 1 0 0 0 0 1.83Z" />
    </svg>
  );
}
