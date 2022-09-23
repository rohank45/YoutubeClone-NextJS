import dbConnect from "../mongoose";
import { Quiz, Question } from "../models/quiz";
import {
  addQuestions,
  createQuiz,
  enableQuiz,
  getQuizById,
  listActiveQuizzes,
  listAllQuizzes,
  removeQuestion,
  updateQuiz,
} from "./quiz.controller";
describe("Quiz controller test", () => {
  beforeAll((done) => {
    dbConnect()
      .then((res) => {
        return Quiz.remove({});
      })
      .then((res) => {
        return Question.remove({});
      })
      .then((res) => {
        done();
      });
  });

  it("should fail with validation errors", (done) => {
    createQuiz(
      "Easy",
      "EASY",
      [
        {
          question: "How fast a cheetah",
          options: ["fast", "damn fast", "faster", "slow"],
        },
      ],
      true
    ).then((res) => {
      expect(res.errors.length).toBeGreaterThan(0);
      done();
    });
  });
  let quizId;
  it("should create a new quiz", (done) => {
    createQuiz(
      "Easy",
      "EASY",
      [
        {
          question: "How fast is a cheetah",
          options: ["fast", "damn fast", "faster", "slow"],
          correctAnswerIndex: 0,
          points: 10,
        },
      ],
      true
    ).then((res) => {
      console.log(JSON.stringify(res));
      expect(res.errors.length).toBe(0);
      expect(res.data.questions.length).toBe(1);
      expect(res.data.name).toStrictEqual("Easy");
      expect(res.data._id).toBeTruthy();
      expect(res.data.isEnabled).toBeTruthy();
      quizId = res.data._id;
      done();
    });
  });

  it("should get quiz by id", (done) => {
    getQuizById(quizId).then((res) => {
      expect(res.data._id).toStrictEqual(quizId);
      expect(res.data.name).toStrictEqual("Easy");
      done();
    });
  });

  it("should enable the quiz", (done) => {
    enableQuiz(quizId, true).then((res) => {
      expect(res.data.isEnabled).toStrictEqual(true);
      done();
    });
  });

  it("should disable the quiz", (done) => {
    enableQuiz(quizId, false).then((res) => {
      expect(res.data.isEnabled).toStrictEqual(false);
      done();
    });
  });

  it("should update the quiz", (done) => {
    updateQuiz(quizId, "Easy 2", "EASY", true).then((res) => {
      console.log(res);
      expect(res.data._id).toStrictEqual(quizId);
      expect(res.data.name).toStrictEqual("Easy 2");
      expect(res.data.isEnabled).toBeTruthy();
      done();
    });
  });
  let removeQuestionId = "";
  it("should add a new question to quiz", (done) => {
    addQuestions(quizId, [
      {
        question: "How fast is a leopard",
        options: ["faster than a cheetah", "faster than a lion"],
        correctAnswerIndex: 0,
        points: 10,
      },
    ]).then((res) => {
      // console.log(res);
      expect(res.data._id).toStrictEqual(quizId);
      expect(res.data.questions.length).toStrictEqual(2);
      removeQuestionId = res.data.questions[1]._id;
      done();
    });
  });

  it("should remove a question from the quiz", (done) => {
    removeQuestion(quizId, [removeQuestionId.toString()]).then((res) => {
      expect(res.data._id).toStrictEqual(quizId);
      expect(res.data.questions.length).toStrictEqual(1);
      done();
    });
  });

  it("should list all active quizzes", (done) => {
    createQuiz("Diff", "DIFFICULT", [
      {
        question: "How fast is a PYTHON",
        options: ["fast", "damn fast", "faster", "slow"],
        correctAnswerIndex: 0,
        points: 10,
      },
    ])
      .then((res) => {
        return listActiveQuizzes();
      })
      .then((res) => {
        expect(res.data.length).toStrictEqual(1);
        expect(res.data[0]._id).toStrictEqual(quizId);
        done();
      });
  });

  it("should list all the quizzes, 2 quizzes", (done) => {
    listAllQuizzes().then((res) => {
      expect(res.data.length).toStrictEqual(2);
      done();
    });
  });
});
