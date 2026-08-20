import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mockService } from '../../services/mockService';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb,
  Trophy,
  ArrowLeft,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../../store/useAuthStore';
import { useProgressStore } from '../../store/useProgressStore';

export const LabPlayerPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { updateXP, completeLab } = useAuthStore();
  const { labProgress, updateLabProgress } = useProgressStore();

  const { data: lab, isLoading } = useQuery({
    queryKey: ['lab', slug],
    queryFn: () => mockService.getLabBySlug(slug!),
    enabled: !!slug
  });

  const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const currentTask = lab?.tasks[currentTaskIndex];
  const progress = lab ? (currentTaskIndex / lab.tasks.length) * 100 : 0;

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    const correct = answer === currentTask?.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct && lab) {
      updateLabProgress(lab.id, {
        answers: { ...labProgress[lab.id]?.answers, [currentTask.id]: answer }
      });
    }
  };

  const nextTask = () => {
    if (!lab) return;
    if (currentTaskIndex < lab.tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    if (!lab) return;
    setIsCompleted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#ffffff']
    });
    updateXP(lab.xpReward);
    completeLab(lab.id);
    updateLabProgress(lab.id, { completed: true });
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading Lab...</div>;
  if (!lab) return <div>Lab not found</div>;

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
        >
          <Trophy className="h-12 w-12 text-green-500" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Lab Completed!</h1>
          <p className="text-xl text-muted-foreground">
            Excellent work! You've mastered the concepts in "{lab.title}".
          </p>
        </div>
        <Card className="bg-card/50 border-white/5 p-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm text-muted-foreground mb-1">XP Earned</div>
              <div className="text-3xl font-bold text-yellow-500">+{lab.xpReward} XP</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
              <div className="text-3xl font-bold text-primary">100%</div>
            </div>
          </div>
        </Card>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="outline" onClick={() => navigate('/journeys')}>
            Back to Journeys
          </Button>
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      {/* Lab Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{lab.title}</h1>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <Badge variant="outline">{lab.difficulty}</Badge>
              <span>{lab.estimatedTime}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-sm font-medium text-muted-foreground">
            Task {currentTaskIndex + 1} of {lab.tasks.length}
          </div>
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        {/* Lab Content / Instructions */}
        <Card className="lg:col-span-2 bg-card/50 border-white/5 flex flex-col overflow-hidden">
          <div className="p-6 border-b bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <HelpCircle className="h-5 w-5 text-primary" />
              Instructions & Context
            </div>
            <Button variant="ghost" size="sm">
              <Lightbulb className="h-4 w-4 mr-2" />
              Get Hint
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 prose prose-invert max-w-none">
            <h3>Objective</h3>
            <ul>
              {lab.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
            </ul>
            <h3>Scenario</h3>
            <p>{lab.description}</p>
            {lab.videoUrl && (
              <div className="aspect-video rounded-xl bg-black mt-8 flex items-center justify-center group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                <Play className="h-16 w-16 text-white group-hover:scale-110 transition-transform" />
                <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-white/60">
                  Watch Explainer Video
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Interactive Task Area */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1 bg-card/50 border-white/5 p-8 flex flex-col">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="uppercase tracking-widest text-[10px]">
                  {currentTask?.type.replace('-', ' ')}
                </Badge>
                <h2 className="text-xl font-bold leading-tight">
                  {currentTask?.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentTask?.options?.map((option, i) => (
                  <button
                    key={i}
                    disabled={showFeedback}
                    onClick={() => handleAnswer(option)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group',
                      selectedAnswer === option 
                        ? (isCorrect ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500')
                        : 'bg-muted/30 border-white/5 hover:border-white/20 hover:bg-muted/50'
                    )}
                  >
                    <span className="text-sm font-medium">{option}</span>
                    {selectedAnswer === option && (
                      isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <div className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">X</div>
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'p-4 rounded-xl border text-sm leading-relaxed',
                      isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-200' : 'bg-red-500/10 border-red-500/20 text-red-200'
                    )}
                  >
                    <div className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</div>
                    {currentTask?.explanation}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Button 
                className="w-full h-12 text-lg font-bold" 
                disabled={!showFeedback}
                onClick={nextTask}
              >
                {currentTaskIndex === lab.tasks.length - 1 ? 'Finish Lab' : 'Next Task'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
