import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @ApiProperty({ example: -12.05 })
  latitude: number;

  @ApiProperty({ example: -77.04 })
  longitude: number;
}