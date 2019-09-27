import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Controller, UseGuards, Post, Body, Get, Request, Header } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HerorDto } from './dto/hero.dto';
import { HeroEntity } from '../common/entities/hero.entity';
import { FactionEntity } from '../common/entities/faction.entity';

@ApiUseTags('英雄')
// @ApiBearerAuth()
@Controller('hero')
export class HeroController {
    constructor(private readonly heroService: HeroService) {}

    @ApiOperation({
        title: '创建一个英雄',
        description: '传入英雄信息创建一个英雄',
        operationId: '不知道干嘛的操作编号？',
        deprecated: false, // 是否弃用，默认 false
    })
    @Post('createHero')
    async login(@Body() hero: HerorDto) {
        // console.log('login===>>>', req.user);
        return this.heroService.createHero(hero);
    }

    @ApiOperation({
        title: '获取全部阵营',
        description: '获取全部阵营信息',
    })
    @Get('allFaction')
    async allFaction() {
        return this.heroService.allFaction();
    }

    @Header('Date', '1009')
    @Header('Cache-Control', 'none')
    @ApiOperation({
        title: '获取全部英雄',
        description: '获取全部英雄信息',
    })
    @Get('allHero')
    async allHero() {
        return this.heroService.allHero();
    }
}
