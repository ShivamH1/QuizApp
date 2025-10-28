import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Trash2, Plus, ArrowLeft, FileQuestion } from 'lucide-react';

export function QuestionManagementPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuizId = searchParams.get('quizId');
  
  const { quizzes, questions, fetchQuizzes, fetchQuestions, deleteQuestion, isLoading } = useQuizStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    if (selectedQuizId) {
      fetchQuestions(selectedQuizId);
    }
  }, [selectedQuizId, fetchQuestions]);

  const handleQuizChange = (quizId: string) => {
    setSearchParams({ quizId });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteQuestion(id);
    } catch (error) {
      console.error('Failed to delete question:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const selectedQuiz = quizzes.find((q) => q.id === selectedQuizId);

  return (
    <div className="min-h-[calc(100vh-64px)] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate('/admin')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Question Management</h1>
          <p className="text-lg text-slate-600">Manage questions for your quizzes</p>
        </div>

        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Select Quiz</CardTitle>
            <CardDescription>Choose a quiz to manage its questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Select value={selectedQuizId || ''} onValueChange={handleQuizChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a quiz..." />
                  </SelectTrigger>
                  <SelectContent>
                    {quizzes.map((quiz) => (
                      <SelectItem key={quiz.id} value={quiz.id}>
                        {quiz.title} ({quiz.questionCount} questions)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedQuizId && (
                <Link to={`/admin/questions/new?quizId=${selectedQuizId}`}>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {!selectedQuizId ? (
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <FileQuestion className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No quiz selected</h3>
              <p className="text-slate-600">Please select a quiz to view and manage its questions</p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Loading questions...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {selectedQuiz && (
              <Card className="shadow-lg mb-6">
                <CardHeader>
                  <CardTitle>{selectedQuiz.title}</CardTitle>
                  <CardDescription>
                    {selectedQuiz.description}
                  </CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge>{selectedQuiz.difficulty}</Badge>
                    <Badge variant="outline">{selectedQuiz.category}</Badge>
                  </div>
                </CardHeader>
              </Card>
            )}

            {questions.length === 0 ? (
              <Card className="shadow-lg">
                <CardContent className="py-12 text-center">
                  <FileQuestion className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No questions yet</h3>
                  <p className="text-slate-600 mb-6">Add questions to this quiz to get started</p>
                  <Link to={`/admin/questions/new?quizId=${selectedQuizId}`}>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Question
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={question.id} className="shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">Question {index + 1}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-4">{question.questionText}</CardTitle>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 bg-slate-50 rounded border">
                              <span className="font-semibold text-sm text-slate-600">A.</span> {question.optionA}
                            </div>
                            <div className="p-3 bg-slate-50 rounded border">
                              <span className="font-semibold text-sm text-slate-600">B.</span> {question.optionB}
                            </div>
                            <div className="p-3 bg-slate-50 rounded border">
                              <span className="font-semibold text-sm text-slate-600">C.</span> {question.optionC}
                            </div>
                            <div className="p-3 bg-slate-50 rounded border">
                              <span className="font-semibold text-sm text-slate-600">D.</span> {question.optionD}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {/* <Link to={`/admin/questions/edit/${question.id}?quizId=${selectedQuizId}`}>
                            <Button variant="outline">
                              <Pencil className="w-4 h-4" /> Edit
                            </Button>
                          </Link> */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" disabled={deletingId === question.id}>
                                <Trash2 className="w-4 h-4" /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this question? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(question.id)} className="bg-red-600 hover:bg-red-700">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

