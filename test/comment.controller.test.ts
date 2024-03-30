import { User } from "../src/models";
import { TestHelper } from "./testUtils";
import app from "../src/app";
import supertest from "supertest";

const request = supertest(app);

let token: string;
let userId: string;
let postId: string;

describe("comment module", () => {
  TestHelper.instance.setupTest();

  const userData = TestHelper.instance.generateUserData();
  const commentData = TestHelper.instance.generateCommentData();
  const postData = TestHelper.instance.generatePostData();

  test("should be able to create comment", async () => {
    const userResp = await request.post("/api/users").send(userData);
    const authResp = await request
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });

    token = authResp.body.data.token;
    userId = userResp.body.data.id;

    const postResp = await request
      .post(`/api/users/${userId}/posts`)
      .send(postData)
      .set("Authorization", `Bearer ${token}`);

    postId = postResp.body.data.id;

    const res = await request
      .post(`/api/posts/${postId}/comments`)
      .send(commentData)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Comment created successfully");
    expect(res.body.data.content).toBe(commentData.content);
    expect(res.body.data.post.title).toBe(postData.title);
    expect(res.body.data.post.body).toBe(postData.body);
    expect(res.body.data.post.id).toBe(postId);
    expect(res.body.data.user.id).toBe(userId);
  });
});
