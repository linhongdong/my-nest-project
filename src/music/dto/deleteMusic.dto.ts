import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteMusicDto {
    @ApiModelProperty({
        description: '歌曲 id',
        example: 0,
    })
    readonly musicId: number;
}
