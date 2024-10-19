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
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, headers } = request;

    this.logger.log(
      `Incoming request: ${method} ${url} - Body: ${JSON.stringify(body)} - Headers: ${JSON.stringify(headers)}`,
    );
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`Completed request: ${method} ${url}`)));
  }
}
