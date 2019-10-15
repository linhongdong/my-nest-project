import { Request, Post, Controller, UseGuards, Body, Get, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../common/entities/user.entity';
import { JwtPayloadDto } from './dto/jwtPayload.dto';

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
        const user: JwtPayloadDto = await this.authService.validateUser(loginDto);
        // return user;
        if (!!user) {
            return this.authService.login(user);
        } else {
            throw new UnauthorizedException();
        }
    }

    @ApiOperation({
        title: '注册',
        description: '注册一个新用户',
        operationId: '注册用户',
    })
    @Post('register')
    async register(@Body() user: UserEntity) {
        return this.authService.createUser(user);
    }

    @ApiOperation({
        title: '获取当前用户',
        description: '获取当前用户信息',
        operationId: '用户信息',
    })
    @UseGuards(AuthGuard('myJwt'))
    @Get('getUserInfo')
    getUserInfo(@Request() req: any) {
        return req.user;
    }
}
