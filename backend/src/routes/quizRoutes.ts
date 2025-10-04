import { Router } from "express";
import { QuizController } from "../controller/quizController";

const router = Router();
const quizController = new QuizController();

router.get("/", quizController.getAllQuizzes.bind(quizController));

router.get("/:id", quizController.getQuizById.bind(quizController));

router.post("/", quizController.createQuiz.bind(quizController));

router.put("/:id", quizController.updateQuiz.bind(quizController));

router.delete("/:id", quizController.deleteQuiz.bind(quizController));

export default router;
