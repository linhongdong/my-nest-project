import { Request, Post, Controller, UseGuards, Body, Get, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiUseTags('认证')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(AuthGuard('local'))
    @ApiOperation({
        title: '登录',
        description: '登录',
        operationId: '地址栏显示的信息',
        deprecated: false, // 是否弃用，默认 false
    })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        // console.log('login===>>>', req.user);
        // return req.user;
        // return this.authService.validateUser(loginDto.username, loginDto.password);
        // return this.authService.login(loginDto);
        // 验证用户
        const user = await this.authService.validateUser(loginDto);
        console.log('login===>>>', user);
        return await user;
        // if (!!user) {
        //     return this.authService.login(user);
        // } else {
        //     throw new UnauthorizedException();
        // }
    }

    @UseGuards(AuthGuard('myJwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
