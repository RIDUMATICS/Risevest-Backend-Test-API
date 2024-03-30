import { Post } from "../models";
import { createNewPost, fetchPosts } from "../services/post.service";
import { IResponse } from "../interface";

export class PostController {
  static store(userId: number, data: Partial<Post>): Promise<IResponse> {
    return createNewPost(userId, data);
  }

  static index() {
    return fetchPosts({});
  }
}
