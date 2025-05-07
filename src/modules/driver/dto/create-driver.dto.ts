import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { DriverStatus } from '../domain/driver-status.enum';

export class CreateDriverDto {
  @ApiProperty({ example: 'Juan Jose' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Perez Rojas' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'LIC000' })
  @IsString()
  license: string;

  @ApiProperty({ example: '-12.050000' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: '-77.040000' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ enum: DriverStatus, default: DriverStatus.DISPONIBLE })
  @IsEnum(DriverStatus)
  status: DriverStatus;
}