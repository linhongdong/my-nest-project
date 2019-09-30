import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Config } from '../config';

// forwardRef(() => UsersModule),
@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: Config.jwtSecret,
            signOptions: { expiresIn: Config.jwtExpiresIn },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
