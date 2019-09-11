import { UsersService } from '../users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    // constructor(@Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService) {}
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        console.log('AuthService > validateUser===>>>', user);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            console.log('result===>>>', result);
            return result;
        } else {
            return { msg: '密码错误了' };
        }
    }
    async login(user: LoginDto) {
        const payload = { username: user.username, sub: user.userId };
        console.log('payload===>>>', this.jwtService.sign(payload));
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
