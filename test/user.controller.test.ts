import { User } from "../src/models";
import { TestHelper } from "./testUtils";
import app from "../src/app";
import supertest from "supertest";

const request = supertest(app);

let userData: Partial<User>;

describe("user module", () => {
  TestHelper.instance.setupTest();

  userData = TestHelper.instance.generateUserData();

  test("should be able to create user", async () => {
    const res = await request.post("/api/users").send(userData);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User created successfully");
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.name).toBe(userData.name);
    expect(res.body.data.email).toBe(userData.email);
  });

  test("should be able to get list of users", async () => {
    const authRes = await request
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    const token = authRes?.body?.data?.token;

    const res = await request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User fetched successfully");
    expect(res.body.data[0].name).toBeDefined();
    expect(res.body.data[0].email).toBeDefined();
    expect(res.body.data[0].id).toBeDefined();
  });

  test("should throw error for invalid fullname", async () => {
    const res = await request
      .post("/api/users")
      .send({ ...userData, name: "Ridwan" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid full name format");
  });

  test("should throw error for invalid email", async () => {
    const res = await request
      .post("/api/users")
      .send({ ...userData, email: "test.com" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("email must be a valid email");
  });

  test("should throw error for password less than 8", async () => {
    const res = await request
      .post("/api/users")
      .send({ ...userData, password: "pass" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "password length must be at least 8 characters long"
    );
  });

  test("should throw error if email already exists", async () => {
    const res = await request.post("/api/users").send(userData);

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("User with the email already exists");
  });
});
