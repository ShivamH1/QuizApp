"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const quizService_1 = require("../services/quizService");
const quizService = new quizService_1.QuizService();
class QuizController {
    getAllQuizzes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizzes = yield quizService.getAllQuizzes();
                res.json(quizzes);
            }
            catch (error) {
                console.error('Error fetching quizzes:', error);
                res.status(500).json({ error: 'Failed to fetch quizzes' });
            }
        });
    }
    getQuizById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const quiz = yield quizService.getQuizById(id);
                if (!quiz) {
                    return res.status(404).json({ error: 'Quiz not found' });
                }
                res.json(quiz);
            }
            catch (error) {
                console.error('Error fetching quiz:', error);
                res.status(500).json({ error: 'Failed to fetch quiz' });
            }
        });
    }
    createQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, category, difficulty, questionCount } = req.body;
                if (!title || !description || !category || !difficulty || !questionCount) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                const quiz = yield quizService.createQuiz({
                    title,
                    description,
                    category,
                    difficulty,
                    questionCount,
                });
                res.status(201).json(quiz);
            }
            catch (error) {
                console.error('Error creating quiz:', error);
                res.status(500).json({ error: 'Failed to create quiz' });
            }
        });
    }
    updateQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const quiz = yield quizService.updateQuiz(id, updateData);
                res.json(quiz);
            }
            catch (error) {
                console.error('Error updating quiz:', error);
                res.status(500).json({ error: 'Failed to update quiz' });
            }
        });
    }
    deleteQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield quizService.deleteQuiz(id);
                res.status(204).send();
            }
            catch (error) {
                console.error('Error deleting quiz:', error);
                res.status(500).json({ error: 'Failed to delete quiz' });
            }
        });
    }
}
exports.QuizController = QuizController;
