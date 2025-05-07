import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { PassengerStatus } from '../domain/passenger-status.enum';

export class UpdatePassengerLocationStatusDto {
  @ApiProperty({ example: -12.050000 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -77.040000 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ enum: PassengerStatus, default: PassengerStatus.ACTIVO })
  @IsEnum(PassengerStatus)
  status: PassengerStatus;
}