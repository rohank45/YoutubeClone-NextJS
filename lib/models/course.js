import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: String,
  link: String,
  rewardPoints: {
    perClick: Number,
    perScroll: Number,
    perMinuteSpent: Number,
  },
  createdAt: Date,
  isActive: { type: Boolean, default: false },
  updatedAt: Date,
});

module.exports =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
