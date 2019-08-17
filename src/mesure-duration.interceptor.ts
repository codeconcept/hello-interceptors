import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MesureDurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startDate = Date.now();
    return next.handle().pipe(
      // tslint:disable-next-line: no-console
      tap(() => console.log(`duration in ms: ${Date.now() - startDate}`)),
    );
  }
}
