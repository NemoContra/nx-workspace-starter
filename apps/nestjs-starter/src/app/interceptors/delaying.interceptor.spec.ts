import { DelayingInterceptor } from './delaying.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import { fakeSchedulers } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('DelayingInterceptor', () => {
  let module: TestingModule;
  let delayingInterceptor: DelayingInterceptor;

  beforeAll(async () => {
    jest.useFakeTimers();
    module = await Test.createTestingModule({
      providers: [
        DelayingInterceptor,
        { provide: 'DELAY_TIME', useValue: 2000 },
      ],
    }).compile();
    delayingInterceptor = module.get<DelayingInterceptor>(DelayingInterceptor);
  });

  it(
    'should have a delay of 2 seconds',
    fakeSchedulers((tick) => {
      const call$ = of(true);
      let result = false;

      delayingInterceptor
        .intercept(undefined, { handle: () => call$ })
        .subscribe((val: boolean) => (result = val));
      expect(result).toEqual(false);
      tick(1999);
      expect(result).toEqual(false);
      tick(0);
      expect(result).toEqual(false);
      tick(1);
      expect(result).toEqual(true);
    })
  );
});
