// user.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Industry } from 'src/industry/entities/industry.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { Mission } from 'src/mission/entities/mission.entity';
import { MissionHistory } from 'src/mission_history/entities/mission_history.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { randomUUID } from 'crypto';

@Entity('user')
export class User {
  @PrimaryColumn('uuid')
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation: Date;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
  })
  profile: Profile | null;

  @OneToOne(() => Industry, (industry) => industry.user, {
    cascade: true,
    nullable: true,
  })
  industry: Industry | null;

  @BeforeInsert()
  @BeforeUpdate()
  validateXOR() {
    if (this.profile && this.industry) {
      throw new Error(
        'Un utilisateur ne peut avoir qu’un profil OU une industry, pas les deux.',
      );
    }
    if (!this.profile && !this.industry) {
      throw new Error(
        'Un utilisateur doit avoir soit un profil, soit une industry.',
      );
    }
  }

  @BeforeInsert()
  generateUserId() {
    if (!this.user_id) {
      this.user_id = randomUUID();
    }
  }

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Chat, (chat) => chat.user1)
  chatsSent: Chat[];

  @OneToMany(() => Chat, (chat) => chat.user2)
  chatsReceived: Chat[];

  @OneToMany(() => Mission, (mission) => mission.user)
  missions: Mission[];

  @OneToMany(() => MissionHistory, (history) => history.user)
  missionHistories: MissionHistory[];
}
