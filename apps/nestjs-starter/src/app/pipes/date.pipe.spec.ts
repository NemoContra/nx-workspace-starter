import { Test, TestingModule } from '@nestjs/testing';
import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  let datePipe: DatePipe;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatePipe]
    }).compile();
    datePipe = module.get<DatePipe>(DatePipe);
  });

  it('should return a correct "Date object depending on input value', async () => {
    expect(datePipe.transform('2018-01-02')).toEqual(new Date('2018-01-02'));
    expect(isNaN(datePipe.transform('2018-01-02').getDate())).toEqual(false);
    expect(datePipe.transform('2019-03-01T00:07:54.1624336')).toEqual(new Date('2019-03-01T00:07:54.1624336'));
    expect(isNaN(datePipe.transform('Test').getDate())).toEqual(true);
    expect(datePipe.transform('')).toEqual(undefined);
    expect(datePipe.transform(undefined)).toEqual(undefined);
    expect(datePipe.transform(null)).toEqual(undefined);
  });
});
