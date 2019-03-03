import { Global, HttpModule, Module } from '@nestjs/common';

@Global()
@Module({
  modules: [HttpModule],
  exports: [HttpModule]
})
export class CoreModule {}
