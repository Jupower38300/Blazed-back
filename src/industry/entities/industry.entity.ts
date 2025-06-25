import { FreelanceList } from 'src/freelance-list/entities/freelance-list.entity';
import { Mission } from 'src/mission/entities/mission.entity';
import { MissionHistory } from 'src/mission_history/entities/mission_history.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('industry')
export class Industry {
  @PrimaryGeneratedColumn()
  industry_id: number;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  password_hash: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  profileImageBase64: string;

  @Column({ type: 'text' })
  size: string;

  @ManyToOne(() => User, (user) => user.industry, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userUserId', referencedColumnName: 'user_id' })
  user: User;

  @Column({ type: 'uuid', name: 'userUserId' }) // Ajoutez ceci
  userUserId: string;

  @Column('simple-array', { nullable: true })
  valeurs: string[];

  @OneToMany(() => Mission, (mission) => mission.industry)
  missions: Mission[];

  @OneToMany(() => MissionHistory, (history) => history.industry)
  missionHistories: MissionHistory[];

  @OneToMany(() => FreelanceList, (freelance) => freelance.industry)
  freelanceLists: FreelanceList[];
}
