import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const status = response.statusCode || HttpStatus.OK;

        const responseData = {
          status,
          data,
          message: typeof data === 'string' ? data : null,
        };

        if (typeof data === 'string') {
          delete responseData['data'];
        } else {
          delete responseData['message'];
        }

        return responseData;
      }),
    );
  }
}
