import { UsersService } from '../users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { EmptyException } from '../common/exceptions/empty.exception';
@Injectable()
export class AuthService {
    // constructor(@Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService) {}
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}
    // async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // console.log('AuthService > validateUser===>>>', user);
    // if (user && user.password === pass) {
    //     const { password, ...result } = user;
    //     console.log('result===>>>', result);
    //     return result;
    // } else {
    //     return { msg: '密码错误了' };
    // }
    // }
    /**
     * 验证登录用户
     * @param userInfo 登录用户信息
     */
    async validateUser(userInfo: LoginDto) {
        const users: UserEntity[] =
            (await this.wherePhoneGetUser(userInfo.userId)) || (await this.whereEmailGetUser(userInfo.userId));
        console.log(users);
        // const user: { userId: string; userName: string } = {
        //     userId: users[0].userPhone,
        //     userName: users[0].userName,
        // };
        if (!!users && !!users[0]) {
            const { userPhone: userId, userName } = users[0];
            return { userId, userName };
            // return user;
        } else {
            throw new EmptyException('用户不存在');
            // return '用户不存在';
        }
    }
    /**
     * 根据登录用户 id ，匹配手机号，获取用户信息
     * @param userInfo 登录用户信息
     */
    async wherePhoneGetUser(phone: string) {
        return await this.userRepository.find({ where: { phone } });
    }
    /**
     * 根据登录用户 id ，匹配邮箱，获取用户信息
     * @param userInfo 登录用户信息
     */
    async whereEmailGetUser(email: string) {
        return await this.userRepository.find({ where: { email } });
    }
    async login(user) {
        // const payload = { username: user.username, sub: user.userId };
        // console.log('payload===>>>', this.jwtService.sign(payload));
        return {
            // access_token: this.jwtService.sign(payload),  // 签发token
        };
    }
}
