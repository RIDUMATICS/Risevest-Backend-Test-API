import { IResponse } from "../interface";
import connectDB from "../database/connection";
import { Comment, Post, User } from "../models";
import { NotFoundException } from "../util";
import { plainToInstance } from "class-transformer";
import { PostDTO } from "../dtos";

export const createNewPost = async (
  userId: number,
  data: Partial<Post>
): Promise<IResponse> => {
  const user = await connectDB
    .getRepository(User)
    .findOne({ where: { id: userId } });

  if (!user) {
    throw new NotFoundException(`User with id ${userId} does not exist`);
  }

  data.user = user;
  const createdPost = await connectDB.getRepository(Post).save(data);

  return {
    status: "success",
    statusCode: 201,
    message: "Post created successfully",
    data: plainToInstance(PostDTO, createdPost),
  };
};

export const fetchPosts = async (_filterQuery: {}): Promise<IResponse> => {
  const posts = await connectDB
    .getRepository(Post)
    .find({ relations: ["user", "comments"] });

  return {
    status: "success",
    statusCode: 200,
    message: "Post fetched successfully",
    data: plainToInstance(PostDTO, posts),
  };
};
