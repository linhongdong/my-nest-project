import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroEntity } from '../common/entities/hero.entity';
import { FactionEntity } from '../common/entities/faction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([HeroEntity, FactionEntity])],
    controllers: [HeroController],
    providers: [HeroService],
    exports: [HeroService],
})
export class HeroModule {}
