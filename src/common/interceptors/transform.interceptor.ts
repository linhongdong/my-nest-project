import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../constants';

export interface Response<T> {
    data: T;
    code: number;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<any>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const reqt = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        // res.status();
        const time = new Date().toLocaleString();
        res.header('Date', time);
        // res.set('Date', time); // 用 set 也行
        // console.log('next===>>>', res.headers('Cache-Control', 'none'));
        // return next.handle();
        return next.handle().pipe(
            map(data => {
                // console.log('statusCode===>>>', res.statusCode);
                // console.log('data===>>>', data);
                // return { code: 200, message: 'success', data };
                // res.status(HttpStatus.NO_CONTENT);
                // return { code: HttpStatus.NO_CONTENT, message: '没有查询到数据', data: null };
                if (!!data) {
                    return this.normalContent(data, time);
                } else {
                    return this.noContent(time);
                }
            }),
        );
        // console.log('TransformInterceptor===>>>');
        // return next.handle().pipe(map(data => ({ data })));
    }
    /**
     * 查询不到数据，返回值为空的情况
     */
    private noContent(time: string) {
        // return { code: HttpStatus.NO_CONTENT, message: '没有查询到数据', data: null };
        return {
            timestamp: time,
            code: HttpStatus.NO_CONTENT,
            message: Constants.NO_DATA_FOUND,
            data: null,
        };
    }
    /**
     * 正常返回数据
     * @param data 要返回的数据
     */
    private normalContent(data: any, time: string) {
        return {
            timestamp: time,
            code: HttpStatus.OK,
            message: Constants.REQUEST_SUCCESS,
            data,
        };
    }
}
