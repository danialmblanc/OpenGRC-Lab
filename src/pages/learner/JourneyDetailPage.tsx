import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mockService } from '../../services/mockService';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Zap, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const JourneyDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = React.useState<string[]>(['module-1']);

  const { data: journey, isLoading } = useQuery({
    queryKey: ['journey', slug],
    queryFn: () => mockService.getJourneyBySlug(slug!),
    enabled: !!slug
  });

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  if (isLoading) return <div className="animate-pulse space-y-8">
    <div className="h-48 bg-muted rounded-2xl" />
    <div className="space-y-4">
      <div className="h-24 bg-muted rounded-xl" />
      <div className="h-24 bg-muted rounded-xl" />
    </div>
  </div>;

  if (!journey) return <div>Journey not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/journeys')} className="-ml-2">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Journeys
        </Button>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{journey.category}</Badge>
              <Badge variant="outline">{journey.difficulty}</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{journey.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {journey.description}
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {journey.estimatedTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-yellow-500 font-bold">
                <Zap className="h-4 w-4 fill-current" />
                {journey.xpReward} XP Reward
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 aspect-square rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
             <Zap className="h-20 w-20 text-primary/40" />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Curriculum</h2>
        {journey.modules.map((module, i) => (
          <Card key={module.id} className="bg-card/50 border-white/5 overflow-hidden">
            <button 
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{module.title}</h3>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
              </div>
              {expandedModules.includes(module.id) ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            <AnimatePresence>
              {expandedModules.includes(module.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 space-y-3">
                    {module.paths.map(path => (
                      <div key={path.id} className="space-y-2">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-2">
                          {path.title}
                        </div>
                        {path.labs.map(lab => (
                          <div 
                            key={lab.id}
                            onClick={() => navigate(`/labs/${lab.slug}`)}
                            className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group border border-transparent hover:border-white/5"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center">
                                {lab.type === 'video' ? <Play className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                              </div>
                              <div>
                                <div className="font-semibold group-hover:text-primary transition-colors">{lab.title}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-3">
                                  <span>{lab.estimatedTime}</span>
                                  <span>•</span>
                                  <span>{lab.xpReward} XP</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              Start
                            </Button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </div>
  );
};
