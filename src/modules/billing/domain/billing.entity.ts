import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, } from 'typeorm';
import { Trip } from '../../trip/domain/trip.entity';

@Entity('billing')
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tripid' })
  tripId: string;

  @ManyToOne(() => Trip)
  @JoinColumn({ name: 'tripid' })
  trip: Trip;

  @Column('numeric', { precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'payment_method', default: 'Tarjeta' })
  paymentMethod: string;

  @CreateDateColumn({ name: 'createdat' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedat' })
  updatedAt: Date;
}