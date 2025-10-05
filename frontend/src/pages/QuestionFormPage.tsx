import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuizStore, CreateQuestionData } from '../store/quizStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { OptionKey } from '../types/quiz';

export function QuestionFormPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');
  const navigate = useNavigate();
  const { quizzes, questions, createQuestion, updateQuestion, fetchQuestions, fetchQuizzes } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!questionId && questionId !== 'new';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateQuestionData>({
    defaultValues: {
      quizId: quizId || '',
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 'a',
      orderIndex: 0,
    },
  });

  const correctOption = watch('correctOption');
  const selectedQuizId = watch('quizId');

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    if (isEditing && selectedQuizId) {
      fetchQuestions(selectedQuizId);
    }
  }, [isEditing, selectedQuizId, fetchQuestions]);

  useEffect(() => {
    if (isEditing && questions.length > 0) {
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        setValue('questionText', question.questionText);
        setValue('optionA', question.optionA);
        setValue('optionB', question.optionB);
        setValue('optionC', question.optionC);
        setValue('optionD', question.optionD);
        setValue('orderIndex', question.orderIndex);
        // Note: correctOption is not returned from API for security, so we can't pre-fill it
      }
    }
  }, [isEditing, questionId, questions, setValue]);

  const onSubmit = async (data: CreateQuestionData) => {
    setIsSubmitting(true);
    try {
      if (isEditing && questionId) {
        await updateQuestion(questionId, data);
        toast.success('Question updated successfully!');
      } else {
        await createQuestion(data);
        toast.success('Question created successfully!');
      }
      navigate(`/admin/questions?quizId=${data.quizId}`);
    } catch (error) {
      toast.error(isEditing ? 'Failed to update question' : 'Failed to create question');
      console.error('Error saving question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(quizId ? `/admin/questions?quizId=${quizId}` : '/admin/questions')} 
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Questions
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              {isEditing ? 'Edit Question' : 'Create New Question'}
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Update the question details below' : 'Fill in the details to create a new question'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quizId">Quiz *</Label>
                <Select 
                  value={selectedQuizId} 
                  onValueChange={(value) => setValue('quizId', value)}
                  disabled={!!quizId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a quiz..." />
                  </SelectTrigger>
                  <SelectContent>
                    {quizzes.map((quiz) => (
                      <SelectItem key={quiz.id} value={quiz.id}>
                        {quiz.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.quizId && (
                  <p className="text-sm text-red-600">{errors.quizId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="questionText">Question Text *</Label>
                <Textarea
                  id="questionText"
                  placeholder="Enter your question here..."
                  rows={3}
                  {...register('questionText', { required: 'Question text is required' })}
                />
                {errors.questionText && (
                  <p className="text-sm text-red-600">{errors.questionText.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="optionA">Option A *</Label>
                  <Input
                    id="optionA"
                    placeholder="Option A"
                    {...register('optionA', { required: 'Option A is required' })}
                  />
                  {errors.optionA && (
                    <p className="text-sm text-red-600">{errors.optionA.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optionB">Option B *</Label>
                  <Input
                    id="optionB"
                    placeholder="Option B"
                    {...register('optionB', { required: 'Option B is required' })}
                  />
                  {errors.optionB && (
                    <p className="text-sm text-red-600">{errors.optionB.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optionC">Option C *</Label>
                  <Input
                    id="optionC"
                    placeholder="Option C"
                    {...register('optionC', { required: 'Option C is required' })}
                  />
                  {errors.optionC && (
                    <p className="text-sm text-red-600">{errors.optionC.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optionD">Option D *</Label>
                  <Input
                    id="optionD"
                    placeholder="Option D"
                    {...register('optionD', { required: 'Option D is required' })}
                  />
                  {errors.optionD && (
                    <p className="text-sm text-red-600">{errors.optionD.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="correctOption">Correct Answer *</Label>
                <Select value={correctOption} onValueChange={(value) => setValue('correctOption', value as OptionKey)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                    <SelectItem value="c">Option C</SelectItem>
                    <SelectItem value="d">Option D</SelectItem>
                  </SelectContent>
                </Select>
                {errors.correctOption && (
                  <p className="text-sm text-red-600">{errors.correctOption.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderIndex">Order Index</Label>
                <Input
                  id="orderIndex"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register('orderIndex', { valueAsNumber: true })}
                />
                <p className="text-sm text-slate-500">Order in which this question appears in the quiz</p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update Question' : 'Create Question'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(quizId ? `/admin/questions?quizId=${quizId}` : '/admin/questions')}
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

