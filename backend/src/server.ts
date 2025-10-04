import express from "express";
import cors from "cors";
import quizzesRouter from "./routes/quizRoutes";
import questionRoutes from "./routes/questionRoutes";
import { QuestionController } from "./controller/questionController";

const app = express();
const questionController = new QuestionController();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api/quizzes", quizzesRouter);
app.use("/api/questions", questionRoutes);

app.post(
  "/api/submit",
  questionController.submitAnswers.bind(questionController)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export { app };
