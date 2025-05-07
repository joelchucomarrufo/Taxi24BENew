import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

export enum TripStatus {
    ACTIVO = 'Activo',
    COMPLETADO = 'Completado',
}

@Entity('trips')
export class Trip {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'driverid' })
    driverId: string;

    @Column({ name: 'passengerid' })
    passengerId: string;

    @Column({ name: 'originlat', type: 'double precision' })
    originLat: number;

    @Column({ name: 'originlng', type: 'double precision' })
    originLng: number;

    @Column({ name: 'destinationlat', type: 'double precision', nullable: true })
    destinationLat?: number;

    @Column({ name: 'destinationlng', type: 'double precision', nullable: true })
    destinationLng?: number;

    @Column({ type: 'enum', enum: TripStatus, default: TripStatus.ACTIVO })
    status: TripStatus;

    @CreateDateColumn({ name: 'createdat' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedat' })
    updatedAt: Date;
}