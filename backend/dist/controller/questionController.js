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
exports.QuestionController = void 0;
const questionService_1 = require("../services/questionService");
const scoringService_1 = require("../services/scoringService");
const questionService = new questionService_1.QuestionService();
const scoringService = new scoringService_1.ScoringService();
class QuestionController {
    getQuestionsByQuizId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizId = req.query.quizId || 'default';
                const questions = yield questionService.getQuestionsByQuizId(quizId);
                res.json(questions);
            }
            catch (error) {
                console.error('Error fetching questions:', error);
                res.status(500).json({ error: 'Failed to fetch questions' });
            }
        });
    }
    createQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { quizId, questionText, optionA, optionB, optionC, optionD, correctOption, orderIndex } = req.body;
                if (!quizId || !questionText || !optionA || !optionB || !optionC || !optionD || !correctOption || orderIndex === undefined) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                const question = yield questionService.createQuestion({
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
            }
            catch (error) {
                console.error('Error creating question:', error);
                res.status(500).json({ error: 'Failed to create question' });
            }
        });
    }
    updateQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const question = yield questionService.updateQuestion(id, updateData);
                res.json(question);
            }
            catch (error) {
                console.error('Error updating question:', error);
                res.status(500).json({ error: 'Failed to update question' });
            }
        });
    }
    deleteQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield questionService.deleteQuestion(id);
                res.status(204).send();
            }
            catch (error) {
                console.error('Error deleting question:', error);
                res.status(500).json({ error: 'Failed to delete question' });
            }
        });
    }
    submitAnswers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { answers, timeTaken, quizId } = req.body;
                if (!answers || typeof answers !== 'object') {
                    return res.status(400).json({ error: 'Invalid answers format' });
                }
                const targetQuizId = quizId || 'general-knowledge';
                const questions = yield questionService.getQuestionsWithAnswersByQuizId(targetQuizId);
                if (questions.length === 0) {
                    return res.status(404).json({ error: 'Quiz not found or has no questions' });
                }
                const result = scoringService.calculateScore(questions, answers);
                res.json(Object.assign(Object.assign({}, result), { timeTaken }));
            }
            catch (error) {
                console.error('Error submitting answers:', error);
                res.status(500).json({ error: 'Failed to submit answers' });
            }
        });
    }
}
exports.QuestionController = QuestionController;
