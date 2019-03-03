import { Test, TestingModule } from '@nestjs/testing';
import { UserMiddleware } from './user.middleware';

describe('UserMiddleware', () => {
  let middleware: UserMiddleware;

  const user = {
    id: 42,
    username: 'testuser',
    firstname: 'test',
    lastname: 'user',
    role: 'admin'
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMiddleware, { provide: 'USER', useValue: user }]
    }).compile();
    middleware = module.get<UserMiddleware>(UserMiddleware);
  });

  it('should set the user to the request object', async () => {
    const request: any = {};

    middleware.use(request, undefined, () => {
      expect(request.user).toEqual(user);
    });
  });
});
