import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '用户名',
    })
    username: string;

    @Column({
        comment: '登录密码',
    })
    password: string;

    @Column({
        comment: '邮箱',
        nullable: true,
    })
    email: string;

    @Column({
        comment: '电话',
        nullable: true,
    })
    phone: string;

    @Column({
        comment: '昵称',
        nullable: true,
    })
    nickname: string;
}
