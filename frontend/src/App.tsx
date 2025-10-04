import { useEffect } from 'react';
import { useQuizStore } from './store/quizStore';
import { QuizStart } from './components/QuizStart';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResult } from './components/QuizResult';
import './App.css';

function App() {
  const {
    quizzes,
    questions,
    currentQuestionIndex,
    answers,
    quizResult,
    isLoading,
    isSubmitting,
    startTime,
    fetchQuizzes,
    fetchQuestions,
    setAnswer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
    startTimer,
    updateTimeElapsed,
  } = useQuizStore();

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const hasStarted = questions.length > 0;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectQuiz = async (quizId: string) => {
    await fetchQuestions(quizId);
    startTimer();
  };

  const handleRestart = () => {
    resetQuiz();
  };

  if (quizResult) {
    return <QuizResult result={quizResult} onRestart={handleRestart} />;
  }

  if (!hasStarted) {
    return <QuizStart quizzes={quizzes} onSelectQuiz={handleSelectQuiz} isLoading={isLoading} />;
  }

  if (currentQuestion) {
    return (
      <QuizQuestion
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswerSelect={(option) => setAnswer(currentQuestion.id, option)}
        onNext={nextQuestion}
        onPrevious={previousQuestion}
        onSubmit={submitQuiz}
        isSubmitting={isSubmitting}
        startTime={startTime}
        onTimeUpdate={updateTimeElapsed}
      />
    );
  }

  return null;
}

export default App;
