import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CompleteTripDto {
    @ApiProperty({ example: '-12.74' })
    @IsNumber()
    destinationLat: number;

    @ApiProperty({ example: '-77.84' })
    @IsNumber()
    destinationLng: number;
}