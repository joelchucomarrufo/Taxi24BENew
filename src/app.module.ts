import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './modules/driver/driver.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { TripModule } from './modules/trip/trip.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'taxi24',
      synchronize: false,
      autoLoadEntities: true,
    }),
    DriverModule,
    PassengerModule,
    TripModule,
    BillingModule,
  ],
})
export class AppModule {}