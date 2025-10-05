import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Trash2, Plus, ArrowLeft, BookOpen, Target, FileQuestion } from 'lucide-react';

export function QuizManagementPage() {
  const navigate = useNavigate();
  const { quizzes, fetchQuizzes, deleteQuiz, isLoading } = useQuizStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteQuiz(id);
    } catch (error) {
      console.error('Failed to delete quiz:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => navigate('/admin')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Quiz Management</h1>
            <p className="text-lg text-slate-600">Create, edit, and manage your quizzes</p>
          </div>
          <Link to="/admin/quizzes/new">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Quiz
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No quizzes yet</h3>
              <p className="text-slate-600 mb-6">Get started by creating your first quiz</p>
              <Link to="/admin/quizzes/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{quiz.title}</CardTitle>
                      <CardDescription className="text-base">{quiz.description}</CardDescription>
                      <div className="flex gap-2 mt-4">
                        <Badge className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {quiz.category}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {quiz.questionCount} Questions
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {/* <Link to={`/admin/quizzes/edit/${quiz.id}`}>
                        <Button variant="outline">
                          <Pencil className="w-4 h-4" /> Edit
                        </Button>
                      </Link> */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" disabled={deletingId === quiz.id}>
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{quiz.title}"? This action cannot be undone and will also delete all associated questions.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(quiz.id)} className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Link to={`/admin/questions?quizId=${quiz.id}`}>
                      <Button variant="default">
                        <FileQuestion className="w-4 h-4 mr-2" />
                        Manage Questions
                      </Button>
                    </Link>
                    <Link to={`/quiz/${quiz.id}`}>
                      <Button variant="default">
                        Preview Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

