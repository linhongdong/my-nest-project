import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ResultInterface } from '../interfaces/result.interface';
import { Config } from '../../config';
import { constants } from 'zlib';
import { Constants } from '../constants';
import { Utils } from '../utils';

// @Catch(HttpException)
@Catch()
export class HTTPExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        // console.log('http全局过滤器 HTTPExceptionFilter===>>>');
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        // const req = ctx.getRequest();
        if (exception && exception.getStatus) {
            const status = exception.getStatus();
            const error = exception.getResponse();
            const timestamp = new Date().toLocaleString();
            res.header('Date', timestamp);
            // res.json(error);
            console.log('http全局过滤器 HTTPExceptionFilter===>>>', error);
            // const message: string = 401 === status ? '权限验证失败，请请重新登录' : null;
            // const message: string =
            //     exception.message && exception.message.message
            //         ? exception.message.message
            //         : Utils.exceptionFilterChooseCode(status);
            const message: string = Utils.exceptionFilterChooseCode(status);
            // const result: ResultInterface<null> = Object.assign(
            //     {
            //         timestamp,
            //         code: status,
            //         message,
            //         error: null,
            //         data: null,
            //     },
            //     error,
            // );
            const result: ResultInterface<null> = {
                code: status,
                data: null,
                timestamp,
                message,
                error,
            };
            res.status(status).json(result);
        }
    }
}
