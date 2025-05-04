import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverController } from './controller/driver.controller';
import { DriverService } from './service/driver.service';
import { Driver } from './domain/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
