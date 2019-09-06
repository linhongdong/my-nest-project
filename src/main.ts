import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { Logger } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HTTPExceptionFilter } from './exceptions/HTTPException.filter';
import { AllExceptionsFilter } from './exceptions/allExceptions.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('dev');
    // app.useGlobalFilters(new HTTPExceptionFilter()); // 全局过滤器
    // app.useGlobalPipes(new ValidationPipe());
    // app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); // 基础过滤器

    const apiOptions = new DocumentBuilder()
        .setTitle('Test API Doc')
        .setDescription('my-nest-project API Info')
        .setVersion('1.0')
        .addBearerAuth('lhd')
        // .addTag('users') // match tags in controllers
        .setContactEmail('656487723@qq.com')
        // 设置基础路径  与全局的前缀对应，不设置是没有的
        .setBasePath('dev')
        .build();

    const document = SwaggerModule.createDocument(app, apiOptions, { include: [UsersModule] });
    SwaggerModule.setup('swagger/api/', app, document);

    // app.use(Logger);
    await app.listen(3000);
    Logger.log(`Server running on http://localhst:3000`, 'server');
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
