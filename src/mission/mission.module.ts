import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, Profile])],
  providers: [MissionService],
  exports: [TypeOrmModule, MissionService],
  controllers: [MissionController],
})
export class MissionModule {}
