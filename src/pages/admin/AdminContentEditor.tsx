import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  Eye,
  Type,
  ListTodo,
  CheckSquare,
  AlignLeft,
  Settings2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockService } from '../../services/mockService';

const taskSchema = z.object({
  type: z.enum(['multiple-choice', 'single-choice', 'text-input', 'sort', 'matching', 'checklist', 'scenario-analysis']),
  question: z.string().min(5, 'Question is required'),
  description: z.string().optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().min(10, 'Explanation is required'),
  hint: z.string().optional(),
});

const contentSchema = z.object({
  type: z.enum(['journey', 'module', 'path', 'lab', 'case-study', 'video']),
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description is required'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  category: z.string().min(2, 'Category is required'),
  estimatedTime: z.string(),
  xpReward: z.number().min(0),
  status: z.enum(['Draft', 'Published', 'Archived']),
  tasks: z.array(taskSchema).optional(),
});

type ContentFormData = z.infer<typeof contentSchema>;

export const ContentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = React.useState(1);

  const { data: existingContent, isLoading: isFetching } = useQuery({
    queryKey: ['admin-content', id],
    queryFn: async () => {
      const content = await mockService.getAdminContent();
      return content.find((c: any) => c.id === id);
    },
    enabled: !!id
  });

  const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      type: 'journey',
      status: 'Draft',
      difficulty: 'Beginner',
      xpReward: 100,
      tasks: []
    }
  });

  React.useEffect(() => {
    if (existingContent) {
      reset({
        ...existingContent,
        type: 'journey' // For now we only support journey CRUD in the mock API
      });
    }
  }, [existingContent, reset]);

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "tasks"
  });

  const contentType = watch('type');

  const mutation = useMutation({
    mutationFn: (data: ContentFormData) => {
      if (id) {
        return mockService.updateContent(id, data);
      }
      return mockService.createContent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      navigate('/admin/journeys');
    }
  });

  const onSubmit = (data: ContentFormData) => {
    mutation.mutate(data);
  };

  if (isFetching) return <div className="flex items-center justify-center py-20">Loading Editor...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Content</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="uppercase tracking-widest text-[10px]">{contentType}</Badge>
              <span className="text-muted-foreground text-sm">Step {step} of 3</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
        </div>
      </div>

      <form className="space-y-8">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Define the core metadata for this content item.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Content Type</label>
                  <select {...register('type')} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary">
                    <option value="journey">Journey</option>
                    <option value="module">Module</option>
                    <option value="path">Path</option>
                    <option value="lab">Lab</option>
                    <option value="case-study">Case Study</option>
                    <option value="video">Video Lesson</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Title</label>
                  <input {...register('title')} placeholder="e.g. Building a Risk Register" className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
                  {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Slug</label>
                  <input {...register('slug')} placeholder="e.g. risk-register-basics" className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Category</label>
                  <input {...register('category')} placeholder="e.g. Risk Management" className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Difficulty</label>
                  <select {...register('difficulty')} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Est. Time</label>
                    <input {...register('estimatedTime')} placeholder="e.g. 30 mins" className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">XP Reward</label>
                    <input type="number" {...register('xpReward', { valueAsNumber: true })} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Description</label>
                  <textarea {...register('description')} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary h-32 resize-none" />
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>
                Next Step: Content Structure
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Tasks/Interactive Builder (Only for Labs/Case Studies) */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Interactive Tasks</h2>
              <Button onClick={() => append({ type: 'multiple-choice', question: '', explanation: '', correctAnswer: '' })}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id} className="bg-card/50 border-white/5 overflow-hidden group">
                  <div className="p-4 bg-muted/30 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Task {index + 1}</span>
                      <Badge variant="secondary" className="text-[10px]">{watch(`tasks.${index}.type`)}</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-3 space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Question</label>
                        <input {...register(`tasks.${index}.question`)} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Type</label>
                        <select {...register(`tasks.${index}.type`)} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary text-sm">
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="single-choice">Single Choice</option>
                          <option value="text-input">Text Input</option>
                          <option value="scenario-analysis">Scenario Analysis</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Correct Answer</label>
                      <input {...register(`tasks.${index}.correctAnswer`)} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Explanation</label>
                      <textarea {...register(`tasks.${index}.explanation`)} className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary text-sm h-20 resize-none" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              {fields.length === 0 && (
                <div className="p-12 border-2 border-dashed border-white/5 rounded-2xl text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                    <ListTodo className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">No tasks added yet</h3>
                    <p className="text-sm text-muted-foreground">Add interactive tasks to make this lab engaging.</p>
                  </div>
                  <Button variant="outline" onClick={() => append({ type: 'multiple-choice', question: '', explanation: '', correctAnswer: '' })}>
                    Add Your First Task
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-8">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Basic Info
              </Button>
              <Button onClick={() => setStep(3)}>
                Next Step: Media & Resources
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Media & Final Review */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
             <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle>Media & Resources</CardTitle>
                <CardDescription>Attach videos, transcripts, and thumbnails.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Video URL (YouTube/Vimeo)</label>
                  <input placeholder="https://youtube.com/..." className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Transcript</label>
                  <textarea placeholder="Paste video transcript here..." className="w-full bg-muted/50 border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-primary h-48 resize-none" />
                </div>
                <div className="p-8 border-2 border-dashed border-white/5 rounded-2xl text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">Thumbnail Image</h3>
                    <p className="text-sm text-muted-foreground">Drag and drop or click to upload (Max 2MB)</p>
                  </div>
                  <Button variant="outline" size="sm">Upload Image</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-8">
              <Button variant="ghost" onClick={() => setStep(2)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Tasks
              </Button>
              <Button size="lg" className="px-12 font-bold" onClick={handleSubmit(onSubmit)}>
                Publish Content
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};
