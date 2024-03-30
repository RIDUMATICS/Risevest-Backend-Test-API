import { User } from "../models";
import { IResponse } from "../interface";
import { createUser, fetchUsers } from "../services/user.service";

export class UserController {
  static store(
    data: Omit<User, "id" | "posts" | "comments">
  ): Promise<IResponse> {
    return createUser(data);
  }

  static index() {
    return fetchUsers({});
  }
}
