import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../common/exceptions/httpException.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { DbModule } from '../db/db.module';

// imports: [forwardRef(() => AuthModule)],
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    // imports: [DbModule],
    controllers: [UsersController],
    providers: [UsersService, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
    exports: [UsersService],
})
export class UsersModule {}
