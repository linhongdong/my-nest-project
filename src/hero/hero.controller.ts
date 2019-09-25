import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Post, Body, Get, Request } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HerorDto } from './dto/hero.dto';
import { HeroEntity } from '../db/entities/hero.entity';
import { FactionEntity } from '../db/entities/faction.entity';

@ApiUseTags('英雄')
// @ApiBearerAuth()
@Controller('hero')
export class HeroController {
    constructor(private readonly heroService: HeroService) {}

    @Post('createHero')
    async login(@Body() hero: HerorDto) {
        // console.log('login===>>>', req.user);
        return this.heroService.createHero(hero);
    }

    @Get('allFaction')
    async allFaction() {
        // return this.heroService.allFaction();
        return;
    }
}
