import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  createdAt: Date,
  updatedAt: Date,
  password: String,
  role: { type: String, enum: ["ADMIN", "USER"] },
  signUpType: String,
  rewardPointsFromCourses: { type: Number, default: 0 },
  rewardPointsFromQuiz: { type: Number, default: 0 },
  quizAttempts: [{ type: mongoose.Types.ObjectId, ref: "Quiz" }],
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
