import {
  BadRequestException,
  NotFoundException,
  generateToken,
  isValidPassword,
} from "../util";
import connectDB from "../database/connection";
import { User } from "../models";
import { IResponse } from "../interface";
import { plainToClass } from "class-transformer";
import { UserDTO } from "../dtos";

export class AuthController {
  static async login(
    data: Pick<User, "email" | "password">
  ): Promise<IResponse> {
    const user = await connectDB
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (!user || !isValidPassword(data.password, user.password)) {
      throw new BadRequestException("Invalid login credentials please recheck");
    }

    const token = generateToken({
      email: user.email,
      id: user.id,
    });

    return {
      status: "success",
      statusCode: 200,
      message: "Login successful",
      data: {
        user: plainToClass(UserDTO, user),
        token,
      },
    };
  }
}
