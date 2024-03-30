import express from "express";
import {
  UserController,
  PostController,
  CommentController,
  AuthController,
} from "../controllers";
import { authMiddleware, validator } from "../middlewares";
import { IUserAuth } from "../interface";

const router = express.Router();
router.post("/auth/login", validator("loginSchema"), async (req, res, next) => {
  try {
    const resp = await AuthController.login(req.body);
    return res.status(resp.statusCode).json(resp);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/users",
  validator("createUserSchema"),
  async (req, res, next) => {
    try {
      const resp = await UserController.store(req.body);
      return res.status(resp.statusCode).json(resp);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/users", authMiddleware, async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
  const resp = await UserController.index();
  return res.status(resp.statusCode).json(resp);
});

router.post(
  "/users/:userId/posts",
  authMiddleware,
  validator("createPostSchema", ["body", "params"]),
  async (req, res, next) => {
    try {
      const resp = await PostController.store(Number(req.params.userId), {
        ...req.body,
      });
      return res.status(resp.statusCode).json(resp);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/users/:userId/posts", authMiddleware, async (req, res, next) => {
  try {
    const resp = await PostController.index();
    return res.status(resp.statusCode).json(resp);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/posts/:postId/comments",
  authMiddleware,
  validator("createCommentSchema", ["body", "params"]),
  async (req, res, next) => {
    const user: IUserAuth = (req as any).user;
    try {
      const resp = await CommentController.store({
        ...req.body,
        userId: user.id,
      });
      return res.status(resp.statusCode).json(resp);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/posts/:postId/comments",
  authMiddleware,
  async (req, res, next) => {
    try {
      const resp = await CommentController.index();
      return res.status(resp.statusCode).json(resp);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
