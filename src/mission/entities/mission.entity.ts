import { Industry } from 'src/industry/entities/industry.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn()
  mission_id: number;

  @ManyToOne(() => Industry, (industry) => industry.missions, {
    onDelete: 'CASCADE',
  })
  industry: Industry;

  @ManyToOne(() => User, (user) => user.missions, { onDelete: 'CASCADE' })
  user?: User;

  @Column({ length: 100 })
  name: string;

  @Column('int')
  budget: number;

  @Column('text')
  description: string;

  @Column({ type: 'date' })
  deadline: Date;

  @Column({ type: 'timestamp' })
  time_posted: Date;

  @Column({ length: 50 })
  status: string;

  // ✅ Ajout des nouveaux champs inspirés de Profile
  @Column('simple-array', { nullable: true })
  domains: string[]; // Domaines d'expertise utilisés dans la mission

  @Column('simple-array', { nullable: true })
  locations: string[]; // Lieux possibles pour la mission

  @Column({ type: 'text', nullable: true })
  workType: string; // présentiel / distanciel / hybride

  @Column({ type: 'text', nullable: true })
  workMethod: string; // mode de collaboration : freelance, portage, CDI...

  @Column({ type: 'text', nullable: true })
  workLevel: string; // junior / intermédiaire / sénior / expert

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
}
