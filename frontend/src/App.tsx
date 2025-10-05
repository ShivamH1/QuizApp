import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Layout } from './components/Layout';
import {
  HomePage,
  QuizPage,
  ResultPage,
  AdminDashboard,
  QuizManagementPage,
  QuizFormPage,
  QuestionManagementPage,
  QuestionFormPage,
} from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/quizzes" element={<QuizManagementPage />} />
          <Route path="/admin/quizzes/:quizId" element={<QuizFormPage />} />
          <Route path="/admin/questions" element={<QuestionManagementPage />} />
          <Route path="/admin/questions/:questionId" element={<QuestionFormPage />} />
        </Routes>
        <Toaster />
      </Layout>
    </Router>
  );
}

export default App;
