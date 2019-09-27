import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(message: any = '403') {
        super({ status: HttpStatus.FORBIDDEN, error: message }, HttpStatus.FORBIDDEN);
    }
}
