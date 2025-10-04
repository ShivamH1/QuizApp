import { Request, Response } from 'express';
import { QuizService } from '../services/quizService';

const quizService = new QuizService();

export class QuizController {
  async getAllQuizzes(req: Request, res: Response) {
    try {
      const quizzes = await quizService.getAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  }

  async getQuizById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const quiz = await quizService.getQuizById(id);
      
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      res.json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({ error: 'Failed to fetch quiz' });
    }
  }

  async createQuiz(req: Request, res: Response) {
    try {
      const { title, description, category, difficulty, questionCount } = req.body;
      
      if (!title || !description || !category || !difficulty || !questionCount) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const quiz = await quizService.createQuiz({
        title,
        description,
        category,
        difficulty,
        questionCount,
      });

      res.status(201).json(quiz);
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  }

  async updateQuiz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const quiz = await quizService.updateQuiz(id, updateData);
      res.json(quiz);
    } catch (error) {
      console.error('Error updating quiz:', error);
      res.status(500).json({ error: 'Failed to update quiz' });
    }
  }

  async deleteQuiz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await quizService.deleteQuiz(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({ error: 'Failed to delete quiz' });
    }
  }
}
