import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateTripDto {
    @ApiProperty({ example: 'D0001' })
    @IsString()
    driverId: string;

    @ApiProperty({ example: 'P0001' })
    @IsString()
    passengerId: string;

    @ApiProperty({ example: '-12.574' })
    @IsNumber()
    originLat: number;

    @ApiProperty({ example: '-77.04' })
    @IsNumber()
    originLng: number;
}