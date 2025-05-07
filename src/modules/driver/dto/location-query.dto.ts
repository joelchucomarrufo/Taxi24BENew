import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationQueryDto {
    @ApiProperty({ example: -12.1793 })
    @IsNumberString()
    lat: string;

    @ApiProperty({ example: -77.0173 })
    @IsNumberString()
    lng: string;
}