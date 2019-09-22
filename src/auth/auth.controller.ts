import { Request, Post, Controller, UseGuards, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiUseTags('认证')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Request() req) {
        // console.log('login===>>>', req.user);
        // return req.user;
        // return this.authService.validateUser(loginDto.username, loginDto.password);
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('myJwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
