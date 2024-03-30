import { IResponse } from "../interface";
import { Comment } from "../models";
import { createComment, fetchComments } from "../services/comment.service";

export class CommentController {
  static store(data: any): Promise<IResponse> {
    return createComment(data);
  }

  static index() {
    return fetchComments({});
  }
}
