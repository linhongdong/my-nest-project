import { Injectable, OnModuleInit } from '@nestjs/common';
import { Users } from './users.interface';
import { LoginDto } from '../auth/dto/login.dto';
import { UserEntity } from '../entitys/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    onModuleInit() {
        console.log(`===>>> The module has been initialized.`);
    }
    private readonly userList: Users[] = [
        { id: 1, name: '李青', age: 36, epithet: '盲僧', nickname: '瞎子' },
        { id: 2, name: '盖伦', age: 26, epithet: '德玛西亚之力', nickname: '德玛' },
        { id: 3, name: '嘉文四世', age: 20, epithet: '德玛西亚皇子', nickname: '皇子', password: '123' },
        { id: 4, name: '拉克丝', age: 18, epithet: '光辉女郎', nickname: '光女' },
        { id: 5, name: '内瑟斯', age: 18, epithet: '沙漠死神', nickname: '狗头🐶' },
        { id: 6, name: '雷克顿', age: 18, epithet: '荒漠屠夫', nickname: '鳄鱼🐊' },
    ];
    private readonly users: LoginDto[] = [
        {
            userId: '1',
            username: 'john',
            password: 'changeme',
        },
        {
            userId: '2',
            username: 'chris',
            password: 'secret',
        },
        {
            userId: '3',
            username: 'maria',
            password: 'guess',
        },
    ];

    async createUser(user: CreateUserDto) {
        // this.userList.push(user);
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getUserList() {
        // console.log('userList===>>>', this.userList);
        // return this.userList;
        console.log('================<<<');
        return await this.userRepository.find({ where: { username: 'lhd' } });
    }

    deleteUser(id: number) {
        this.userList.forEach(item => {
            if (item.id === id) {
                this.userList.splice(0, 1);
                // console.log('id===>>>', id);
            }
        });
        return this.userList;
    }

    async findOne(username: string): Promise<LoginDto | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findAll(): Promise<UserEntity[]> {
        let username: string = 'lhd';
        console.log(username);
        // return await this.userRepository.find({ where: { username: 'lhd' } });
        return;
    }
}
