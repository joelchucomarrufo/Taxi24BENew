import { Injectable } from '@nestjs/common';
import { Driver } from '../domain/driver.entity';

@Injectable()
export class DriverRepository {
  private drivers: Driver[] = [];

  save(driver: Driver): Driver {
    this.drivers.push(driver);
    return driver;
  }

  findAll(): Driver[] {
    return this.drivers;
  }
}
