import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { Logger } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HTTPExceptionFilter } from './common/exceptions/HTTPException.filter';
import { AllExceptionsFilter } from './common/exceptions/allExceptions.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuthModule } from './auth/auth.module';
import { HeroModule } from './hero/hero.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { MicroServiceModule } from './microservice/microservice.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 运行多种服务（运行微服务）
    const microservice = app.connectMicroservice({ transport: Transport.TCP });
    await app.startAllMicroservicesAsync();

    // 全局前缀
    app.setGlobalPrefix('dev');
    // app.useGlobalFilters(new HTTPExceptionFilter()); // 全局过滤器
    // app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
    app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); // 基础过滤器

    const apiOptions = new DocumentBuilder()
        .setTitle('Test API Doc')
        .setDescription('my-nest-project API Info')
        .setVersion('1.0')
        // .addBearerAuth('lhd')
        .addBearerAuth()
        // .addTag('users') // match tags in controllers
        .setContactEmail('1625125333@qq.com')
        // 设置基础路径  与全局的前缀对应，不设置是没有的
        .setBasePath('dev')
        .build();

    const document = SwaggerModule.createDocument(app, apiOptions, {
        include: [AuthModule, HeroModule, UsersModule, MicroServiceModule],
    });
    SwaggerModule.setup('swagger/api/', app, document);

    // app.use(Logger);
    // 端口号
    await app.listen(3000);

    Logger.log(`Server running on http://localhst:3000`, 'server');
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

// 微服务
/* async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, { transport: Transport.TCP });

    await app.listen(() => Logger.log(`微服务正在监听`, 'microservices'));
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
} */

bootstrap();
