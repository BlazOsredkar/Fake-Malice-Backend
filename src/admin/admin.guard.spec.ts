import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  it('should be defined', () => {
    // @ts-ignore
    expect(new AdminGuard()).toBeDefined();
  });
});
