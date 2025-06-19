import { Module } from '@nestjs/common';
import { MissionHistoryService } from './mission_history.service';
import { MissionHistoryController } from './mission_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionHistory } from './entities/mission_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionHistory])],
  providers: [MissionHistoryService],
  exports: [TypeOrmModule, MissionHistoryService],
})
export class MissionHistoryModule {}
