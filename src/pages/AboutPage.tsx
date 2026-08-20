import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Github, Globe, Mail, BookOpen, Heart } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">About OpenGRC Lab</h1>
        <p className="text-xl text-muted-foreground">
          An open-source interactive learning platform for the next generation of GRC professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-card/50 border-white/5 p-8 space-y-4">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            We believe that GRC shouldn't be boring. Our mission is to provide high-quality, 
            hands-on learning experiences that bridge the gap between theory and practice 
            in Governance, Risk, and Compliance.
          </p>
        </Card>

        <Card className="bg-card/50 border-white/5 p-8 space-y-4">
          <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
            <Heart className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">Open Source</h3>
          <p className="text-muted-foreground leading-relaxed">
            OpenGRC Lab is built by the community, for the community. The entire platform 
            is open source, allowing anyone to contribute labs, improve the engine, 
            or host their own instance.
          </p>
        </Card>
      </div>

      <Card className="bg-card/50 border-white/5 p-12 text-center space-y-8">
        <h2 className="text-3xl font-bold">Join the Community</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Whether you're a GRC expert looking to share your knowledge or a developer 
          wanting to help build the platform, we'd love to have you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="font-bold">
            <Github className="mr-2 h-5 w-5" />
            Star on GitHub
          </Button>
          <Button size="lg" variant="outline" className="font-bold">
            <Globe className="mr-2 h-5 w-5" />
            Visit Website
          </Button>
          <Button size="lg" variant="ghost" className="font-bold">
            <Mail className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Built with ❤️ by the OpenGRC Team
      </div>
    </div>
  );
};
