import { HeroEntity } from '../entities/hero.entity';
import { UserEntity } from '../entities/user.entity';
import { FactionEntity } from '../entities/faction.entity';
import { TeamEntity } from '../entities/team.entity';

export class DbConstants {
    readonly entities: any[] = [UserEntity, HeroEntity, FactionEntity, TeamEntity];
    // db 数据库链接注入常量
    readonly DATABASE_CONNECTION: string = 'DATABASE_CONNECTION';
    // 用户表 UserEntity
    readonly USER: string = 'USER_REPOSITORY';
    // 英雄列表 HeroEntity
    readonly HERO: string = 'HERO_REPOSITORY';
}
