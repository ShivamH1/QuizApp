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
exports.QuizService = void 0;
const prisma_1 = require("../lib/prisma");
class QuizService {
    getAllQuizzes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.quiz.findMany({
                orderBy: { createdAt: 'desc' },
            });
        });
    }
    getQuizById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.quiz.findUnique({
                where: { id },
                include: {
                    questions: {
                        orderBy: { orderIndex: 'asc' },
                    },
                },
            });
        });
    }
    createQuiz(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.quiz.create({
                data,
            });
        });
    }
    updateQuiz(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.quiz.update({
                where: { id },
                data,
            });
        });
    }
    deleteQuiz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.quiz.delete({
                where: { id },
            });
        });
    }
}
exports.QuizService = QuizService;
