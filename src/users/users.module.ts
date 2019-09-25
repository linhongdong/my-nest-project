import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_FILTER } from '@nestjs/core';
import { HTTPExceptionFilter } from '../exceptions/HTTPException.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DbModule } from '../db/db.module';

// imports: [forwardRef(() => AuthModule)],
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    // imports: [DbModule],
    controllers: [UsersController],
    providers: [UsersService, { provide: APP_FILTER, useClass: HTTPExceptionFilter }],
    exports: [UsersService],
})
export class UsersModule {}
