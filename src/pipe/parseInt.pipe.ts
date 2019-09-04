import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: any, metadata: ArgumentMetadata): number {
        const val = parseInt(value.userId, 10);
        console.log('===>>>', value.userId);
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed');
        }
        return val;
    }
}
