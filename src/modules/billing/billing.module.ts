import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './domain/billing.entity';
import { BillingService } from './service/billing.service';
import { BillingController } from './controller/billing.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Billing])],
    controllers: [BillingController],
    providers: [BillingService],
    exports: [BillingService],
})
export class BillingModule { }