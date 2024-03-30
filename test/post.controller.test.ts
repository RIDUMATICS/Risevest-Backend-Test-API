import { User } from "../src/models";
import { TestHelper } from "./testUtils";
import app from "../src/app";
import supertest from "supertest";

const request = supertest(app);

let userData: Partial<User>;
let token: string;
let userId: string;

describe("post module", () => {
  TestHelper.instance.setupTest();

  userData = TestHelper.instance.generateUserData();

  test("should be able to create post with token", async () => {
    const userResp = await request.post("/api/users").send(userData);
    const authResp = await request
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    userId = userResp.body.data.id;
    token = authResp.body.data.token;

    const postData = TestHelper.instance.generatePostData();

    const res = await request
      .post(`/api/users/${userId}/posts`)
      .send(postData)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Post created successfully");
    expect(res.body.data.title).toBe(postData.title);
    expect(res.body.data.body).toBe(postData.body);
    expect(res.body.data.user.id).toBe(userId);
  });

  test("should be able to fetch posts", async () => {
    const res = await request
      .get(`/api/users/${userId}/posts`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Post fetched successfully");
    expect(res.body.data[0].title).toBeDefined;
    expect(res.body.data[0].body).toBeDefined;
  });
});
