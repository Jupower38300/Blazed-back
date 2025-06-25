import { Test, TestingModule } from '@nestjs/testing';
import { FreelanceListController } from './freelance-list.controller';
import { FreelanceListService } from './freelance-list.service';

describe('FreelanceListController', () => {
  let controller: FreelanceListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreelanceListController],
      providers: [FreelanceListService],
    }).compile();

    controller = module.get<FreelanceListController>(FreelanceListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
