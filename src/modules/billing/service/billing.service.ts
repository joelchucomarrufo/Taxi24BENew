import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from '../domain/billing.entity';
import { Trip } from '../../trip/domain/trip.entity';

@Injectable()
export class BillingService {
    constructor(
        @InjectRepository(Billing)
        private readonly billingRepo: Repository<Billing>,
    ) { }

    async generate(tripId: string): Promise<Billing> {
        const amount = +(Math.random() * (50 - 15) + 15).toFixed(2);
        const paymentMethods = ['Tarjeta', 'Yape', 'Efectivo', 'Plin'];
        const randomMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

        const bill = this.billingRepo.create({
            tripId,
            amount,
            paymentMethod: randomMethod,
        });

        return this.billingRepo.save(bill);
    }

    async findByTrip(tripId: string): Promise<Billing> {
        const billing = await this.billingRepo.findOneBy({ tripId });
        if (!billing) {
            throw new NotFoundException(`No billing found for trip ID ${tripId}`);
        }
        return billing;
    }

    findAll(): Promise<Billing[]> {
        return this.billingRepo.find();
    }

    async createFromTrip(trip: Trip): Promise<Billing> {
        const amount = this.calculateBillingAmount(trip); 
        const billing = this.billingRepo.create({ tripId: trip.id, amount });
        return this.billingRepo.save(billing);
    }

    private calculateBillingAmount(trip: Trip): number {
        const baseFare = 5.0;
        const distanceFare = 1.5 * this.calculateDistanceKm(
            trip.originLat!,
            trip.originLng!,
            trip.destinationLat!,
            trip.destinationLng!,
        );

        return Math.round((baseFare + distanceFare) * 100) / 100;
    }

    private calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRad = (value: number) => (value * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}