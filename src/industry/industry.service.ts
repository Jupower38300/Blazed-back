import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Industry } from './entities/industry.entity';

@Injectable()
export class IndustryService {
  constructor(
    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>,
  ) {}

  findAll() {
    return this.industryRepository.find();
  }

  async findByEmail(email: string): Promise<Industry | null> {
    return this.industryRepository.findOne({
      where: { email },
      relations: ['user'], // Load user relation
    });
  }

  findOne(id: number) {
    return this.industryRepository.findOne({ where: { industry_id: id } });
  }

  create(industry: Partial<Industry>) {
    return this.industryRepository.save(industry);
  }

  update(id: number, industry: Partial<Industry>) {
    return this.industryRepository.update(id, industry);
  }

  delete(id: number) {
    return this.industryRepository.delete(id);
  }
}
