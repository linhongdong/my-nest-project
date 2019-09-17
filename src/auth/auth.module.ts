import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import Constants from '../common/constants';
import { JwtStrategy } from './jwt.strategy';

// forwardRef(() => UsersModule),
@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: Constants.jwtSecret,
            signOptions: { expiresIn: Constants.jwtExpiresIn },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
