import { failure, operationSuccessful } from "../common/response";
import {
  courseNameValidation,
  isNumber,
  nameValidation,
} from "../common/validations";
import validator from "../common/validator";
import Course from "../models/course";
import dbConnect from "../mongoose";

const createCourse = async (
  name,
  link,
  perClick,
  perScroll,
  perMinuteSpent
) => {
  await dbConnect();
  console.log(name, link, perClick, perScroll, perMinuteSpent);

  const errors = [
    validator(courseNameValidation(name), "name", "Invalid name!"),
    validator(isNumber(perClick), "click", "Invalid rewards points for click!"),
    validator(
      isNumber(perScroll),
      "scroll",
      "Invalid rewards points for scroll!"
    ),
    validator(
      isNumber(perMinuteSpent),
      "perMinuteSpent",
      "Invalid rewards points for perMinuteSpent!"
    ),
  ];

  //   console.log(errors);

  let finalErrors = errors.filter((e) => e !== true);

  if (finalErrors.length > 0) {
    return failure(finalErrors, "invalid parameters!");
  } else {
    const course = await Course.create({
      name,
      link,
      rewardPoints: {
        perClick,
        perScroll,
        perMinuteSpent,
      },
      createdAt: new Date(Date.now()).toISOString(),
    });

    if (course) {
      return operationSuccessful(course);
    } else {
      return failure(["Could not create course!"], "Failed!");
    }
  }
};

const updateCourse = async (
  courseId,
  name,
  link,
  perClick,
  perScroll,
  perMinuteSpent,
  isActive
) => {
  const course = await getCourseById(courseId);

  if (course.errors.length > 0) {
    return course;
  } else {
    const errors = [
      validator(courseNameValidation(name), "name", "Invalid name!"),
      validator(
        isNumber(perClick),
        "click",
        "Invalid rewards points for click!"
      ),
      validator(
        isNumber(perScroll),
        "scroll",
        "Invalid rewards points for scroll!"
      ),
      validator(
        isNumber(perMinuteSpent),
        "perMinuteSpent",
        "Invalid rewards points for perMinuteSpent!"
      ),
    ];

    let finalErrors = errors.filter((e) => e !== true);

    if (finalErrors.length > 0) {
      return failure(finalErrors, "invalid parameters!");
    } else {
      const course = await Course.findOneAndUpdate(
        {
          _id: courseId,
        },
        {
          name,
          link,
          rewardPoints: {
            perClick,
            perScroll,
            perMinuteSpent,
          },
          isActive,
          updatedAt: new Date(Date.now()).toISOString(),
        },
        {
          new: true,
        }
      );

      if (course) {
        return operationSuccessful(course);
      } else {
        return failure(["Could not create course!"], "Failed!");
      }
    }
  }
};

const getCourseById = async (courseId) => {
  await dbConnect();
  const course = await Course.findOne({ _id: courseId });

  if (course) {
    return operationSuccessful(course);
  } else {
    return failure(["No course found for course id!"], "Invalid course!");
  }
};

const deactivateCourse = async (courseId) => {
  await dbConnect();
  const course = await getCourseById(courseId);

  if (course.errors.length > 0) {
    return course;
  } else {
    let c = await Course.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        isActive: false,
      },
      {
        new: true,
      }
    );
    return operationSuccessful(c);
  }
};

const activateCourse = async (courseId) => {
  await dbConnect();
  const course = await getCourseById(courseId);

  if (course.errors.length > 0) {
    return course;
  } else {
    let c = await Course.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        isActive: true,
      },
      {
        new: true,
      }
    );
    return operationSuccessful(c);
  }
};

const isActiveToggleCourse = async (courseId) => {
  await dbConnect();
  const course = await getCourseById(courseId);

  if (course.errors.length > 0) {
    return course;
  } else {
    let findObj = await Course.findOne({ _id: courseId });
    let c = await Course.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        isActive: !findObj.isActive,
      },
      {
        new: true,
      }
    );
    return operationSuccessful(c);
  }
};

const listCourses = async (page = 1, limit = 100, isActive = null) => {
  await dbConnect();

  const courses = await Course.find({})
    .limit(limit)
    .skip((page - 1) * limit);
  return operationSuccessful(courses);
};

export {
  createCourse,
  updateCourse,
  getCourseById,
  deactivateCourse,
  activateCourse,
  listCourses,
  isActiveToggleCourse,
};
