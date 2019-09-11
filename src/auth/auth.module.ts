import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import Constants from '../common/constants';

// forwardRef(() => UsersModule),
@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: Constants.jwtSecret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
