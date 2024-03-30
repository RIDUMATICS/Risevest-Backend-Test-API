import * as joi from "joi";

const requiredStr = joi.string().trim().required();

const loginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().required(),
});

const createUserSchema = joi
  .object({
    name: requiredStr
      .regex(
        /^([a-zA-Z]+(?:['\- ]?[a-zA-Z]+)*) ([a-zA-Z]+(?:['\- ]?[a-zA-Z]+)*)$/
      )
      .message("Invalid full name format"),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().min(8).max(30).required(),
  })
  .unknown();

const createPostSchema = joi
  .object({
    title: requiredStr.min(10).max(150),
    body: requiredStr,
    userId: joi.number(),
  })
  .unknown();

const createCommentSchema = joi
  .object({
    content: requiredStr,
    postId: joi.number(),
  })
  .unknown();

export default {
  createUserSchema,
  createPostSchema,
  createCommentSchema,
  loginSchema,
} as { [key: string]: joi.ObjectSchema };
