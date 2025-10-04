"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringService = void 0;
class ScoringService {
    calculateScore(questions, answers) {
        let score = 0;
        const totalQuestions = questions.length;
        const questionResults = [];
        questions.forEach(question => {
            const userAnswer = answers[question.id] || null;
            const isCorrect = userAnswer === question.correctOption;
            if (isCorrect) {
                score++;
            }
            questionResults.push({
                questionId: question.id,
                questionText: question.questionText,
                userAnswer,
                correctAnswer: question.correctOption,
                isCorrect,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
            });
        });
        const percentage = Math.round((score / totalQuestions) * 100);
        return {
            score,
            totalQuestions,
            percentage,
            questionResults,
        };
    }
}
exports.ScoringService = ScoringService;
