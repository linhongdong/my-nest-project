import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';

@Module({
    imports: [UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
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
