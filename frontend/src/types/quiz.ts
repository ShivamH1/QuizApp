export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
}

export interface Question {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  orderIndex: number;
}

export type OptionKey = 'a' | 'b' | 'c' | 'd';

export interface QuestionResult {
  questionId: string;
  questionText: string;
  userAnswer: OptionKey | null;
  correctAnswer: OptionKey;
  isCorrect: boolean;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  questionResults: QuestionResult[];
}
