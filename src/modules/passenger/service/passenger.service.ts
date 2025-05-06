import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Passenger } from '../domain/passenger.entity';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerLocationStatusDto } from '../dto/update-passenger-location-status.dto';

@Injectable()
export class PassengerService {
    constructor(
        @InjectRepository(Passenger)
        private readonly passengerRepo: Repository<Passenger>,
    ) { }

    create(dto: CreatePassengerDto): Promise<Passenger> {
        const entity = this.passengerRepo.create(dto);
        return this.passengerRepo.save(entity);
    }

    findAll(): Promise<Passenger[]> {
        return this.passengerRepo.find();
    }

    findById(id: string): Promise<Passenger> {
        return this.passengerRepo.findOneByOrFail({ id });
    }

    async updateLocationAndStatus(id: string, dto: UpdatePassengerLocationStatusDto): Promise<Passenger> {
        const passenger = await this.passengerRepo.findOne({ where: { id } });
        if (!passenger) throw new NotFoundException(`Pasajero con ID ${id} no encontrado`);

        passenger.latitude = dto.latitude;
        passenger.longitude = dto.longitude;
        passenger.status = dto.status;

        return this.passengerRepo.save(passenger);
    }
}