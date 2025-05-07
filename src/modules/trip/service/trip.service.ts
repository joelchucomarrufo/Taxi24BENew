import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip, TripStatus } from '../domain/trip.entity';
import { CreateTripDto } from '../dto/create-trip.dto';
import { CompleteTripDto } from '../dto/complete-trip.dto';

@Injectable()
export class TripService {
    constructor(
        @InjectRepository(Trip)
        private readonly tripRepo: Repository<Trip>,
    ) { }

    create(dto: CreateTripDto): Promise<Trip> {
        const trip = this.tripRepo.create({ ...dto, status: TripStatus.ACTIVO });
        return this.tripRepo.save(trip);
    }

    async complete(id: string, dto: CompleteTripDto): Promise<Trip> {
        const trip = await this.tripRepo.findOneBy({ id });
        if (!trip) throw new NotFoundException('Viaje no encontrado');

        trip.destinationLat = dto.destinationLat;
        trip.destinationLng = dto.destinationLng;
        trip.status = TripStatus.COMPLETADO;
        return this.tripRepo.save(trip);
    }

    findActives(): Promise<Trip[]> {
        return this.tripRepo.find({ where: { status: TripStatus.ACTIVO } });
    }
}