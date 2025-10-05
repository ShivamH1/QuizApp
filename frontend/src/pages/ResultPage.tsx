import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { QuizResult } from '../components/QuizResult';

export function ResultPage() {
  const navigate = useNavigate();
  const { quizResult, resetQuiz } = useQuizStore();

  const handleRestart = () => {
    resetQuiz();
    navigate('/');
  };

  if (!quizResult) {
    navigate('/');
    return null;
  }

  return <QuizResult result={quizResult} onRestart={handleRestart} />;
}

