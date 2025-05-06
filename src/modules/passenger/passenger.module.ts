import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './domain/passenger.entity';
import { PassengerService } from './service/passenger.service';
import { PassengerController } from './controller/passenger.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Passenger])],
    controllers: [PassengerController],
    providers: [PassengerService],
})
export class PassengerModule { }