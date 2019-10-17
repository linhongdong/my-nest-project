import { CustomParamFactory } from '@nestjs/common/interfaces';
import { EmptyException } from '../exceptions/empty.exception';
import { Utils } from '../utils';
import { Constants } from '../constants';
import { createParamDecorator } from '@nestjs/common';

export const Required = createParamDecorator((data, req) => {
    const params = req.body;
    if (Object.keys(params).length > 0) {
        const key = Utils.isFieldCannotEmpty(params, data);
        if (key) {
            throw new EmptyException(`${key} ${Constants.FIELD_CANNOT_EMPTY}`);
        } else {
            return req.body;
        }
    } else {
        throw new EmptyException(Constants.FIELD_CANNOT_EMPTY);
    }
});
