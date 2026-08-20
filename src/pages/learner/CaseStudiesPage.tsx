import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { BookOpen, Clock, Zap, ArrowRight, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export const CaseStudiesPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Case Studies</h1>
        <p className="text-muted-foreground">Real-world scenarios and business narratives to test your advanced GRC skills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: 'FinTech Growth Crisis',
            company: 'NeoBank Inc.',
            description: 'A rapidly scaling fintech company faces regulatory scrutiny after a series of data breaches and compliance failures.',
            difficulty: 'Advanced',
            time: '2 hours',
            xp: 1000,
            tags: ['FinTech', 'Data Privacy', 'Scaling']
          },
          {
            title: 'The AI Governance Gap',
            company: 'FutureMind AI',
            description: 'Evaluate the risks and governance requirements for a company deploying generative AI across its customer support operations.',
            difficulty: 'Intermediate',
            time: '1.5 hours',
            xp: 750,
            tags: ['AI', 'Ethics', 'Governance']
          }
        ].map((study, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group h-full flex flex-col bg-card/50 hover:bg-card/80 transition-all border-white/5 hover:border-primary/20 cursor-pointer overflow-hidden">
              <div className="h-48 bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-white/20" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    {study.difficulty}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                  {study.company}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{study.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {study.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {study.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-widest">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {study.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-yellow-500 font-bold">
                      <Zap className="h-4 w-4 fill-current" />
                      {study.xp} XP
                    </div>
                  </div>
                  <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
