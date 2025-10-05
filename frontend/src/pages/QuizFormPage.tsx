import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuizStore, CreateQuizData } from '../store/quizStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export function QuizFormPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { quizzes, createQuiz, updateQuiz, fetchQuizzes } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!quizId && quizId !== 'new';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateQuizData>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      difficulty: 'medium',
      questionCount: 0,
    },
  });

  const difficulty = watch('difficulty');

  useEffect(() => {
    if (isEditing) {
      fetchQuizzes();
    }
  }, [isEditing, fetchQuizzes]);

  useEffect(() => {
    if (isEditing && quizzes.length > 0) {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz) {
        setValue('title', quiz.title);
        setValue('description', quiz.description);
        setValue('category', quiz.category);
        setValue('difficulty', quiz.difficulty);
        setValue('questionCount', quiz.questionCount);
      }
    }
  }, [isEditing, quizId, quizzes, setValue]);

  const onSubmit = async (data: CreateQuizData) => {
    setIsSubmitting(true);
    try {
      if (isEditing && quizId) {
        await updateQuiz(quizId, data);
        toast.success('Quiz updated successfully!');
      } else {
        await createQuiz(data);
        toast.success('Quiz created successfully!');
      }
      navigate('/admin/quizzes');
    } catch (error) {
      toast.error(isEditing ? 'Failed to update quiz' : 'Failed to create quiz');
      console.error('Error saving quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="outline" onClick={() => navigate('/admin/quizzes')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              {isEditing ? 'Edit Quiz' : 'Create New Quiz'}
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Update the quiz details below' : 'Fill in the details to create a new quiz'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., JavaScript Basics"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this quiz is about..."
                  rows={4}
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  placeholder="e.g., Programming, Science, History"
                  {...register('category', { required: 'Category is required' })}
                />
                {errors.category && (
                  <p className="text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty *</Label>
                <Select value={difficulty} onValueChange={(value) => setValue('difficulty', value as 'easy' | 'medium' | 'hard')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && (
                  <p className="text-sm text-red-600">{errors.difficulty.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="questionCount">Number of Questions *</Label>
                <Input
                  id="questionCount"
                  type="number"
                  min="1"
                  placeholder="e.g., 10"
                  {...register('questionCount', {
                    required: 'Question count is required',
                    min: { value: 1, message: 'Must have at least 1 question' },
                    valueAsNumber: true,
                  })}
                />
                {errors.questionCount && (
                  <p className="text-sm text-red-600">{errors.questionCount.message}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update Quiz' : 'Create Quiz'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/quizzes')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

