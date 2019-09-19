import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import Config from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myJwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.jwtSecret,
        });
    }
    async validate(payload: any) {
        console.log('JwtStrategy > payload===>>>', payload);
        return { userId: payload.sub, username: payload.username };
    }
}
