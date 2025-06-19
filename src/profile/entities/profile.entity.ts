import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('profil')
export class Profile {
  @PrimaryColumn('uuid')
  user_id: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 100, nullable: true })
  phone: string;

  @Column({ length: 20, nullable: true })
  prefix: string;

  @Column({ type: 'boolean', nullable: true })
  newsletter: boolean;

  @Column({ type: 'boolean', nullable: true })
  terms: boolean;

  @Column({ type: 'text', nullable: true })
  profileImageBase64: string;

  @Column({ type: 'text', nullable: true })
  profileTitle: string;

  @Column({ type: 'int', nullable: true })
  dailyRate: number;

  @Column('simple-array', { nullable: true })
  domaines: string[];

  @Column('simple-array', { nullable: true })
  locations: string[];

  @Column({ type: 'text', nullable: true })
  workType: string;

  @Column({ type: 'text', nullable: true })
  workMethod: string;

  @Column({ type: 'text', nullable: true })
  workLevel: string;

  @Column('simple-array', { nullable: true })
  hardSkills: string[];

  @Column('simple-array', { nullable: true })
  stacks: string[];

  @Column('simple-array', { nullable: true })
  langs: string[];

  @Column('simple-array', { nullable: true })
  speak: string[];

  @Column('simple-array', { nullable: true })
  softSkills: string[];

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'text', nullable: true })
  subscription: string;

  @Column({ type: 'text', nullable: true })
  interests: string;
}
