import { Injectable } from '@nestjs/common';
import { HeroEntity } from '../db/entities/hero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HerorDto } from './dto/hero.dto';
import { FactionEntity } from '../db/entities/faction.entity';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(HeroEntity) private readonly heroRepository: Repository<HeroEntity>,
        @InjectRepository(FactionEntity) private readonly factionRepository: Repository<FactionEntity>
    ) {}

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

    // async allFaction() {
    //     return await this.factionRepository.find({ where: { factionCode: 'ZY_DMXY' } });
    // }
}
