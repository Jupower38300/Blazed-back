import { Mission } from 'src/mission/entities/mission.entity';
import { MissionHistory } from 'src/mission_history/entities/mission_history.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('industry')
export class Industry {
  @PrimaryGeneratedColumn()
  industry_id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  profileImageBase64: string;

  @Column({ type: 'text' })
  size: string;

  @Column('simple-array', { nullable: true })
  valeurs: string[];

  @OneToMany(() => Mission, (mission) => mission.industry)
  missions: Mission[];

  @OneToMany(() => MissionHistory, (history) => history.industry)
  missionHistories: MissionHistory[];
}
