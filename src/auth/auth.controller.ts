import { Request, Post, Controller, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import Constants from '../common/constants';

@ApiUseTags('认证')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Request() req) {
        console.log('login===>>>', req.user);
        // return req.user;
        // return this.authService.validateUser(loginDto.username, loginDto.password);
        console.log('=================', Constants.jwtSecret);
        return this.authService.login(req.user);
    }
}
