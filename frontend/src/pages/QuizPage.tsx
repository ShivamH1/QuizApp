import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { QuizQuestion } from '../components/QuizQuestion';

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    answers,
    isSubmitting,
    startTime,
    fetchQuestions,
    setAnswer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    startTimer,
    updateTimeElapsed,
  } = useQuizStore();

  useEffect(() => {
    if (quizId) {
      fetchQuestions(quizId);
      startTimer();
    }
  }, [quizId, fetchQuestions, startTimer]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = async () => {
    await submitQuiz();
    navigate('/result');
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <QuizQuestion
      question={currentQuestion}
      currentIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      selectedAnswer={answers[currentQuestion.id]}
      onAnswerSelect={(option) => setAnswer(currentQuestion.id, option)}
      onNext={nextQuestion}
      onPrevious={previousQuestion}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      startTime={startTime}
      onTimeUpdate={updateTimeElapsed}
    />
  );
}

