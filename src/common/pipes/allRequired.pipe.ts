import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
import { Utils } from '../utils';
import { EmptyException } from '../exceptions/empty.exception';
import { Constants } from '../constants/constants';
/**
 * 校验全部字段必填
 */
@Injectable()
export class AllRequiredPipe implements PipeTransform<string, number> {
    transform(data: any, metadata: ArgumentMetadata): number {
        // console.log('metadata ===>>>', metadata);
        if (Object.keys(data).length > 0) {
            const key = Utils.isEachFieldValueIsEmpty(data);
            if (key) {
                throw new EmptyException(`${key} ${Constants.FIELD_CANNOT_EMPTY}`);
            } else {
                return data;
            }
        } else {
            throw new EmptyException(Constants.FIELD_CANNOT_EMPTY);
        }
    }
}
