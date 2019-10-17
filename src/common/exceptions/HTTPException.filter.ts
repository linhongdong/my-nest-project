import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ResultInterface } from '../interfaces/result.interface';
import { Utils } from '../utils';
import { EmptyException } from './empty.exception';

// @Catch(HttpException)
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        console.log('http全局过滤器 HTTPExceptionFilter===>>>', exception);
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const timestamp = new Date().toLocaleString();
        // const req = ctx.getRequest();
        try {
            const status = exception.getStatus();
            const error = exception.getResponse();
            res.header('Date', timestamp);
            // res.json(error);
            // console.log('http全局过滤器 HTTPExceptionFilter===>>>', error);
            // const message: string = 401 === status ? '权限验证失败，请请重新登录' : null;
            const message: string =
                exception.message && exception.message.message
                    ? exception.message.message
                    : Utils.exceptionFilterChooseCode(status);
            // const message: string = Utils.exceptionFilterChooseCode(status);
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
        } catch (err) {
            const error = err.message || err || null;
            // 服务器内部错误
            const result: ResultInterface<null> = {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception.message.error || exception.message || null,
                data: null,
                timestamp,
                error,
            };
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
        }
    }
}
