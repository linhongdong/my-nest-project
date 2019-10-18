import { MusicEntity } from '../common/entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MusicEntity])],
    controllers: [MusicController],
    providers: [MusicService],
    exports: [],
})
export class MusicModule {}
