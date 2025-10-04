import { Router } from "express";
import { QuestionController } from "../controller/questionController";

const router = Router();
const questionController = new QuestionController();

router.get(
  "/",
  questionController.getQuestionsByQuizId.bind(questionController)
);

router.post("/", questionController.createQuestion.bind(questionController));

router.put("/:id", questionController.updateQuestion.bind(questionController));

router.delete(
  "/:id",
  questionController.deleteQuestion.bind(questionController)
);

router.post(
  "/submit",
  questionController.submitAnswers.bind(questionController)
);

export default router;
