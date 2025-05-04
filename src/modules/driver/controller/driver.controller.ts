import { Body, Controller, Get, Post } from '@nestjs/common';
import { DriverService } from '../service/driver.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo conductor' })
  create(@Body() dto: CreateDriverDto) {
    return this.driverService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los conductores' })
  findAll() {
    return this.driverService.findAll();
  }
}
