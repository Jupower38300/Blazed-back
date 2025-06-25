import { Test, TestingModule } from '@nestjs/testing';
import { FreelanceListService } from './freelance-list.service';

describe('FreelanceListService', () => {
  let service: FreelanceListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreelanceListService],
    }).compile();

    service = module.get<FreelanceListService>(FreelanceListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
