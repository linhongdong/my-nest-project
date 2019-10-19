import { Body, UseGuards, Controller, Post } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MusicService } from './music.service';
import { MusicEntity } from '../common/entities/music.entity';
import { Required } from '../common/decorators/required.decorator';
import { QueryMusicListInfoDto } from './dto/queryMusicListInfo.dto';
import { DeleteMusicDto } from './dto/deleteMusic.dto';
import { AllRequiredPipe } from '../common/pipes/allRequired.pipe';

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
    async createMusic(@Body() @Required(['musicName', 'singer', 'address']) music: MusicEntity) {
        return this.musicService.createMusic(music);
    }

    @ApiOperation({
        title: '获取歌曲',
        description: '根据传入歌曲名称获取该歌曲信息，为空时获取全部',
        operationId: '获取歌曲',
    })
    @Post('musicList')
    async musicList(@Body() queryMusicListInfo: QueryMusicListInfoDto) {
        return this.musicService.musicList(queryMusicListInfo);
        // 模糊查询
        // return this.musicService.fuzzyQueryMusicList(queryMusicListInfo);
    }

    @ApiOperation({
        title: '更新歌曲',
        description: '根据传入歌曲 id 更新歌曲信息',
        operationId: '更新歌曲',
    })
    @Post('updateMusic')
    async updateMusic(@Body() music: MusicEntity) {
        return this.musicService.updateMusic(music);
        // 模糊查询
        // return this.musicService.fuzzyQueryMusicList(queryMusicListInfo);
    }

    @ApiOperation({
        title: '删除歌曲',
        description: '根据传入歌曲 id 删除歌曲',
        operationId: '删除歌曲',
    })
    @Post('deleteMusic')
    async deleteMusic(@Body(new AllRequiredPipe()) music: DeleteMusicDto) {
        return this.musicService.deleteMusic(music.musicId);
    }
}
