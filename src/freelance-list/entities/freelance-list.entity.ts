// freelance-list.entity.ts
import { Industry } from 'src/industry/entities/industry.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class FreelanceList {
  @PrimaryGeneratedColumn()
  id: number;

  // Chaque FreelanceList reprend un profil

  @ManyToOne(() => Industry, (industry) => industry.freelanceLists, {
    eager: true,
    onDelete: 'CASCADE',
  })
  industry: Industry;

  @CreateDateColumn()
  addedAt: Date;
}
