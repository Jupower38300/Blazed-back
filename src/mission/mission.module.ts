import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Industry } from 'src/industry/entities/industry.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Profile, Industry, User])],
  providers: [MissionService],
  exports: [TypeOrmModule, MissionService],
  controllers: [MissionController],
})
export class MissionModule {}
