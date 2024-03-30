import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from "typeorm";
import { Post, User } from "./index";

@Entity({ name: 'comments'})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @Index()
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @Index()
  post: Post;
}
