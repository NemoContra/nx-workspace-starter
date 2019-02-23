import { Logger, Module } from '@nestjs/common';
import { TaskService } from './task/task.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService, Logger],
})
export class AppModule {}
