import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    return next.handle().pipe(
      map((data) =>
        //data : 컨트롤러가 리턴한 값
        ({
          success: true,
          data,
        }),
      ),
      tap(() => console.log('After...')),
    );
  }
}
