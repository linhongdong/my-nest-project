import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiModelProperty({
        description: '登录用户 ID',
        example: '3',
    })
    readonly userId: string;

    @ApiModelProperty({
        description: '登录用户密码',
        example: 'guess',
        required: true,
    })
    readonly password: string;

    @ApiModelProperty({
        description: '登录用户名',
        example: 'maria',
        required: true,
    })
    // 不能使用 userName 驼峰命名，会报错，报 401，错误信息如下
    readonly username: string;

    //  全基础过滤器 AllExceptionsFilter===>>> { Error: [object Object]
    //     at MixinAuthGuard.handleRequest (/Users/dhc/demo/nodejs/my-nest-project/node_modules/@nestjs/passport/dist/auth.guard.js:63:30)
    //     at passportFn (/Users/dhc/demo/nodejs/my-nest-project/node_modules/@nestjs/passport/dist/auth.guard.js:47:120)
    //     at passport.authenticate (/Users/dhc/demo/nodejs/my-nest-project/node_modules/@nestjs/passport/dist/auth.guard.js:78:24)
    //     at allFailed (/Users/dhc/demo/nodejs/my-nest-project/node_modules/passport/lib/middleware/authenticate.js:107:18)
    //     at attempt (/Users/dhc/demo/nodejs/my-nest-project/node_modules/passport/lib/middleware/authenticate.js:180:28)
    //     at LocalStrategy.strategy.fail (/Users/dhc/demo/nodejs/my-nest-project/node_modules/passport/lib/middleware/authenticate.js:297:9)
    //     at LocalStrategy.Strategy.authenticate (/Users/dhc/demo/nodejs/my-nest-project/node_modules/passport-local/lib/strategy.js:75:17)
    //     at attempt (/Users/dhc/demo/nodejs/my-nest-project/node_modules/passport/lib/middleware/authenticate.js:361:16)
    //     at authenticate (/Users/dhc/demo/nodejs/my-nest-project/node_modules/passport/lib/middleware/authenticate.js:362:7)
    //     at Promise (/Users/dhc/demo/nodejs/my-nest-project/node_modules/@nestjs/passport/dist/auth.guard.js:83:3)
    //   response: { statusCode: 401, error: 'Unauthorized' },
    //   status: 401,
    //   message: { statusCode: 401, error: 'Unauthorized' } }
}
