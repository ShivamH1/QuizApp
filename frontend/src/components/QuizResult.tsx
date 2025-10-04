import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Trophy, RotateCcw, CircleCheck as CheckCircle2, Circle as XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { QuizResult as QuizResultType, QuestionResult, OptionKey } from '../types/quiz';
import { useState } from 'react';

interface QuizResultProps {
  result: QuizResultType;
  onRestart: () => void;
}

export function QuizResult({ result, onRestart }: QuizResultProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isPassed = result.percentage >= 70;

  const getOptionLabel = (optionKey: OptionKey): string => {
    return optionKey.toUpperCase();
  };

  const getOptionText = (question: QuestionResult, optionKey: OptionKey): string => {
    switch (optionKey) {
      case 'a': return question.optionA;
      case 'b': return question.optionB;
      case 'c': return question.optionC;
      case 'd': return question.optionD;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-4xl space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div
              className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
                isPassed ? 'bg-green-500' : 'bg-orange-500'
              }`}
            >
              {isPassed ? (
                <Trophy className="w-10 h-10 text-white" />
              ) : (
                <CheckCircle2 className="w-10 h-10 text-white" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold">
              {isPassed ? 'Congratulations!' : 'Quiz Complete!'}
            </CardTitle>
            <CardDescription className="text-base">
              {isPassed
                ? "You've passed the quiz with flying colors!"
                : 'Keep practicing to improve your score.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6 space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900">
                  {result.percentage}%
                </div>
                <div className="text-sm text-slate-600 mt-2">Your Score</div>
              </div>
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Correct Answers
                  </span>
                  <span className="font-bold text-green-600">{result.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Wrong Answers
                  </span>
                  <span className="font-bold text-red-600">
                    {result.totalQuestions - result.score}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-slate-600">Total Questions</span>
                  <span className="font-bold">{result.totalQuestions}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setShowDetails(!showDetails)}
                className="w-full h-12 text-lg"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="w-5 h-5 mr-2" />
                    Hide Question Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5 mr-2" />
                    Show Question Details
                  </>
                )}
              </Button>

              <Button onClick={onRestart} className="w-full h-12 text-lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>

        {showDetails && result.questionResults && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Question Review</CardTitle>
              <CardDescription>
                Review your answers and see the correct ones for questions you missed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.questionResults.map((question, index) => (
                <div
                  key={question.questionId}
                  className={`border rounded-lg p-4 ${
                    question.isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      question.isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {question.isCorrect ? '✓' : '✗'}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-slate-900">
                        Question {index + 1}: {question.questionText}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {(['a', 'b', 'c', 'd'] as OptionKey[]).map((optionKey) => (
                          <div
                            key={optionKey}
                            className={`p-2 rounded text-sm ${
                              optionKey === question.correctAnswer
                                ? 'bg-green-100 border border-green-300 text-green-800'
                                : optionKey === question.userAnswer && !question.isCorrect
                                ? 'bg-red-100 border border-red-300 text-red-800'
                                : 'bg-white border border-slate-200'
                            }`}
                          >
                            <span className="font-medium">
                              {getOptionLabel(optionKey)}:
                            </span>{' '}
                            {getOptionText(question, optionKey)}
                            {optionKey === question.correctAnswer && (
                              <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                            )}
                            {optionKey === question.userAnswer && !question.isCorrect && (
                              <span className="ml-2 text-red-600 font-bold">✗ Your Answer</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {!question.isCorrect && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="text-sm text-blue-800">
                            <span className="font-semibold">Correct Answer:</span>{' '}
                            {getOptionLabel(question.correctAnswer)} - {getOptionText(question, question.correctAnswer)}
                          </p>
                          {question.userAnswer && (
                            <p className="text-sm text-red-700 mt-1">
                              <span className="font-semibold">Your Answer:</span>{' '}
                              {getOptionLabel(question.userAnswer)} - {getOptionText(question, question.userAnswer)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
