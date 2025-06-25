import { Module } from '@nestjs/common';
import { FreelanceListService } from './freelance-list.service';
import { FreelanceListController } from './freelance-list.controller';

@Module({
  controllers: [FreelanceListController],
  providers: [FreelanceListService],
})
export class FreelanceListModule {}
