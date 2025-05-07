import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { DriverStatus } from '../domain/driver-status.enum';

export class UpdateLocationStatusDto {
  @ApiProperty({ example: -12.12345 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -77.12345 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ enum: DriverStatus })
  @IsEnum(DriverStatus)
  status: DriverStatus;
}