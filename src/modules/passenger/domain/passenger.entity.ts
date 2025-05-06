import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { PassengerStatus } from './passenger-status.enum';

@Entity({ name: 'passengers' })
export class Passenger {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'document_number', unique: true })
    documentNumber: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column({
        type: 'enum',
        enum: PassengerStatus,
        default: PassengerStatus.ACTIVO,
    })
    status: PassengerStatus;

    @Column('double precision')
    latitude: number;

    @Column('double precision')
    longitude: number;

    @CreateDateColumn({ name: 'createdat' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedat' })
    updatedAt: Date;
}