import { PartialType } from '@nestjs/swagger';
import { CreateFreelanceListDto } from './create-freelance-list.dto';

export class UpdateFreelanceListDto extends PartialType(CreateFreelanceListDto) {}
