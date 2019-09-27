import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        // const request = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        // console.log('next===>>>', next.handle());
        // return next.handle();
        return next.handle().pipe(
            map(data => {
                // console.log('statusCode===>>>', res.statusCode);
                // console.log('data===>>>', data);
                // return { code: 200, message: 'success', data };
                // res.status(HttpStatus.NO_CONTENT);
                // return { code: HttpStatus.NO_CONTENT, message: '没有查询到数据', data: null };
                if (!!data) {
                    return this.normalContent(data);
                } else {
                    return this.noContent();
                }
            }),
        );
        // console.log('TransformInterceptor===>>>');
        // return next.handle().pipe(map(data => ({ data })));
    }
    /**
     * 查询不到数据，返回值为空的情况
     */
    private noContent() {
        // return { code: HttpStatus.NO_CONTENT, message: '没有查询到数据', data: null };
        return {
            timestamp: new Date().getTime(),
            code: HttpStatus.NO_CONTENT,
            message: '没有查询到数据',
            data: null,
        };
    }
    /**
     * 正常返回数据
     * @param data 要返回的数据
     */
    private normalContent(data: any) {
        return { timestamp: new Date().getTime(), code: HttpStatus.OK, message: 'success', data };
    }
}
