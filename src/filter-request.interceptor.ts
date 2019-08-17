import { CallHandler, ExecutionContext, Injectable, NestInterceptor, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FilterRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.params.name.toLowerCase() === 'duck') {
      // throw new ForbiddenException();
      request.params.name = 'bird';
      return next.handle();
    } else {
      return next.handle();
    }
  }
}
