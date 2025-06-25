import { Injectable } from '@nestjs/common';
import { CreateFreelanceListDto } from './dto/create-freelance-list.dto';
import { UpdateFreelanceListDto } from './dto/update-freelance-list.dto';

@Injectable()
export class FreelanceListService {
  create(createFreelanceListDto: CreateFreelanceListDto) {
    return 'This action adds a new freelanceList';
  }

  findAll() {
    return `This action returns all freelanceList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freelanceList`;
  }

  update(id: number, updateFreelanceListDto: UpdateFreelanceListDto) {
    return `This action updates a #${id} freelanceList`;
  }

  remove(id: number) {
    return `This action removes a #${id} freelanceList`;
  }
}
