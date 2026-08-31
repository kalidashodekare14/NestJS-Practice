import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    console.log("Before Controller");

    const now = Date.now()


    return next.handle().pipe(
      // map((data) =>({
      //   success: true,
      //   data
      // }))
      tap(() =>{
        console.log(`After Controller: ${Date.now() - now}ms`)
      })
    );
  }
}
