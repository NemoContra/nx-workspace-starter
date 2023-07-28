import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memoryHealth: MemoryHealthIndicator,
    private diskHealth: DiskHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memoryHealth.checkHeap('test', 100 * 1024 * 1024),
      () => this.memoryHealth.checkRSS('test', 100 * 1024 * 1024),
    ]);
  }
}
