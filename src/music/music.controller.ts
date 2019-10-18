import { Body, UseGuards, Controller, Post } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MusicService } from './music.service';
import { MusicEntity } from '../common/entities/music.entity';

@ApiUseTags('音乐')
@ApiBearerAuth()
// @UseGuards(AuthGuard('myJwt'))
@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) {}

    @ApiOperation({
        title: '创建一首歌曲',
        description: '传入歌曲信息创建一首歌曲',
        operationId: '创建一首歌曲',
    })
    @Post('createMusic')
    async createMusic(@Body() music: MusicEntity) {
        // console.log('login===>>>', req.user);
        return music;
        // return this.musicService.createMusic(music);
    }
}
