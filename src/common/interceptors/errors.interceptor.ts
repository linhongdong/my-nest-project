import { Injectable, NestInterceptor, ExecutionContext, BadGatewayException, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('ErrorsInterceptor ===>>>');
        const sth = context.switchToHttp();
        const res = sth.getResponse();
        const req = sth.getRequest();
        console.log('ErrorsInterceptor > req.body===>>>', req.body);
        // console.log('ErrorsInterceptor===>>>', res);

        // return next.handle().pipe(catchError(err => throwError(new BadGatewayException('我是 502'))));
        return next.handle();
    }
}
