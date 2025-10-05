import { create } from 'zustand';
import { Question, OptionKey, QuizResult, Quiz } from '../types/quiz';

export interface CreateQuizData {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
}

export interface UpdateQuizData {
  title?: string;
  description?: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionCount?: number;
}

export interface CreateQuestionData {
  quizId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: OptionKey;
  orderIndex: number;
}

export interface UpdateQuestionData {
  questionText?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOption?: OptionKey;
  orderIndex?: number;
}

interface QuizState {
  quizzes: Quiz[];
  selectedQuizId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, OptionKey>;
  quizResult: QuizResult | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  startTime: number | null;
  timeElapsed: number;

  // Quiz taking functions
  fetchQuizzes: () => Promise<void>;
  selectQuiz: (quizId: string) => void;
  fetchQuestions: (quizId: string) => Promise<void>;
  setAnswer: (questionId: string, option: OptionKey) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => Promise<void>;
  resetQuiz: () => void;
  startTimer: () => void;
  updateTimeElapsed: (time: number) => void;

  // Quiz CRUD operations
  createQuiz: (data: CreateQuizData) => Promise<Quiz>;
  updateQuiz: (id: string, data: UpdateQuizData) => Promise<Quiz>;
  deleteQuiz: (id: string) => Promise<void>;

  // Question CRUD operations
  createQuestion: (data: CreateQuestionData) => Promise<void>;
  updateQuestion: (id: string, data: UpdateQuestionData) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const useQuizStore = create<QuizState>((set, get) => ({
  quizzes: [],
  selectedQuizId: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  quizResult: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  startTime: null,
  timeElapsed: 0,

  fetchQuizzes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes`);
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
      }
      const data = await response.json();
      set({ quizzes: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },

  selectQuiz: (quizId: string) => {
    set({ selectedQuizId: quizId });
  },

  fetchQuestions: async (quizId: string) => {
    set({ isLoading: true, error: null, selectedQuizId: quizId });
    try {
      const response = await fetch(`${API_BASE_URL}/questions?quizId=${quizId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      set({ questions: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },

  setAnswer: (questionId: string, option: OptionKey) => {
    set(state => ({
      answers: {
        ...state.answers,
        [questionId]: option,
      },
    }));
  },

  nextQuestion: () => {
    set(state => ({
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        state.questions.length - 1
      ),
    }));
  },

  previousQuestion: () => {
    set(state => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    }));
  },

  submitQuiz: async () => {
    const { answers, timeElapsed, selectedQuizId } = get();
    set({ isSubmitting: true, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers, timeTaken: timeElapsed, quizId: selectedQuizId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const result = await response.json();
      set({ quizResult: result, isSubmitting: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isSubmitting: false
      });
    }
  },

  resetQuiz: () => {
    set({
      selectedQuizId: null,
      currentQuestionIndex: 0,
      answers: {},
      quizResult: null,
      error: null,
      startTime: null,
      timeElapsed: 0,
      questions: [],
    });
  },

  startTimer: () => {
    set({ startTime: Date.now() });
  },

  updateTimeElapsed: (time: number) => {
    set({ timeElapsed: time });
  },

  // Quiz CRUD operations
  createQuiz: async (data: CreateQuizData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }

      const newQuiz = await response.json();
      set(state => ({
        quizzes: [...state.quizzes, newQuiz],
        isLoading: false,
      }));
      return newQuiz;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
      throw error;
    }
  },

  updateQuiz: async (id: string, data: UpdateQuizData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update quiz');
      }

      const updatedQuiz = await response.json();
      set(state => ({
        quizzes: state.quizzes.map(quiz =>
          quiz.id === id ? updatedQuiz : quiz
        ),
        isLoading: false,
      }));
      return updatedQuiz;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteQuiz: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/quizzes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete quiz');
      }

      set(state => ({
        quizzes: state.quizzes.filter(quiz => quiz.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
      throw error;
    }
  },

  // Question CRUD operations
  createQuestion: async (data: CreateQuestionData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create question');
      }

      // If the question belongs to the currently selected quiz, refetch questions
      const { selectedQuizId } = get();
      if (selectedQuizId === data.quizId) {
        await get().fetchQuestions(selectedQuizId);
      }

      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
      throw error;
    }
  },

  updateQuestion: async (id: string, data: UpdateQuestionData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update question');
      }

      const updatedQuestion = await response.json();
      set(state => ({
        questions: state.questions.map(question =>
          question.id === id ? { ...question, ...updatedQuestion } : question
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteQuestion: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      set(state => ({
        questions: state.questions.filter(question => question.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
      throw error;
    }
  },
}));
