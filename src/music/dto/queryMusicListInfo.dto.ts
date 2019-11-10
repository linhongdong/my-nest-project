import { ApiModelProperty } from '@nestjs/swagger';

export class QueryMusicListInfoDto {
    @ApiModelProperty({
        description: '歌曲名称',
        example: '余情未了',
    })
    readonly musicName: string;

    @ApiModelProperty({
        description: '歌手',
        example: '',
        required: true,
    })
    readonly singer: string;
}
