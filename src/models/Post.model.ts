import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from "typeorm";
import { User, Comment } from "./index";

@Entity({ name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  @Index()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
