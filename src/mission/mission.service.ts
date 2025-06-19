import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission } from './entities/mission.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionRepository: Repository<Mission>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  findAll() {
    return this.missionRepository.find({ relations: ['industry', 'user'] });
  }

  findOne(id: number) {
    return this.missionRepository.findOne({
      where: { mission_id: id },
      relations: ['industry', 'user'],
    });
  }

  create(mission: Partial<Mission>) {
    return this.missionRepository.save(mission);
  }

  update(id: number, mission: Partial<Mission>) {
    return this.missionRepository.update(id, mission);
  }

  delete(id: number) {
    return this.missionRepository.delete(id);
  }

  async findMatchingMissions(userId: string): Promise<Mission[]> {
    const profile = await this.profileRepository.findOne({
      where: { user_id: userId },
    });

    if (!profile) return [];

    const { domaines, interests } = profile;

    const query = this.missionRepository
      .createQueryBuilder('mission')
      .leftJoinAndSelect('mission.industry', 'industry')
      .leftJoinAndSelect('mission.user', 'user');

    if (domaines?.length) {
      query.orWhere('mission.domaines && :domaines', { domaines });
    }

    if (interests?.length) {
      query.orWhere(
        `EXISTS (
        SELECT 1 FROM unnest(mission.interests) AS interest
        WHERE interest ILIKE ANY(:interests)
      )`,
        { interests },
      );
    }

    return query.getMany();
  }
}
