import * as userController from "./user.controller";
import dbConnect from "../mongoose";
import User from "../models/user";
describe("Test User's controller", () => {
  beforeAll((done) => {
    dbConnect()
      .then((res) => {
        return User.remove({});
      })
      .then((res) => {
        console.log(res);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it("should create a new user", (done) => {
    userController
      .createUser(
        "Harshit",
        "kanodia",
        "harshit@simplifytech.in",
        "Secret123!",
        "ADMIN",
        "API"
      )
      .then((res) => {
        expect(res.errors.length).toBe(0);
        expect(res.data).toBeTruthy();
        expect(res.data.token).toBeTruthy();
        done();
      });
  });

  it("should return true for user exists", (done) => {
    userController.checkEmailExists("harshit@simplifytech.in").then((res) => {
      console.log(`${res}`);
      expect(res).toBeTruthy();
      done();
    });
  });

  it("should return false for user exists", (done) => {
    userController.checkEmailExists("harshit@simplif.in").then((res) => {
      console.log(`${res}`);
      expect(res).toBeFalsy();
      done();
    });
  });

  it("should return 1 user", (done) => {
    userController.listUsers(1, 100).then((res) => {
      expect(res.data).toBeTruthy();
      console.log(res.data);
      expect(res.data.length).toBe(1);
      done();
    });
  });

  it("Should successfully login", (done) => {
    userController
      .login("harshit@simplifytech.in", "Secret123!")
      .then((res) => {
        console.log(res);
        expect(res.errors.length).toBe(0);
        expect(res.data).toBeTruthy();
        expect(res.data.token).toBeTruthy();
        done();
      })
      .catch((err) => {});
  });

  it("Should fail login", (done) => {
    userController
      .login("harshit@simplifytech.i", "Secret123!")
      .then((res) => {
        console.log(res);
        expect(res.errors.length).toBe(1);
        done();
      })
      .catch((err) => {});
  });
});
