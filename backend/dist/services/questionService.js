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
exports.QuestionService = void 0;
const prisma_1 = require("../lib/prisma");
class QuestionService {
    getQuestionsByQuizId(quizId) {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield prisma_1.prisma.question.findMany({
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
        });
    }
    getQuestionsWithAnswersByQuizId(quizId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.question.findMany({
                where: { quizId },
                orderBy: { orderIndex: 'asc' },
            });
        });
    }
    createQuestion(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.question.create({
                data,
            });
        });
    }
    updateQuestion(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.question.update({
                where: { id },
                data,
            });
        });
    }
    deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.question.delete({
                where: { id },
            });
        });
    }
    createManyQuestions(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.prisma.question.createMany({
                data: questions,
            });
            return result.count;
        });
    }
}
exports.QuestionService = QuestionService;
