import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MissionHistoryService } from './mission_history.service';
import { CreateMissionHistoryDto } from './dto/create-mission_history.dto';
import { UpdateMissionHistoryDto } from './dto/update-mission_history.dto';

@Controller('mission-history')
export class MissionHistoryController {
  constructor(private readonly missionHistoryService: MissionHistoryService) {}

  @Post()
  create(@Body() createMissionHistoryDto: CreateMissionHistoryDto) {
    return this.missionHistoryService.create(createMissionHistoryDto);
  }

  @Get()
  findAll() {
    return this.missionHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMissionHistoryDto: UpdateMissionHistoryDto,
  ) {
    return this.missionHistoryService.update(+id, updateMissionHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionHistoryService.delete(+id);
  }
}
