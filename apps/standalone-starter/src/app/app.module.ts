import { Module } from '@nestjs/common';
import { LogCommand } from './log.command';

@Module({
  imports: [],
  controllers: [],
  providers: [LogCommand],
})
export class AppModule {}
