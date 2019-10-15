import { ApiModelProperty } from '@nestjs/swagger';

export interface JwtPayloadDto {
    // 用户 Id
    readonly userId: string;
    // 用户名
    readonly userName: string;
    // 用户邮箱
    readonly userEmail: string;
}
