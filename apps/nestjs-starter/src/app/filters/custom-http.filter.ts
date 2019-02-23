import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomHttpFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const status = exception.getStatus();
    http.getResponse().status(status).json({ message: 'Custom message!' });
  }
}
