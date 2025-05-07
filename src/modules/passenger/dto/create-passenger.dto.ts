import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsEmail, IsNumber, IsString } from 'class-validator';
import { PassengerStatus } from '../domain/passenger-status.enum';

export class CreatePassengerDto {
    @ApiProperty({ example: 'Juan' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Pérez' })
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'J12345678' })
    @IsString()
    documentNumber: string;

    @ApiProperty({ example: 'juan.perez@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '987654321' })
    @IsString()
    phone: string;

    @IsEnum(PassengerStatus)
    @ApiProperty({ enum: PassengerStatus, default: PassengerStatus.ACTIVO  })
    status: PassengerStatus;

    @ApiProperty({ example: '-12.05' })
    @IsNumber()
    latitude: number;

    @ApiProperty({ example: '-77.04' })
    @IsNumber()
    longitude: number;
}