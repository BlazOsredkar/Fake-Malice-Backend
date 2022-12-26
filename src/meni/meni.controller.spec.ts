import { Test, TestingModule } from '@nestjs/testing';
import { MeniController } from './meni.controller';

describe('MeniController', () => {
  let controller: MeniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeniController],
    }).compile();

    controller = module.get<MeniController>(MeniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
