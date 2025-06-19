import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionHistory } from './entities/mission_history.entity';

@Injectable()
export class MissionHistoryService {
  constructor(
    @InjectRepository(MissionHistory)
    private readonly missionHistoryRepository: Repository<MissionHistory>,
  ) {}

  findAll() {
    return this.missionHistoryRepository.find({
      relations: ['mission', 'industry', 'user'],
    });
  }

  findOne(id: number) {
    return this.missionHistoryRepository.findOne({
      where: { history_id: id },
      relations: ['mission', 'industry', 'user'],
    });
  }

  create(missionHistory: Partial<MissionHistory>) {
    return this.missionHistoryRepository.save(missionHistory);
  }

  update(id: number, missionHistory: Partial<MissionHistory>) {
    return this.missionHistoryRepository.update(id, missionHistory);
  }

  delete(id: number) {
    return this.missionHistoryRepository.delete(id);
  }
}
