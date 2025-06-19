// entities/post.entity.ts
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 255, nullable: true })
  image: string;

  @Column({ type: 'timestamp', nullable: true })
  time_posted: Date;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  text: string;

  @Column({ length: 50, nullable: true })
  tags: string;

  @Column({ length: 50, nullable: true })
  related_posts: string;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
