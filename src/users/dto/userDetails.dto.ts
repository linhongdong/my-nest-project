import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UserDetailsDto {
    @ApiModelProperty({
        description: '用户 ID',
        example: 0,
    })
    @IsInt()
    readonly userId: number;
    @ApiModelProperty({
        description: '用户名称',
        example: '嘉文四世',
    })
    @IsString()
    readonly userName: number;
    @ApiModelProperty({
        description: '用户角色名称',
        example: '德玛西亚',
        required: false,
    })

    @IsString()
    readonly roleName: string;
    @ApiModelProperty({
        description: '用户角色编码',
        example: 'DMXY',
        enum: ['DMXY', 'AONY', 'AYD', 'FLEZD'],
    })
    @IsString()
    readonly roleCode: string;
}
