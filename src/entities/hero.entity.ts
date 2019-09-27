import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { FactionEntity } from './faction.entity';

@Entity('hero')
export class HeroEntity {
    @PrimaryGeneratedColumn({ name: '英雄 id' })
    id: number;

    @PrimaryColumn({
        comment: '英雄编码',
    })
    heronCode: string;

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

    // @Column({
    //     comment: '所属阵营',
    // })
    // ownFaction: string;
    // @OneToOne(type => FactionEntity)
    // @JoinColumn()
    // ownFaction: FactionEntity;

    // 对应阵营表的 id
    @ManyToOne(type => FactionEntity, faction => faction.hero)
    faction: FactionEntity;
}
