import { prisma } from '../lib/prisma';
import { Quiz, Question, Difficulty } from '@prisma/client';

export interface QuizWithQuestions extends Quiz {
  questions: Question[];
}

export class QuizService {
  async getAllQuizzes(): Promise<Quiz[]> {
    return await prisma.quiz.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getQuizById(id: string): Promise<QuizWithQuestions | null> {
    return await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }

  async createQuiz(data: {
    title: string;
    description: string;
    category: string;
    difficulty: Difficulty;
    questionCount: number;
  }): Promise<Quiz> {
    return await prisma.quiz.create({
      data,
    });
  }

  async updateQuiz(id: string, data: Partial<Quiz>): Promise<Quiz> {
    return await prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async deleteQuiz(id: string): Promise<Quiz> {
    return await prisma.quiz.delete({
      where: { id },
    });
  }
}
