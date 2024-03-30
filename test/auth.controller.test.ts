import { TestHelper } from "./testUtils";
import supertest from "supertest";
import app from "../src/app";
import { User } from "../src/models";

const request = supertest(app);

let userData: Partial<User>;


describe("auth module", () => {

  TestHelper.instance.setupTest();


  userData = TestHelper.instance.generateUserData();

  test("user should be able to login and generate token", async () => {
    await request.post("/api/users").send(userData);
    const response = await request
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.data.user.name).toBe(userData.name);
    expect(response.body.data.user.email).toBe(userData.email);
    expect(response.body.data.token).toBeDefined();
  });

  test("throw error if password is invalid", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: userData.email, password: "invalidPassword" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid login credentials please recheck"
    );
  });

  test("throw error if email is invalid", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "invalidEmail@gmail.com", password: userData.password });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid login credentials please recheck"
    );
  });
});
