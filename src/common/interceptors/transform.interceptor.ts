import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../constants';
import { ResultInterface } from '../interfaces/result.interface';

// export interface Response<T> {
//     data: T;
//     statuscCode: number;
// }

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResultInterface<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResultInterface<T>> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        // console.log('req.body===>>>', req.body);
        // console.log('req.param===>>>', req.param('userId'));
        // console.log('req.query===>>>', req.query);
        // console.log('req.method===>>>', req.method);
        // res.status();
        // const time = new Date().toLocaleString();
        // res.header('Date', time);
        // res.set('Date', time); // 用 set 也行
        // console.log('next===>>>', res.headers('Cache-Control', 'none'));
        // return next.handle();
        return next.handle().pipe(
            map(data => {
                // console.log('TransformInterceptor===>>>', data);
                const time = new Date().toLocaleString();
                res.header('Date', time);
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
        const result: ResultInterface<null> = {
            timestamp: time,
            code: HttpStatus.NO_CONTENT,
            message: Constants.NO_DATA_FOUND,
            data: null,
        };
        return result;
    }
    /**
     * 正常返回数据
     * @param data 要返回的数据
     */
    private normalContent(data: T, time: string) {
        const result: ResultInterface<T> = {
            timestamp: time,
            code: HttpStatus.OK,
            message: Constants.REQUEST_SUCCESS,
            data,
        };
        return result;
    }
}
