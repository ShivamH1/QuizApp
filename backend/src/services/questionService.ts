import { CorrectOption, Question } from '@prisma/client';
import { prisma } from '../lib/prisma';

export interface QuestionResponse {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  orderIndex: number;
}

export class QuestionService {
  async getQuestionsByQuizId(quizId: string): Promise<QuestionResponse[]> {
    const questions = await prisma.question.findMany({
      where: { quizId },
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        questionText: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        orderIndex: true,
      },
    });

    return questions;
  }

  async getQuestionsWithAnswersByQuizId(quizId: string): Promise<Question[]> {
    return await prisma.question.findMany({
      where: { quizId },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async createQuestion(data: {
    quizId: string;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: CorrectOption;
    orderIndex: number;
  }): Promise<Question> {
    return await prisma.question.create({
      data,
    });
  }

  async updateQuestion(id: string, data: Partial<Question>): Promise<Question> {
    return await prisma.question.update({
      where: { id },
      data,
    });
  }

  async deleteQuestion(id: string): Promise<Question> {
    return await prisma.question.delete({
      where: { id },
    });
  }

  async createManyQuestions(questions: Array<{
    quizId: string;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: CorrectOption;
    orderIndex: number;
  }>): Promise<number> {
    const result = await prisma.question.createMany({
      data: questions,
    });
    return result.count;
  }
}
