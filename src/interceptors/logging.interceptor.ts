import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<import('rxjs').Observable<any>> {
        console.log('before.......LoggingInterceptor');
        const now = Date.now();
        return next.handle().pipe(tap(() => console.log(`after...${Date.now() - now}ms`)));
    }
}
