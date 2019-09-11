import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_FILTER } from '@nestjs/core';
import { HTTPExceptionFilter } from '../exceptions/HTTPException.filter';

// imports: [forwardRef(() => AuthModule)],
@Global()
@Module({
    controllers: [UsersController],
    providers: [UsersService, { provide: APP_FILTER, useClass: HTTPExceptionFilter }],
    exports: [UsersService],
})
export class UsersModule {}
