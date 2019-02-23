import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    this.logger.log(
      `Request-URL: ${context.switchToHttp().getRequest<Request>().url}`
    );
    return next
      .handle()
      .pipe(
        tap((response) =>
          this.logger.log(`Response: ${JSON.stringify(response)}`)
        )
      );
  }
}
