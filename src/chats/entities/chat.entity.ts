import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column('text')
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @ManyToOne(() => User, (user) => user.chatsSent, { onDelete: 'CASCADE' })
  user1: User;

  @ManyToOne(() => User, (user) => user.chatsReceived, { onDelete: 'CASCADE' })
  user2: User;
}
