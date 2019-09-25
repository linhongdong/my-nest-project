import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('team')
export class TeamEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '队伍名称',
    })
    teamName: string;

    @Column({
        comment: '队伍编码',
    })
    teamCode: string;

    @Column({
        comment: '队伍人数',
    })
    teampeopleNumber: number;

    @Column({
        comment: '所属阵营',
    })
    ownFaction: string;

    @Column({
        comment: '队伍中的英雄（多个）',
    })
    teamHeros: string;

    @Column({
        comment: '队长',
    })
    teamLeader: number;

    // @Column({
    //     comment: '队长名称',
    // })
    // teamLeaderName: string;
}
