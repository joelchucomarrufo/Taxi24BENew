import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../domain/driver.entity';
import { CreateDriverDto } from '../dto/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
  ) {}

  async create(dto: CreateDriverDto): Promise<Driver> {
    const driver = this.driverRepo.create({
      ...dto,
      isAvailable: true,
    });
    return this.driverRepo.save(driver);
  }

  findAll(): Promise<Driver[]> {
    return this.driverRepo.find();
  }
}