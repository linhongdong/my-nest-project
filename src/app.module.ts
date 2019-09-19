import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from './db/entities/user.entity';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: '127.0.0.1',
        //     port: 3306,
        //     username: 'root',
        //     password: '573532',
        //     database: 'my_nest',
        //     logging: true,
        //     entityPrefix: 'mn_',
        //     entities: [UserEntity],
        //     charset: 'utf8mb4',
        //     synchronize: true,
        // }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    // constructor(private readonly connection: Connection) {}

    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer
            .apply(LoggerMiddleware)
            // .with('AppModule')
            // .forRoutes('users');
            // .exclude({ path: 'users', method: RequestMethod.DELETE })
            // .forRoutes({ path: 'users', method: RequestMethod.ALL });
            .forRoutes(UsersController);
        // return undefined;
    }
}
