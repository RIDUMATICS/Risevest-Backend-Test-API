import { Exclude, Type } from "class-transformer";

export class UserDTO {
  id: number;
  name: string;
  email: string;

  @Exclude()
  password: string;

  @Type(() => PostDTO)
  posts: PostDTO[];

  @Type(() => CommentDTO)
  comments: CommentDTO[];
}

export class PostDTO {
  id: number;
  title: string;
  body: string;

  @Type(() => UserDTO)
  user: UserDTO;

  @Type(() => CommentDTO)
  comments: CommentDTO[];
}


export class CommentDTO {
  id: number;
  content: string;
  email: string;
  password: string;

  @Type(() => UserDTO)
  user: UserDTO;

  @Type(() => PostDTO)
  post: PostDTO;
}

