import { ConflictException, hashPassword } from "../util";
import connectDB from "../database/connection";
import { IResponse } from "../interface";
import { User } from "../models";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos";

export const createUser = async (
  data: Omit<User, "id" | "posts" | "comments">
): Promise<IResponse> => {
  const existingUser = await connectDB
    .getRepository(User)
    .findOne({ where: { email: data.email } });

  if (existingUser) {
    throw new ConflictException("User with the email already exists");
  }

  data.password = hashPassword(data.password);
  const createdUser = await connectDB.getRepository(User).save(data);

  return {
    status: "success",
    statusCode: 201,
    message: "User created successfully",
    data: plainToInstance(UserDTO, createdUser),
  };
};

export const fetchUsers = async (_filterQuery: {}): Promise<IResponse> => {
  const users = await connectDB.getRepository(User).find();

  return {
    status: "success",
    statusCode: 200,
    message: "User fetched successfully",
    data: plainToInstance(UserDTO, users),
  };
};
