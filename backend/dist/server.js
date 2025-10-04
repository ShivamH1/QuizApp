"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const quizRoutes_1 = __importDefault(require("./routes/quizRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const questionController_1 = require("./controller/questionController");
const app = (0, express_1.default)();
exports.app = app;
const questionController = new questionController_1.QuestionController();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api/quizzes", quizRoutes_1.default);
app.use("/api/questions", questionRoutes_1.default);
app.post("/api/submit", questionController.submitAnswers.bind(questionController));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
});
