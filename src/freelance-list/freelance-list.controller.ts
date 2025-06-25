import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FreelanceListService } from './freelance-list.service';
import { CreateFreelanceListDto } from './dto/create-freelance-list.dto';
import { UpdateFreelanceListDto } from './dto/update-freelance-list.dto';

@Controller('freelance-list')
export class FreelanceListController {
  constructor(private readonly freelanceListService: FreelanceListService) {}

  @Post()
  create(@Body() createFreelanceListDto: CreateFreelanceListDto) {
    return this.freelanceListService.create(createFreelanceListDto);
  }

  @Get()
  findAll() {
    return this.freelanceListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelanceListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFreelanceListDto: UpdateFreelanceListDto) {
    return this.freelanceListService.update(+id, updateFreelanceListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.freelanceListService.remove(+id);
  }
}
