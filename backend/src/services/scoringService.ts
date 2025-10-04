import { Question } from '@prisma/client';

export interface QuestionResult {
  questionId: string;
  questionText: string;
  userAnswer: 'a' | 'b' | 'c' | 'd' | null;
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  isCorrect: boolean;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export interface ScoreResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  questionResults: QuestionResult[];
}

export class ScoringService {
  calculateScore(
    questions: Question[],
    answers: Record<string, 'a' | 'b' | 'c' | 'd'>
  ): ScoreResult {
    let score = 0;
    const totalQuestions = questions.length;
    const questionResults: QuestionResult[] = [];

    questions.forEach(question => {
      const userAnswer = answers[question.id] || null;
      const isCorrect = userAnswer === question.correctOption;

      if (isCorrect) {
        score++;
      }

      questionResults.push({
        questionId: question.id,
        questionText: question.questionText,
        userAnswer,
        correctAnswer: question.correctOption,
        isCorrect,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
      });
    });

    const percentage = Math.round((score / totalQuestions) * 100);

    return {
      score,
      totalQuestions,
      percentage,
      questionResults,
    };
  }
}
