import { PartialType } from '@nestjs/mapped-types';
import { CreateMissionHistoryDto } from './create-mission_history.dto';

export class UpdateMissionHistoryDto extends PartialType(CreateMissionHistoryDto) {}
