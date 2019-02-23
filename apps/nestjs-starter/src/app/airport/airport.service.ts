import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AirportService implements OnModuleInit {
  constructor(private readonly logger: Logger) {}

  async onModuleInit(): Promise<void> {}
}
