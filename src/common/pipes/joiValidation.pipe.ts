import * as Joi from '@hapi/joi';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: object) {
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = Joi.validate(value, this.schema);
        console.log('===>>>', error);
        if (error) {
            throw new BadRequestException('验证失败');
        }
        return value;
    }
}
