import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from '../domain/driver.entity';
import { DriverStatus } from '../domain/driver-status.enum';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateLocationStatusDto } from '../dto/update-location-status.dto';
import { NotFoundException } from '@nestjs/common';
import { getDistance } from 'geolib';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
  ) { }

  async create(dto: CreateDriverDto): Promise<Driver> {
    const driver = this.driverRepo.create(dto);
    return this.driverRepo.save(driver);
  }

  async updateLocationAndStatus(id: string, dto: UpdateLocationStatusDto): Promise<Driver> {
    const driver = await this.driverRepo.findOneBy({ id });
    if (!driver) {
      throw new NotFoundException('Conductor no encontrado');
    }

    driver.latitude = dto.latitude;
    driver.longitude = dto.longitude;
    driver.status = dto.status;

    return this.driverRepo.save(driver);
  }

  findAll(): Promise<Driver[]> {
    return this.driverRepo.find();
  }

  async findById(id: string): Promise<Driver | null> {
    return this.driverRepo.findOne({ where: { id } });
  }

  async findAvailable(): Promise<Driver[]> {
    return this.driverRepo.find({
      where: { status: DriverStatus.DISPONIBLE },
    });
  }

  async findAvailableNearby(latitude: number, longitude: number): Promise<Driver[]> {
    const availableDrivers = await this.driverRepo.find({ where: { status: DriverStatus.DISPONIBLE } });

    return availableDrivers.filter(driver => {
      const distance = getDistanceFromLatLonInKm(latitude, longitude, driver.latitude, driver.longitude);
      return distance <= 3;
    });
  }

  async findClosestDrivers(lat: number, lng: number): Promise<any[]> {
    const availableDrivers = await this.driverRepo.find({
      where: { status: DriverStatus.DISPONIBLE },
    });

    const driversWithDistance = availableDrivers.map(driver => ({
      ...driver,
      distance_km: parseFloat(
        (getDistance(
          { latitude: lat, longitude: lng },
          { latitude: driver.latitude, longitude: driver.longitude }
        ) / 1000
        ).toFixed(2))
    }));

    return driversWithDistance
      .sort((a, b) => a.distance_km - b.distance_km)
      .slice(0, 3);
  }

}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}