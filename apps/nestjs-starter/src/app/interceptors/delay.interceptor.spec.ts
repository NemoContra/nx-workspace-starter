import { DelayInterceptor } from './delay.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import { fakeSchedulers } from 'rxjs-marbles/jest';
import { of } from 'rxjs';

describe('DelayInterceptor', () => {
  let module: TestingModule;
  let delayInterceptor: DelayInterceptor;

  beforeAll(async () => {
    jest.useFakeTimers();
    module = await Test.createTestingModule({
      providers: [DelayInterceptor, {provide: 'DELAY_TIME', useValue: 2000}]
    }).compile();
    delayInterceptor = module.get<DelayInterceptor>(DelayInterceptor);
  });


  it('should have a delay of 2 seconds', fakeSchedulers((tick) => {
    const call$ = of(true);
    let result = false;

    delayInterceptor.intercept(undefined, {handle: () => call$}).subscribe(val => result = val);
    expect(result).toEqual(false);
    // tick(1999);
    // expect(result).toEqual(false);
    // tick(0);
    // expect(result).toEqual(false);
    tick(2000);
    expect(result).toEqual(true);
  }));
});
