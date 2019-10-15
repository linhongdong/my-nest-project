import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config } from '../config';
import { JwtPayloadDto } from './dto/jwtPayload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myJwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.jwtSecret,
        });
    }
    async validate(payload: JwtPayloadDto) {
        const { userId, userName, userEmail } = payload;
        // console.log('JwtStrategy > payload===>>>', payload);
        return { userId, userName, userEmail };
    }
}
