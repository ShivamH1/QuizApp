import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Question, OptionKey } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer?: OptionKey;
  onAnswerSelect: (option: OptionKey) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  startTime: number | null;
  onTimeUpdate: (time: number) => void;
}

export function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting,
  startTime,
  onTimeUpdate,
}: QuizQuestionProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
      onTimeUpdate(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const options: { key: OptionKey; text: string }[] = [
    { key: 'a', text: question.optionA },
    { key: 'b', text: question.optionB },
    { key: 'c', text: question.optionC },
    { key: 'd', text: question.optionD },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-blue-600 font-semibold">
                <Clock className="w-4 h-4" />
                {formatTime(elapsedTime)}
              </div>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <h2 className="text-2xl font-bold mt-4">{question.questionText}</h2>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect}>
            <div className="space-y-3">
              {options.map((option) => (
                <div
                  key={option.key}
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all hover:bg-slate-50 ${
                    selectedAnswer === option.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200'
                  }`}
                  onClick={() => onAnswerSelect(option.key)}
                >
                  <RadioGroupItem value={option.key} id={`option-${option.key}`} />
                  <Label
                    htmlFor={`option-${option.key}`}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    <span className="inline-block w-6 text-slate-500">
                      {option.key.toUpperCase()}.
                    </span>{' '}
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="w-32"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          {isLastQuestion ? (
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-32"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button onClick={onNext} className="w-32">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
