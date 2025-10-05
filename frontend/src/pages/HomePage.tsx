import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { QuizStart } from '../components/QuizStart';

export function HomePage() {
  const navigate = useNavigate();
  const { quizzes, isLoading, fetchQuizzes } = useQuizStore();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleSelectQuiz = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <QuizStart 
      quizzes={quizzes} 
      onSelectQuiz={handleSelectQuiz} 
      isLoading={isLoading} 
    />
  );
}

