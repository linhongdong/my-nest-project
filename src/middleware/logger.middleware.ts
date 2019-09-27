import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): any {
        console.log('我是中间件......');
        // res.status(HttpStatus.OK).json(['你瞅啥']);
        // console.log('req.body===>>>', req.body);
        // console.log('res===>>>', res);
        next();
    }
}
