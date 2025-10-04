import { Request, Response } from 'express';
import { QuestionService } from '../services/questionService';
import { ScoringService } from '../services/scoringService';

const questionService = new QuestionService();
const scoringService = new ScoringService();

export class QuestionController {
  async getQuestionsByQuizId(req: Request, res: Response) {
    try {
      const quizId = (req.query.quizId as string) || 'default';
      const questions = await questionService.getQuestionsByQuizId(quizId);
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  }

  async createQuestion(req: Request, res: Response) {
    try {
      const { quizId, questionText, optionA, optionB, optionC, optionD, correctOption, orderIndex } = req.body;
      
      if (!quizId || !questionText || !optionA || !optionB || !optionC || !optionD || !correctOption || orderIndex === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const question = await questionService.createQuestion({
        quizId,
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
        orderIndex,
      });

      res.status(201).json(question);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ error: 'Failed to create question' });
    }
  }

  async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const question = await questionService.updateQuestion(id, updateData);
      res.json(question);
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ error: 'Failed to update question' });
    }
  }

  async deleteQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await questionService.deleteQuestion(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ error: 'Failed to delete question' });
    }
  }

  async submitAnswers(req: Request, res: Response) {
    try {
      const { answers, timeTaken, quizId } = req.body;

      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ error: 'Invalid answers format' });
      }

      const targetQuizId = quizId || 'general-knowledge';

      const questions = await questionService.getQuestionsWithAnswersByQuizId(targetQuizId);
      
      if (questions.length === 0) {
        return res.status(404).json({ error: 'Quiz not found or has no questions' });
      }

      const result = scoringService.calculateScore(questions, answers);

      res.json({
        ...result,
        timeTaken,
      });
    } catch (error) {
      console.error('Error submitting answers:', error);
      res.status(500).json({ error: 'Failed to submit answers' });
    }
  }
}
