import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AirportGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToRpc().getContext();
    const data = context.switchToRpc().getData();
    console.log('GUARD', JSON.parse(ctx.args[1]).cmd, data);

    return data === 'airports';
  }
}
