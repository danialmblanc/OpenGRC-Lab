import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { mockService } from '../../services/mockService';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { Clock, Zap, BarChart, ArrowRight, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

export const JourneysPage = () => {
  const navigate = useNavigate();
  const { data: journeys, isLoading } = useQuery({
    queryKey: ['journeys'],
    queryFn: mockService.getJourneys
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Learning Journeys</h1>
          <p className="text-muted-foreground">Structured paths to master specific GRC roles and domains.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search journeys..."
              className="bg-muted/50 border-none rounded-lg pl-10 pr-4 h-9 text-sm focus:ring-1 focus:ring-primary outline-none w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {journeys?.map((journey, i) => (
          <motion.div
            key={journey.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group h-full flex flex-col bg-card/50 hover:bg-card/80 transition-all border-white/5 hover:border-primary/20 cursor-pointer overflow-hidden" onClick={() => navigate(`/journeys/${journey.slug}`)}>
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 z-20">
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white mb-2">
                    {journey.category}
                  </Badge>
                </div>
                {journey.thumbnail ? (
                  <img src={journey.thumbnail} alt={journey.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                    <BarChart className="h-12 w-12 text-white/20" />
                  </div>
                )}
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {journey.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                    <Zap className="h-3 w-3 fill-current" />
                    {journey.xpReward} XP
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{journey.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                  {journey.description}
                </p>
                <div className="mt-auto pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-0" />
                    </div>
                    <span className="text-xs text-muted-foreground">0%</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
