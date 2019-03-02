import { Test, TestingModule } from '@nestjs/testing';
import { UserMiddleware } from './user.middleware';

describe('UserMiddleware', () => {
  let service: UserMiddleware;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMiddleware]
    }).compile();
    service = module.get<UserMiddleware>(UserMiddleware);
  });

  it('should set the user to the request object', async () => {
    const request: any = {};
    const user = {
      id: 42,
      username: 'testuser',
      firstname: 'test',
      lastname: 'user',
      role: 'admin'
    };

    const middlewarefunction = service.resolve(user);

    middlewarefunction(request, undefined, () => {
      expect(request.user).toEqual(user);
    });
  });

  it('should set no user to the request if it is not provided', async () => {
    const request: any = {};

    const middlewarefunction = service.resolve(undefined);

    middlewarefunction(request, undefined, () => {
      expect(request.user).toEqual(undefined);
    });
  });
});
