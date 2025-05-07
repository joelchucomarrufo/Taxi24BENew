import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './domain/trip.entity';
import { TripService } from './service/trip.service';
import { TripController } from './controller/trip.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Trip])],
    controllers: [TripController],
    providers: [TripService],
})
export class TripModule { }