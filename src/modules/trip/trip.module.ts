import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './domain/trip.entity';
import { Billing } from '../billing/domain/billing.entity';
import { TripService } from './service/trip.service';
import { TripController } from './controller/trip.controller';
import { BillingModule } from '../billing/billing.module';

@Module({
    imports: [TypeOrmModule.forFeature([Trip]), BillingModule],
    controllers: [TripController],
    providers: [TripService],
})
export class TripModule { }