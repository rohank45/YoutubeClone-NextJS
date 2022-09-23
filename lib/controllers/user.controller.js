import dbConnect from "../mongoose";
import User from "../models/user";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  roleValidation,
} from "../common/validations";
import bcrypt from "bcryptjs";

import validator from "../common/validator";
import jwt from "jsonwebtoken";
import { failure, operationSuccessful, serverError } from "../common/response";
import { generatePassword } from "../common/utils";
import admin from "firebase-admin";
import serviceAccount from "../firebase-admin.json";
const createUser = async (
  firstName,
  lastName,
  email,
  password,
  role,
  signUpType = "social"
) => {
  await dbConnect();
  const validationErrors = [
    validator(
      nameValidation(firstName),
      "First Name",
      "Name should be greater than 0 and less than 50 characters"
    ),
    validator(
      lastName.trim() == "" || lastName == null || nameValidation(lastName),
      "Last Name",
      "Name should be greater than 0 and less than 50 characters"
    ),
    validator(emailValidation(email), "E-mail", ""),
    validator(
      passwordValidation(password),
      "Password",
      "Password should either be "
    ),
    validator(roleValidation(role), "Password", "Password should either be "),
  ];

  let errors = validationErrors.filter((e) => e !== true);
  if (errors.length > 0) {
    return {
      errors: errors,
      message: "Invalid parameters!",
    };
  } else {
    let finalPassword = password || generatePassword();
    finalPassword = bcrypt.hashSync(password);
    let createdUser = await User.create({
      firstName,
      lastName,
      password: finalPassword,
      email,
      role,
      signUpType,
      createdAt: new Date(Date.now()).toISOString(),
      updatedAt: new Date(Date.now()).toISOString(),
    });
    if (createdUser) {
      createdUser = { ...createdUser._doc };
      delete createdUser.password;

      let token = jwt.sign({ ...createdUser }, process.env.JWT_SECRET, {
        expiresIn: "365 days",
      });
      return operationSuccessful({ ...createdUser, token });
    } else {
      return serverError(["Could not create document in mongo!"]);
    }
  }
};

const checkEmailExists = async (email) => {
  await dbConnect();
  try {
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

const verifyGoogleLogin = async (firstName, lastName, email, idToken) => {
  await dbConnect();
  const adminApp = admin.initializeApp({ credential: serviceAccount });
  try {
    const decodedToken = await adminApp.auth().verifyIdToken(idToken);
    console.log("Verified token!");
    let userExists = await checkEmailExists(email);
    if (userExists) {
      userExists = { ...userExists._doc };
      delete userExists.password;
      const token = jwt.sign({ ...userExists }, process.env.JWT_SECRET, {
        expiresIn: "365 Days",
      });
      return operationSuccessful({
        ...userExists,
        token,
      });
    } else {
      console.log("User does not exist in database, adding the user!");

      return createUser(firstName, lastName, email, null, "USER", "GOOGLE");
    }
  } catch (err) {
    console.log(err);
    return failure(["Could not verify google login!"], "Invalid Params");
  }
};

const listUsers = async (page = 1, limit = 100) => {
  await dbConnect();
  const users = await User.find({})
    .limit(limit)
    .skip(limit * (page - 1))
    .select("-password");
  return operationSuccessful(users);
};

const login = async (email, password) => {
  await dbConnect();
  try {
    const userExists = await checkEmailExists(email);
    if (userExists) {
      console.log(userExists);
      const compareResult = bcrypt.compareSync(password, userExists.password);
      if (compareResult) {
        let u = { ...userExists._doc };
        delete u.password;
        const token = jwt.sign(u, process.env.JWT_SECRET, {
          expiresIn: "365 Days",
        });

        return operationSuccessful({ ...u, token });
      } else {
        return failure(["Invalid credentials!"], "Invalid credentials!");
      }
    } else {
      return failure(["Invalid credentials!"], "Invalid credentials!");
    }
  } catch (err) {
    console.log(err);
    return serverError([err]);
  }
};

export { createUser, checkEmailExists, listUsers, login, verifyGoogleLogin };
