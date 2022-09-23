import dbConnect from "../mongoose";
import { Quiz, Question } from "../models/quiz";
import AJV from "ajv";
import { failure, operationSuccessful } from "../common/response";
import mongoose from "mongoose";
import Ajv from "ajv";

const createQuiz = async (name, difficultyLevel, questions, isEnabled) => {
  await dbConnect();
  const ajv = new AJV();
  const quizScehma = {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      difficultyLevel: {
        enum: ["EASY", "MEDIUM", "DIFFICULT", "EXTREMELY_DIFFICULT"],
      },
      isEnabled: {
        type: "boolean",
      },
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: {
              type: "string",
            },
            options: {
              type: "array",
              items: {
                type: "string",
              },
            },
            correctAnswerIndex: {
              type: "number",
            },
            points: {
              type: "number",
            },
          },
          required: ["question", "options", "correctAnswerIndex", "points"],
        },
      },
    },
    required: ["name", "difficultyLevel", "questions"],
    additionalProperties: false,
  };

  const validate = ajv.compile(quizScehma);
  const valid = validate({
    name,
    difficultyLevel,
    questions,
    isEnabled,
  });

  if (!valid) {
    return failure(validate.errors, "Invalid parameters");
  } else {
    let addedQuestions = [];
    for (let index = 0; index < questions.length; index++) {
      const q = questions[index];
      const newQuestion = await Question.create(q);
      console.log(newQuestion);
      addedQuestions.push(newQuestion.id);
    }
    console.log(addedQuestions);
    let quiz = await Quiz.create({
      name,
      difficultyLevel,
      questions: addedQuestions,
      isEnabled,
    });
    quiz = { ...quiz._doc };
    quiz.questions = quiz.questions.map((q, i) => {
      return { ...questions[i], _id: q.toString() };
    });
    return operationSuccessful(quiz);
  }
};

const getQuizById = async (quizId) => {
  const quizData = await Quiz.findOne({
    _id: quizId,
  }).populate("questions");
  if (quizData) {
    return operationSuccessful(quizData);
  } else {
    return failure(
      ["Could not find quiz!"],
      "Quiz ID invalid or quiz not found!"
    );
  }
};

const enableQuiz = async (quizId, enabled) => {
  try {
    const updatedQuiz = await Quiz.findOneAndUpdate(
      {
        _id: quizId,
      },
      {
        $set: {
          isEnabled: enabled,
        },
      },
      { new: true }
    ).populate("questions");
    if (updatedQuiz) {
      return operationSuccessful(updatedQuiz);
    } else {
      return failure(["an error occurred!"], "An internal error occurred!");
    }
  } catch (err) {
    console.log(err);
    return failure([err], "An internal error occurred!");
  }
};

const updateQuiz = async (quizId, name, difficultyLevel, isEnabled) => {
  const data = await getQuizById(quizId);
  if (data.errors.length > 0) {
    return data;
  } else {
    const quiz = data.data;
    let update = { $set: {} };
    if (name != null && name.trim() !== "") {
      update["$set"]["name"] = name;
    }

    if (
      difficultyLevel &&
      ["EASY", "MEDIUM", "DIFFICULT", "EXTREMELY_DIFFICULT"].includes(
        difficultyLevel
      )
    ) {
      update["$set"]["difficultyLevel"] = difficultyLevel;
    }

    if (isEnabled !== null && typeof isEnabled == "boolean") {
      update["$set"]["isEnabled"] = isEnabled;
    }
    let updatedQuiz = await Quiz.findOneAndUpdate(
      {
        _id: quiz._id,
      },
      {
        ...update,
      },
      {
        new: true,
      }
    ).populate("questions");

    return operationSuccessful(updatedQuiz);
  }
};

const addQuestions = async (quizId, questions) => {
  const data = await getQuizById(quizId);
  if (data.errors.length > 0) {
    return data;
  } else {
    const quiz = data.data;
    // let update = { $set: {} };
    var questionSchema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },
          options: {
            type: "array",
            items: {
              type: "string",
            },
          },
          correctAnswerIndex: {
            type: "number",
          },
          points: {
            type: "number",
          },
        },
        required: ["question", "options", "correctAnswerIndex", "points"],
      },
    };
    let validate = new AJV().compile(questionSchema);
    let valid = validate(questions);
    if (!valid) {
      return failure(validate.errors, "Invalid parameters");
    } else {
      let addedQuestions = [];
      for (let index = 0; index < questions.length; index++) {
        const q = questions[index];
        const newQuestion = await Question.create(q);
        console.log(newQuestion);
        addedQuestions.push(newQuestion.id);
      }
      console.log(addedQuestions);
      const updatedQuiz = await Quiz.findOneAndUpdate(
        { _id: quiz._id },
        {
          $push: {
            questions: {
              $each: addedQuestions,
            },
          },
        },
        {
          new: true,
          upsert: true,
        }
      ).populate("questions");
      return operationSuccessful(updatedQuiz);
    }
  }
};

const removeQuestion = async (quizId, questionIds) => {
  const data = await getQuizById(quizId);
  if (data.errors.length > 0) {
    return data;
  } else {
    const quiz = data.data;
    // let update = { $set: {} };
    var questionSchema = {
      type: "array",
      items: {
        type: "string",
      },
    };
    let validate = new AJV().compile(questionSchema);
    let valid = validate(questionIds);
    if (!valid) {
      return failure(validate.errors, "Invalid parameters");
    } else {
      const updatedQuiz = await Quiz.findOneAndUpdate(
        { _id: quiz._id },
        {
          $pullAll: {
            questions: questionIds.map((q) => {
              return { _id: q };
            }),
          },
        },
        {
          new: true,
        }
      );
      return operationSuccessful(updatedQuiz);
    }
  }
};

const listActiveQuizzes = async () => {
  try {
    const quizzes = await Quiz.find({
      isEnabled: true,
    }).populate("questions");
    if (quizzes) {
      return operationSuccessful(quizzes);
    } else {
      return operationSuccessful([]);
    }
  } catch (err) {
    console.log(err);
    return failure([err], "An internal error occurred!");
  }
};

const listAllQuizzes = async () => {
  try {
    const quizzes = await Quiz.find({}).populate("questions");
    if (quizzes) {
      return operationSuccessful(quizzes);
    } else {
      return operationSuccessful([]);
    }
  } catch (err) {
    console.log(err);
    return failure([err], "An internal error occurred!");
  }
};
export {
  createQuiz,
  getQuizById,
  enableQuiz,
  addQuestions,
  removeQuestion,
  updateQuiz,
  listActiveQuizzes,
  listAllQuizzes,
};
