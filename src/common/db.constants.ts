import { HeroEntity } from './entities/hero.entity';
import { UserEntity } from './entities/user.entity';
import { FactionEntity } from './entities/faction.entity';
import { TeamEntity } from './entities/team.entity';
import { MusicEntity } from './entities/music.entity';
/**
 * 不可直接实例使用，只能通过 Constants 中实例使用
 */
export class DbConstants {
    readonly entities: any[] = [UserEntity, HeroEntity, FactionEntity, TeamEntity, MusicEntity];
    // db 数据库链接注入常量
    readonly DATABASE_CONNECTION: string = 'DATABASE_CONNECTION';
    // 用户表 UserEntity
    readonly USER: string = 'USER_REPOSITORY';
    // 英雄列表 HeroEntity
    readonly HERO: string = 'HERO_REPOSITORY';
}
