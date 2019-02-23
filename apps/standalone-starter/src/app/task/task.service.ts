import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { delay, firstValueFrom, of } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(private readonly logger: Logger) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async processTask(): Promise<void> {
    this.logger.log('Processing heavy task...');

    await firstValueFrom(of(undefined).pipe(delay(5000)));

    this.logger.log('Finished processing heavy task.');
  }
}
