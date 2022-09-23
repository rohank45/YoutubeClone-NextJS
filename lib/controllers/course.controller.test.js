import {
  activateCourse,
  createCourse,
  deactivateCourse,
  getCourseById,
  listCourses,
  updateCourse,
} from "./course.controller";
import Course from "../models/course";
import dbConnect from "../mongoose";
describe("Course controller test", () => {
  beforeAll((done) => {
    dbConnect()
      .then((res) => {
        return Course.remove({});
      })
      .then((res) => {
        console.log(res);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  let courseId = "";
  it("Should create a new course", (done) => {
    createCourse(
      "Online Sustainability Courses: What You'll Learn | HBS Online",
      "https://online.hbs.edu/blog/post/sustainability-courses",
      2,
      4,
      2
    ).then((res) => {
      courseId = res.data._id;
      expect(res.errors.length).toBe(0);
      expect(res.data).toBeTruthy();
      expect(res.data._id).toBeTruthy();
      done();
    });
  });

  it("should get course by id", (done) => {
    getCourseById(courseId).then((res) => {
      expect(res.data).toBeTruthy();
      expect(res.data._id).toStrictEqual(courseId);
      done();
    });
  });

  it("Should update an existing course", (done) => {
    updateCourse(
      courseId,
      "Online Sustainability Courses: What You'll Learn",
      "https://online.hbs.edu/blog/post/sustainability-courses",
      2,
      4,
      2,
      true
    ).then((res) => {
      expect(res.errors.length).toBe(0);
      expect(res.data).toBeTruthy();
      expect(res.data._id).toBeTruthy();
      expect(res.data.name).toStrictEqual(
        "Online Sustainability Courses: What You'll Learn"
      );
      expect(res.data.isActive).toBe(true);
      done();
    });
  });

  it("should deactivate the course", (done) => {
    deactivateCourse(courseId).then((res) => {
      expect(res.data.isActive).toStrictEqual(false);
      done();
    });
  });

  it("should activate the course", (done) => {
    activateCourse(courseId).then((res) => {
      expect(res.data.isActive).toStrictEqual(true);
      done();
    });
  });

  it("should return 1 course ", (done) => {
    listCourses(1, 100).then((res) => {
      expect(res.errors.length).toBe(0);
      expect(res.data.length).toBe(1);
      expect(res.data[0]._id).toStrictEqual(courseId);
      done();
    });
  });
});
