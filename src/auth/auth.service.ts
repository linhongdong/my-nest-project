import { UsersService } from '../users/users.service';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { EmptyException } from '../common/exceptions/empty.exception';
import { JwtPayloadDto } from './dto/jwtPayload.dto';
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
        let users: UserEntity[] = [];
        const phones: UserEntity[] = await this.wherePhoneGetUser(userInfo.userId);
        if (phones && phones.length > 0) {
            users = [...phones];
        } else {
            const emails: UserEntity[] = await this.whereEmailGetUser(userInfo.userId);
            users = [...phones, ...emails];
        }
        if (!!users && users.length > 0) {
            const { password, userPhone: userId, userName, userEmail, userMotto } = users[0];
            if (password === userInfo.password) {
                return { userId, userName, userEmail, userMotto };
            } else {
                throw new EmptyException('用户密码错误');
            }
        } else {
            throw new EmptyException('用户不存在');
        }
    }
    /**
     * 根据登录用户 id ，匹配手机号，获取用户信息
     * @param userInfo 登录用户信息
     */
    async wherePhoneGetUser(userPhone: string) {
        return await this.userRepository.find({ where: { userPhone } });
    }
    /**
     * 根据登录用户 id ，匹配邮箱，获取用户信息
     * @param userInfo 登录用户信息
     */
    async whereEmailGetUser(userEmail: string) {
        return await this.userRepository.find({ where: { userEmail } });
    }
    /**
     * 登录成功后，签发 tiken
     * @param user 登录用户信息
     */
    async login(user: JwtPayloadDto) {
        const { userId, userName, userEmail } = user;
        // 生成 token
        const token = this.jwtService.sign({ userId, userName, userEmail });
        return { token, ...user };
    }
    /**
     * 注测一个新用户
     * @param user 用户信息
     */
    async createUser(user: UserEntity) {
        if (user && user.userPhone && user.password && user.userEmail && user.userName) {
            const phones: UserEntity[] = await this.wherePhoneGetUser(user.userPhone);
            if (phones && phones.length > 0) {
                throw new EmptyException('该手机号已被占用');
            }
            const emails: UserEntity[] = await this.whereEmailGetUser(user.userEmail);
            if (emails && emails.length > 0) {
                throw new EmptyException('该邮箱已被占用');
            }
            const userInfo = await this.userRepository.save(user);
            return { userInfo, result: true, msg: '注册成功' };
        } else {
            throw new BadRequestException();
        }
    }
}
