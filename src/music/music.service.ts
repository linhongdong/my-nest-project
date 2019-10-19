import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from '../common/entities/music.entity';
import { Repository, Like } from 'typeorm';
import { QueryMusicListInfoDto } from './dto/queryMusicListInfo.dto';
import { ProcessResult } from '../common/processResult.interface';

@Injectable()
export class MusicService {
    constructor(@InjectRepository(MusicEntity) private readonly musicRepository: Repository<MusicEntity>) {}
    /**
     *  创建一首歌曲
     * @param music 歌曲信息
     */
    async createMusic(music: MusicEntity) {
        try {
            return await this.musicRepository.save(music);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    /**
     *  查询歌曲
     * @param music 歌曲名称
     */
    async musicList(queryMusicListInfo: QueryMusicListInfoDto) {
        try {
            const { musicName, singer } = queryMusicListInfo;
            let where = {};
            if (musicName) {
                where = { musicName };
            }
            if (singer) {
                where = { singer };
            }
            if (musicName && singer) {
                where = { musicName, singer };
            }
            return await this.musicRepository.find({ where });
            // 只返回 'musicName', 'singer' 字段
            // return await this.musicRepository.find({ where, select: ['musicName', 'singer'] });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    /**
     *  模糊查询歌曲
     * @param music 要查询的歌曲条件信息
     */
    async fuzzyQueryMusicList(queryMusicListInfo: QueryMusicListInfoDto) {
        try {
            const { musicName, singer } = queryMusicListInfo;
            let like = {};
            if (musicName) {
                like = { musicName: Like(`%${musicName}%`) };
            }
            if (singer) {
                like = { musicName: Like(`%${musicName}%`), singer: Like(`%${singer}%`) };
            }
            // 模糊查询
            return await this.musicRepository.find(like);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    /**
     *  更新歌曲
     * @param music 根据传入歌曲 id 更新歌曲信息
     */
    async updateMusic(music: MusicEntity) {
        const { id } = music;
        try {
            const result = await this.musicRepository.update({ id }, { ...music });
            if (result && result.raw && result.raw.affectedRows > 0) {
                return new ProcessResult('更新成功');
            } else {
                console.log('失败==>', result);
                return new ProcessResult('更新失败', false);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    /**
     *  更新歌曲
     * @param music 根据传入歌曲 id 更新歌曲信息
     */
    async deleteMusic(id: number) {
        try {
            const result = await this.musicRepository.delete(id);
            if (result && result.raw && result.raw.affectedRows > 0) {
                return new ProcessResult('删除成功');
            } else {
                console.log('失败==>', result);
                return new ProcessResult('删除失败', false);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
