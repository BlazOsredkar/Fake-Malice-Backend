import { Test, TestingModule } from '@nestjs/testing';
import { MeniService } from './meni.service';

describe('MeniService', () => {
  let service: MeniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeniService],
    }).compile();

    service = module.get<MeniService>(MeniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
