import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity('music')
export class MusicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({
        description: '歌曲名称',
        example: '余情未了',
    })
    @Column({
        comment: '歌曲名称',
    })
    musicName: string;

    @ApiModelProperty({
        description: '演唱者（歌手）',
        example: '魏新雨',
    })
    @Column({
        comment: '演唱者（歌手）',
    })
    singer: string;

    @ApiModelProperty({
        description: '音频地址',
        example: 'https://sr-sycdn.kuwo.cn/364c604d4093f10fe67c0cb67950c9fc/5da9643f/resource/n1/97/0/1588687529.mp3',
    })
    @Column({
        comment: '音频地址',
    })
    address: string;

    @ApiModelProperty({
        description: '歌词',
        example: `余情未了 - 魏新雨
        词：可泽
        曲：可泽
        编曲：李凯稠
        和音：樊桐舟
        笛子：王华
        古筝：丁雪儿
        录音：徐新博
        缩混：周晓明
        制作人：李凯稠
        发行：北京恒青文化传媒
        出品：北京恒青文化传媒
        静月楼台空烦恼
        何处梦醉寄逍遥
        瑶琴缥缈纷纷扰
        惊扰故人的好觉
        叹人生路兜兜转转
        与你余情未了
        谁的笑飞过了天涯海角挂眉梢
        菩提下为浮生高歌一曲多寂寥
        月夜灯火阑珊 浊酒一壶
        醉倒在墙角
        再回眸盼来世相邀
        梦回当时年少
        怕旧时声音会肆意吵闹太喧嚣
        你离开的步调不轻不重刚刚好
        缓缓在我心头 筑起一座
        半世的监牢
        静月楼台空烦恼
        何处梦醉寄逍遥
        瑶琴缥缈纷纷扰
        惊扰故人的好觉
        叹人生路兜兜转转
        与你余情未了
        谁的笑飞过了天涯海角挂眉梢
        菩提下为浮生高歌一曲多寂寥
        月夜灯火阑珊 浊酒一壶
        醉倒在墙角
        再回眸盼来世相邀
        梦回当时年少
        怕旧时声音会肆意吵闹太喧嚣
        你离开的步调不轻不重刚刚好
        缓缓在我心头 筑起一座
        半世的监牢
        叹人生路兜兜转转
        与你余情未了
        谁的笑飞过了天涯海角挂眉梢
        菩提下为浮生高歌一曲多寂寥
        月夜灯火阑珊 浊酒一壶
        醉倒在墙角
        再回眸盼来世相邀
        梦回当时年少
        怕旧时声音会肆意吵闹太喧嚣
        你离开的步调不轻不重刚刚好
        缓缓在我心头 筑起一座
        半世的监牢`,
    })
    @Column({
        comment: '歌词',
        nullable: true,
    })
    lyrics: string;

    @ApiModelProperty({
        description: '所属专辑',
        example: '余情未了',
    })
    @Column({
        comment: '所属专辑',
        nullable: true,
    })
    album: string;

    @ApiModelProperty({
        description: '发行年份',
        example: '2019-05-21',
    })
    @Column({
        comment: '发行年份',
        nullable: true,
    })
    releaseYear: string;

    @ApiModelProperty({
        description: '格式',
        example: 'mp3',
    })
    @Column({
        comment: '格式',
        nullable: true,
    })
    format: string;

    @ApiModelProperty({
        description: '时长',
        example: '3:26',
    })
    @Column({
        comment: '时长',
        nullable: true,
    })
    duration: string;

    @ApiModelProperty({
        description: '音频大小',
        example: '3.5BM',
    })
    @Column({
        comment: '音频大小',
        nullable: true,
    })
    size: string;

    @ApiModelProperty({
        description: '歌词作者',
        example: '可泽',
    })
    @Column({
        comment: '歌词作者',
        nullable: true,
    })
    lyricsAuthor: string;

    @ApiModelProperty({
        description: '曲子作者',
        example: '可泽',
    })
    @Column({
        comment: '曲子作者',
        nullable: true,
    })
    songAuthor: string;

    @ApiModelProperty({
        description: '头像',
        // https://p3fx.kgimg.com/stdmusic/20190515/20190515103504661233.jpg
        example: 'http://img2.kuwo.cn/star/albumcover/300/26/35/1877109495.jpg',
    })
    @Column({
        comment: '头像',
        nullable: true,
    })
    avatar: string;

    @ApiModelProperty({
        description: '背景图片',
        example: 'https://fc3tn.baidu.com/it/u=3097867424,489422948&fm=202&src=bqdata',
    })
    @Column({
        comment: '背景图片',
        nullable: true,
    })
    backgroundPicture: string;

    @ApiModelProperty({
        description: '是否拥有版权',
        example: true,
    })
    @Column({
        comment: '是否拥有版权',
        nullable: true,
    })
    copyright: boolean;
}
