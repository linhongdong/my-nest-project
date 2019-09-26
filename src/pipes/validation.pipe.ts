import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
    Injectable,
    PayloadTooLargeException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class ValidationPipe implements PipeTransform {
    /* async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        console.log('metatype===>>>', metatype);
        // console.log('errors===>>>', errors);
        if (errors.length > 0) {
            // throw new BadRequestException('ValidationPipe===>>>校验失败');
            throw new BadRequestException(errors[0].constraints.isInt);
        }
        return value;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    } */

    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value===>>>', value);
        console.log('metadata===>>>', metadata);
        if (metadata.type === 'query') {
            try {
                return JSON.parse(value);
            } catch (error) {
                throw new BadRequestException();
            }
        } else {
            throw new PayloadTooLargeException();
        }
    }
}
