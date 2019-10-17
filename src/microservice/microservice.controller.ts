import { Controller, Get, Inject, Query, UsePipes } from '@nestjs/common';
import { MicroServiceService } from './microservice.service';
import { MessagePattern, EventPattern, ClientProxy, Transport, Client } from '@nestjs/microservices';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { Observable, from } from 'rxjs';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@ApiUseTags('微服务')
@Controller('microservice')
export class MicroServiceController {
    // @Inject('MICROSERVICE_SERVICE') private readonly client: ClientProxy,
    constructor(private readonly microServiceService: MicroServiceService) {}

    @Client({ transport: Transport.TCP })
    client: ClientProxy;

    /** **************************************************************************** */
    // async onModuleInit() {
    //     await this.client.connect();
    // }

    // @MessagePattern({ cmd: 'sum' })
    // async accumulate(data: number[]): Promise<number> {
    //     console.log('accumulate===>>>', data);
    //     return (data || []).reduce((a, b) => a + b);
    // }

    // @MessagePattern({ cmd: 'sum' })
    // accumulate(data: number[]): Observable<number> {
    //     console.log('===>>>', data);
    //     return from([1, 2, 3]);
    // }

    @EventPattern('user_created')
    async handleUserCreated(data: Record<string, unknown>) {
        console.log('handleUserCreated===>>>', data);
        // business logic
    }

    // 发送消息
    accumulate(): Observable<number> {
        const pattern = { cmd: 'sum' };
        const payload = [1, 2, 3];
        return this.client.send<number>(pattern, payload);
    }

    // 发布事件
    async publish() {
        // this.client.emit<number>('user_created', new UserCreatedEvent());
    }
    /** **************************************************************************** */

    @UsePipes(new ValidationPipe())
    @ApiImplicitQuery({ name: 'data', enum: ['[1,2,3]', '[2,3,5]', '[13,24,35]'] })
    @Get('microserviceTest')
    microserviceTest(@Query('data') data: any): Observable<number> {
        const pattern = { cmd: 'sumObservable' };
        // const pattern = { cmd: 'sumAsync' };
        // const pattern = { cmd: 'sum' };
        // const data = [1, 2, 3];
        // 使用 send 调用微服务
        const r = this.client.send<number>(pattern, data);
        console.log('r===>>>', r);
        return r;
    }

    @MessagePattern({ cmd: 'sum' })
    sum(data: number[]): number {
        console.log('sum data===>>>', data);
        return data.reduce((acc, el) => acc + el);
    }

    // 返回promise异步响应
    @MessagePattern({ cmd: 'sumAsync' })
    sumAsync(data: number[]): Promise<number> {
        const result = data.reduce((acc, el) => acc + el) + 1;
        console.log('sumAsync data===>>>', data);
        return Promise.resolve(result);
    }

    // 程序将响应3次
    @MessagePattern({ cmd: 'sumObservable' })
    sumObservable(data: number[]): Observable<number> {
        return from(data);
    }
}
