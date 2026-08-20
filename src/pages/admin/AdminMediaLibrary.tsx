import React from 'react';
import { 
  Plus, 
  Search, 
  Image as ImageIcon, 
  File, 
  Video, 
  MoreVertical, 
  Download, 
  Trash2,
  Grid,
  List
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { motion } from 'motion/react';

export const AdminMediaLibrary = () => {
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  const assets = [
    { id: '1', name: 'risk-register-thumbnail.png', type: 'image', size: '1.2 MB', date: '2 days ago' },
    { id: '2', name: 'compliance-intro-video.mp4', type: 'video', size: '45 MB', date: '5 days ago' },
    { id: '3', name: 'iso-27001-checklist.pdf', type: 'document', size: '800 KB', date: '1 week ago' },
    { id: '4', name: 'hero-banner.jpg', type: 'image', size: '2.5 MB', date: '2 weeks ago' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Media Library</h1>
          <p className="text-muted-foreground">Manage your educational assets, videos, and documents.</p>
        </div>
        <Button className="font-bold">
          <Plus className="mr-2 h-4 w-4" />
          Upload Asset
        </Button>
      </div>

      <div className="flex items-center justify-between p-4 bg-card/50 border border-white/5 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets..."
              className="bg-background border-white/10 rounded-lg pl-10 pr-4 h-9 text-sm outline-none focus:ring-1 focus:ring-primary w-64"
            />
          </div>
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
            <Button 
              variant={view === 'grid' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'list' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline">4 Assets</Badge>
           <Badge variant="outline">49.5 MB Total</Badge>
        </div>
      </div>

      <div className={cn(
        'grid gap-6',
        view === 'grid' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1'
      )}>
        {assets.map((asset, i) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            {view === 'grid' ? (
              <Card className="group bg-card/50 border-white/5 hover:border-primary/20 transition-all cursor-pointer overflow-hidden">
                <div className="aspect-square bg-muted/30 flex items-center justify-center relative">
                  {asset.type === 'image' && <ImageIcon className="h-10 w-10 text-blue-500/40" />}
                  {asset.type === 'video' && <Video className="h-10 w-10 text-orange-500/40" />}
                  {asset.type === 'document' && <File className="h-10 w-10 text-purple-500/40" />}
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="secondary" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold truncate mb-1">{asset.name}</div>
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest">
                    <span>{asset.size}</span>
                    <span>{asset.date}</span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-card/50 border-white/5 p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    {asset.type === 'image' && <ImageIcon className="h-5 w-5 text-blue-500" />}
                    {asset.type === 'video' && <Video className="h-5 w-5 text-orange-500" />}
                    {asset.type === 'document' && <File className="h-5 w-5 text-purple-500" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{asset.name}</div>
                    <div className="text-xs text-muted-foreground">{asset.size} • {asset.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
