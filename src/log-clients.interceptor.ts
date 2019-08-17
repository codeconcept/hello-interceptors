import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogClientsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = { date: new Date().toISOString(), urlRequested: '', ipAddress: '', navigator: ''};
    const request = context.switchToHttp().getRequest();
    client.ipAddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    client.navigator = request.headers['user-agent'];
    client.urlRequested = `${request.method} ${request.url}`;
    // tslint:disable-next-line: no-console
    console.log('client', client);
    return next
      .handle();
  }
}
