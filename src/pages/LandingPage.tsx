import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Globe, Trophy, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'motion/react';
import { mockService } from '../services/mockService';
import { useAuthStore } from '../store/useAuthStore';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleDemoLogin = async (role: 'learner' | 'admin' = 'learner') => {
    try {
      const { user, token } = await mockService.loginDemo(role);
      setAuth(user, token);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Zap className="h-4 w-4 fill-current" />
            <span>Open Source GRC Learning Platform</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Master GRC with <br /> Hands-on Labs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The interactive platform for Governance, Risk, and Compliance professionals. 
            Learn by doing with scenario-driven exercises, case studies, and real-world simulations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold group" onClick={() => handleDemoLogin('learner')}>
              Try Demo Learner
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold group" onClick={() => handleDemoLogin('admin')}>
              Try Demo Admin
              <ShieldCheck className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Hero Image/Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[120px] -z-10" />
          <Card className="max-w-5xl mx-auto aspect-video bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
            <div className="h-8 bg-muted/50 flex items-center px-4 gap-2 border-b">
              <div className="h-3 w-3 rounded-full bg-red-500/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/50" />
            </div>
            <div className="p-8 flex items-center justify-center h-full text-muted-foreground italic">
              Interactive Dashboard Preview
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Interactive Labs',
              description: 'Real-world scenarios where you build risk registers, test controls, and map policies.'
            },
            {
              icon: Globe,
              title: 'Role-Based Journeys',
              description: 'Tailored learning paths for GRC Analysts, Auditors, and Risk Managers.'
            },
            {
              icon: Trophy,
              title: 'Gamified Progress',
              description: 'Earn XP, unlock badges, and track your streak as you master complex frameworks.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-8 h-full bg-card/30 hover:bg-card/50 transition-colors border-white/5">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t bg-card/30">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">OpenGRC Lab</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 OpenGRC Lab. Open Source MIT License.
          </div>
        </div>
      </footer>
    </div>
  );
};
