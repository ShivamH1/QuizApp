import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, FileQuestion } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-slate-600">Manage your quizzes and questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Quiz Management</CardTitle>
                  <CardDescription>Create, edit, and delete quizzes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/admin/quizzes">
                <Button className="w-full">Manage Quizzes</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileQuestion className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Question Management</CardTitle>
                  <CardDescription>Manage questions for your quizzes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/admin/questions">
                <Button className="w-full">Manage Questions</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link to="/admin/quizzes/new">
              <Button>Create New Quiz</Button>
            </Link>
            <Link to="/admin/questions/new">
              <Button variant="outline">Add Question</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

