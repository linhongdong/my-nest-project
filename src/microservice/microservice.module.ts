import { MicroServiceController } from './microservice.controller';
import { MicroServiceService } from './microservice.service';
import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
    imports: [ClientsModule.register([{ name: 'MICROSERVICE_SERVICE', transport: Transport.TCP }])],
    controllers: [MicroServiceController],
    providers: [MicroServiceService],
})
export class MicroServiceModule {}
