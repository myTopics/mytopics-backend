import { Test, TestingModule } from '@nestjs/testing';
import { ElenaService } from './elena.service';

describe('ElenaService', () => {
  let service: ElenaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElenaService],
    }).compile();

    service = module.get<ElenaService>(ElenaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
