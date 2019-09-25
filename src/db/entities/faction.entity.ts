import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { type } from 'os';
import { HeroEntity } from './hero.entity';

@Entity('faction')
export class FactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({
        comment: '阵营编码',
    })
    factionCode: string;

    @Column({
        comment: '阵营名称',
    })
    factionName: string;

    @Column({
        comment: '阵营简介',
    })
    introduction: string;

    @Column({
        comment: '其他',
    })
    other: string;

    // @Column({
    //     comment: '阵营所属英雄（多个）',
    // })
    // ownHero: number[];
    @OneToMany(type => HeroEntity, hero => hero.faction)
    hero: HeroEntity[];
}
