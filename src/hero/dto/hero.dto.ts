import { ApiModelProperty } from '@nestjs/swagger';

export class HerorDto {
    @ApiModelProperty({
        description: '英雄 ID',
        example: 0,
    })
    readonly id: number;

    @ApiModelProperty({
        description: '英雄名称',
        example: '嘉文四世',
    })
    heroname: string;

    @ApiModelProperty({
        description: '英雄编码',
        example: 'JWSS',
    })
    heronCode: string;

    @ApiModelProperty({
        description: '性别',
        example: '男',
    })
    sex: string;

    @ApiModelProperty({
        description: '年龄',
        example: 18,
    })
    age: number;

    @ApiModelProperty({
        description: '称号',
        example: '德玛西亚皇子',
    })
    epithet: string;

    @ApiModelProperty({
        description: '昵称',
        example: '皇子',
    })
    nickname: string;

    @ApiModelProperty({
        description: '所属阵营',
    })
    faction: any;

    // @ApiModelProperty({
    //     description: '阵营 id',
    //     example: 1,
    // })
    // factionId: number;

    // @ApiModelProperty({
    //     description: '阵营编码',
    //     example: 'ZY_DMXY',
    // })
    // factionFactionCode: number;
}
