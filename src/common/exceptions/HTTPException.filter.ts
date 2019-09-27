import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

// @Catch(HttpException)
@Catch()
export class HTTPExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const status = exception.getStatus();
        console.log('全局过滤器 HTTPExceptionFilter===>>>', status);
        res
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: req.url,
            });
    }
}
