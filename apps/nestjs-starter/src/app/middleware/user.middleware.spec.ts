import { Test, TestingModule } from '@nestjs/testing';
import { UserMiddleware } from './user.middleware';

describe('UserMiddleware', () => {
  let middleware: UserMiddleware;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMiddleware]
    }).compile();
    middleware = module.get<UserMiddleware>(UserMiddleware);
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

    const middlewarefunction = middleware.resolve(user);

    middlewarefunction(request, undefined, () => {
      expect(request.user).toEqual(user);
    });
  });

  it('should set no user to the request if it is not provided', async () => {
    const request: any = {};

    const middlewarefunction = middleware.resolve(undefined);

    middlewarefunction(request, undefined, () => {
      expect(request.user).toEqual(undefined);
    });
  });
});
