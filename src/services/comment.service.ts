import { IResponse } from "../interface";
import connectDB from "../database/connection";
import { Comment, Post, User } from "../models";
import { NotFoundException } from "../util";
import { plainToInstance } from "class-transformer";
import { CommentDTO } from "../dtos";

export const createComment = async (data: any): Promise<IResponse> => {
  const [post, user] = await Promise.all([
    connectDB.getRepository(Post).findOne({ where: { id: data.postId } }),
    connectDB.getRepository(User).findOne({ where: { id: data.userId } }),
  ]);

  if (!post) {
    throw new NotFoundException(`Post with id ${data.postId} does not exist`);
  }

  if (!user) {
    throw new NotFoundException(`User with id ${data.userId} does not exist`);
  }

  const createdComment = await connectDB.getRepository(Comment).save({
    ...data,
    user,
    post,
  });

  return {
    status: "success",
    statusCode: 201,
    message: "Comment created successfully",
    data: plainToInstance(CommentDTO, createdComment),
  };
};

export const fetchComments = async (_filterQuery: {}): Promise<IResponse> => {
  const comments = await connectDB.getRepository(Comment).find({
    relations: ["user", "post"],
  });

  return {
    status: "success",
    statusCode: 200,
    message: "Comment fetched successfully",
    data: plainToInstance(CommentDTO, comments),
  };
};
