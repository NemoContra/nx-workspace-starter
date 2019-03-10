import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('Authentication Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService]
    }).compile();
  });
  it('should be defined', () => {
    const controller: AuthenticationController = module.get<AuthenticationController>(AuthenticationController);
    expect(controller).toBeDefined();
  });
});
