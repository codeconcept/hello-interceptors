import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EnrichResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const timeZoneOffset = `${now.getTimezoneOffset() / 60} hours`;
    const result = { headers: null, dateLogged: now.toISOString(), timeZoneOffset };
    result.headers = context
      .getArgs()
      .values()
      .next().value.headers;
    return next
      .handle()
      .pipe(map(valueFromRouteHandler => {
        if (typeof valueFromRouteHandler === 'string') {
          // return (valueFromRouteHandler as string).toLocaleUpperCase();
          return { intialContent: valueFromRouteHandler, length: valueFromRouteHandler.length, result };
        } else {
          return valueFromRouteHandler;
        }
      }));
  }
}
