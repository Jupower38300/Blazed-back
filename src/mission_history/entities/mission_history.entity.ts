import { Industry } from 'src/industry/entities/industry.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('mission_history')
export class MissionHistory {
  @PrimaryGeneratedColumn()
  history_id: number;

  @ManyToOne(() => Industry, (industry) => industry.missionHistories)
  industry: Industry;

  @ManyToOne(() => User, (user) => user.missionHistories)
  user: User;

  @Column({ length: 100 })
  name: string;

  @Column('int')
  payment: number;

  @Column({ length: 50, nullable: true })
  interests: string;

  @Column('text')
  description: string;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ type: 'timestamp' })
  time_posted: Date;

  @Column({ length: 50, nullable: true })
  tags: string;

  @Column({ length: 50, default: 'completed' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  archived_at: Date;
}
