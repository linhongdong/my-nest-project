import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { FactionEntity } from './faction.entity';
import { ApiModelProperty } from '@nestjs/swagger';

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
    // ownFaction: FactionßEntity;

    @ApiModelProperty({
        description: '对应的阵营 Id',
        example: 1,
    })
    @Column({
        comment: '对应的阵营 Id',
    })
    factionId: number;

    @ApiModelProperty({
        description: '对应的阵营 code',
        example: 'ZY_DMXY',
    })
    @Column({
        comment: '对应的阵营 code',
    })
    factionFactionCode: string;

    // 对应阵营表的 id
    @ManyToOne(type => FactionEntity, faction => faction.hero)
    faction: FactionEntity;
}
