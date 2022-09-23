import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswerIndex: Number,
  points: Number,
});

const QuizSchema = new mongoose.Schema({
  name: String,
  difficultyLevel: String,
  isEnabled: { type: Boolean, default: false },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

module.exports.Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
module.exports.Quiz =
  mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
