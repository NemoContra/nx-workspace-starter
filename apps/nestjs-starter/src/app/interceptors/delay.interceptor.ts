import { ExecutionContext, Inject, Injectable, NestInterceptor, Optional } from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  constructor(@Optional() @Inject('DELAY_TIME') private delayTime = 0) {
  }

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    return call$.pipe(
      delay(this.delayTime)
    );
  }
}
