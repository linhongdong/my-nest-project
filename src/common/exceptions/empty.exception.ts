import { HttpException, HttpStatus } from '@nestjs/common';
import { Constants } from '../constants';

export class EmptyException extends HttpException {
    constructor(message: any = Constants.NO_DATA_FOUND, error: any = null, status: number = HttpStatus.OK) {
        super({ status, error, message }, status);
        console.log('EmptyException===>>>', message);
    }
    // createBody(message: any) {
    //     console.log('createBody===>>>', message);
    //     return 'createBody 测试一下' + message;
    // }
}
