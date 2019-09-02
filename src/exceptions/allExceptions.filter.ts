import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        super.catch(exception, host);
        console.log('全基础过滤器 AllExceptionsFilter===>>>');
        // console.log('exception===>>>', exception.response);
    }
}
