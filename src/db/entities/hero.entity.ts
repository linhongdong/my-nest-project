import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hero')
export class HeroEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '英雄名字',
    })
    heroname: string;

    @Column({
        comment: '性别',
    })
    sex: string;

    @Column({
        comment: '年龄',
    })
    age: number;

    @Column({
        comment: '称号',
    })
    epithet: string;

    @Column({
        comment: '昵称',
    })
    nickname: string;
}
