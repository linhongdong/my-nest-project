import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class MyAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // console.log('===>>>', request);
        return this.validateRequest(request);
    }

    private validateRequest(req: any) {
        // 此处验证 req
        console.log('此处验证===>>>', req.body);
        return req;
    }
}
