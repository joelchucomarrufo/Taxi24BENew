import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip, TripStatus } from '../domain/trip.entity';
import { CreateTripDto } from '../dto/create-trip.dto';
import { CompleteTripDto } from '../dto/complete-trip.dto';
import { BillingService } from '../../billing/service/billing.service';

@Injectable()
export class TripService {
    constructor(
        @InjectRepository(Trip)
        private readonly tripRepo: Repository<Trip>,

        private readonly billingService: BillingService,
    ) { }

    create(dto: CreateTripDto): Promise<Trip> {
        const trip = this.tripRepo.create({ ...dto, status: TripStatus.ACTIVO });
        return this.tripRepo.save(trip);
    }

    async completeTrip(id: string, dto: CompleteTripDto): Promise<Trip> {
        const trip = await this.tripRepo.findOneBy({ id });

        if (!trip) {
            throw new NotFoundException(`Trip with id ${id} not found`);
        }

        trip.destinationLat = dto.destinationLat;
        trip.destinationLng = dto.destinationLng;
        trip.status = TripStatus.COMPLETADO;
        trip.updatedAt = new Date();
        const completedTrip = await this.tripRepo.save(trip);

        await this.billingService.createFromTrip(completedTrip);

        return completedTrip;
    }

    findActives(): Promise<Trip[]> {
        return this.tripRepo.find({ where: { status: TripStatus.ACTIVO } });
    }

}