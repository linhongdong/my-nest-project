import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({
        description: '用户名',
        example: 'lhd',
    })
    @Column({
        comment: '用户名',
    })
    userName: string;

    @ApiModelProperty({
        description: '登录密码',
        example: '123qwe',
    })
    @Column({
        comment: '登录密码',
    })
    password: string;

    @ApiModelProperty({
        description: '邮箱',
        example: '123@qq.com',
    })
    @Column({
        comment: '邮箱',
        nullable: true,
    })
    userEmail: string;

    @ApiModelProperty({
        description: '手机号',
        example: '12312341234',
    })
    @Column({
        comment: ' 手机号',
        nullable: true,
    })
    userPhone: string;

    @ApiModelProperty({
        description: '座右铭',
        example: '修炼无止境',
    })
    @Column({
        comment: '座右铭',
        nullable: true,
    })
    userMotto: string;
}
