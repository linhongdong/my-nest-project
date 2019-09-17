import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({
        description: '用户名',
        example: 'lhd',
    })
    readonly username: string;

    @ApiModelProperty({
        description: '登录密码',
        example: '123',
    })
    readonly password: string;

    @ApiModelProperty({
        description: '邮箱',
        example: '123456@qq.com',
        required: false,
    })
    readonly email: string;

    @ApiModelProperty({
        description: '电话',
        example: '12312341234',
        required: false,
    })
    readonly phone: string;

    @ApiModelProperty({
        description: '昵称',
        example: '天马行空',
        required: false,
    })
    readonly nickname: string;

    // @ApiModelProperty({
    //     description: '用户角色名称',
    //     example: '德玛西亚',
    // })
    // readonly roleName: string;
    // @ApiModelProperty({
    //     description: '用户角色名称',
    //     example: 'DMXY',
    //     enum: ['DMXY', 'AONY', 'AYD', 'FLEZD'],
    // })
    // readonly roleCode: string;
}
