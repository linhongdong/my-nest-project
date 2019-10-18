import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { MusicEntity } from '../common/entities/music.entity';

import { Repository } from 'typeorm';

@Injectable()
export class MusicService {
    constructor(@InjectRepository(MusicEntity) private readonly musicRepository: Repository<MusicEntity>) {}
    /**
     *  创建一首歌曲
     * @param music 歌曲信息
     */
    async createMusic(music: MusicEntity) {

        return await this.musicRepository.save(music);
    }
}
