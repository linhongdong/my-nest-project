import { Injectable } from '@nestjs/common';
import { HeroEntity } from '../common/entities/hero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HerorDto } from './dto/hero.dto';
import { FactionEntity } from '../common/entities/faction.entity';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(HeroEntity) private readonly heroRepository: Repository<HeroEntity>,
        @InjectRepository(FactionEntity) private readonly factionRepository: Repository<FactionEntity>,
    ) {}

    /**
     * 创建英雄
     * @param hero 英雄信息
     */
    async createHero(hero: HerorDto) {
        // const faction = await this.allFaction();
        console.log('hero===>>>', hero);
        // console.log('faction===>>>', faction);

        // const newFaction = this.factionRepository.create({
        //     id: faction[0].id,
        //     factionCode: faction[0].factionCode,
        // });
        // console.log('newFaction===>>>', newFaction);
        hero.faction = {
            id: 1,
            factionCode: 'ZY_DMXY',
        };
        const newhero = this.heroRepository.create(hero);
        console.log('newhero===>>>', newhero);
        // newhero.faction = newFaction;

        await this.heroRepository.save(newhero);
        return newhero;
    }

    /**
     * 获取全部阵营
     */
    async allFaction() {
        // return await this.factionRepository.find({ where: { factionCode: 'ZY_DMXY' } });
        return await this.factionRepository.find();
    }

    /**
     * 获取全部英雄
     */
    async allHero() {
        // return await this.factionRepository.find({ where: { factionCode: 'ZY_DMXY' } });
        return await this.heroRepository.find();
    }

    /**
     * 获取全部英雄
     */
    async allHeroError() {
        // return await this.factionRepository.find({ where: { factionCode: 'ZY_DMXY' } });
        // return await this.heroRepository.find();
        return;
    }
    /**
     * 获取单个阵营信息
     */
    async singleFaction(factionCode: string) {
        return await this.factionRepository.find({ where: { factionCode } });
        // return await this.heroRepository.find();
    }
}
