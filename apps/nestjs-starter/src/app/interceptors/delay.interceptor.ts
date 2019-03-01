import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    return call$.pipe(
      delay(2000)
    );
  }
}
