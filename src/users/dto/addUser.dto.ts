import { ApiModelProperty } from '@nestjs/swagger';

export class AddUserDto {
    @ApiModelProperty({
        description: '用户 ID',
        example: 0,
    })
    readonly userId: number;
    @ApiModelProperty({
        description: '用户名称',
        example: '嘉文四世',
        required: false,
    })
    readonly userName: string;
    @ApiModelProperty({
        description: '用户角色名称',
        example: '德玛西亚',
    })
    readonly roleName: string;
    @ApiModelProperty({
        description: '用户角色名称',
        example: 'DMXY',
        enum: ['DMXY', 'AONY', 'AYD', 'FLEZD'],
    })
    readonly roleCode: string;
}
