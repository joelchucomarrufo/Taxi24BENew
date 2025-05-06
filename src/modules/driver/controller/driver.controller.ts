import { Body, Controller, Get, Post, Patch, Param, Query } from '@nestjs/common';
import { DriverService } from '../service/driver.service';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateLocationStatusDto } from '../dto/update-location-status.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base-response.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Driver } from '../domain/driver.entity';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo conductor' })
  create(@Body() dto: CreateDriverDto) {
    return this.driverService.create(dto);
  }

  @Patch(':id/location-status')
  @ApiOperation({ summary: 'Actualizar ubicación y estado del conductor' })
  async updateLocationAndStatus(
    @Param('id') id: string,
    @Body() dto: UpdateLocationStatusDto,
  ): Promise<BaseResponse<Driver>> {
    try {
      const updated = await this.driverService.updateLocationAndStatus(id, dto);
      return new BaseResponse({
        status: 'success',
        message: 'Ubicación y estado actualizados correctamente',
        data: updated,
      });
    } catch (err) {
      throw new HttpException(
        new BaseResponse({
          status: 'error',
          message: err.message || 'Error inesperado',
          data: null,
        }),
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los conductores' })
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar conductor por ID' })
  async findById(@Param('id') id: string): Promise<BaseResponse<Driver>> {
    try {
      const driver = await this.driverService.findById(id);

      if (!driver) {
        throw new HttpException(
          new BaseResponse<Driver>({
            status: 'error',
            message: `No se encontró el conductor con id ${id}`,
            data: null,
          }),
          HttpStatus.NOT_FOUND,
        );
      }

      return new BaseResponse<Driver>({
        status: 'success',
        message: 'Conductor encontrado',
        data: driver,
      });
    } catch (err) {
      throw new HttpException(
        new BaseResponse<Driver>({
          status: 'error',
          message: err.message || 'Error inesperado',
          data: null,
        }),
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('available')
  @ApiOperation({ summary: 'Obtener conductores disponibles' })
  async findAvailable(): Promise<BaseResponse<Driver[]>> {
    try {
      const drivers = await this.driverService.findAvailable();

      return new BaseResponse<Driver[]>({
        status: 'success',
        message: 'Conductores disponibles encontrados',
        data: drivers,
      });
    } catch (err) {
      throw new HttpException(
        new BaseResponse<Driver[]>({
          status: 'error',
          message: err.message || 'Error inesperado',
          data: null,
        }),
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('available/nearby')
  @ApiOperation({ summary: 'Obtener conductores disponibles cerca a una ubicación' })
  async findNearby(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<BaseResponse<Driver[]>> {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      throw new HttpException(
        new BaseResponse<Driver[]>({
          status: 'error',
          message: 'Parámetros inválidos: latitude y longitude deben ser números',
          data: null,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    const drivers = await this.driverService.findAvailableNearby(lat, lon);

    return new BaseResponse<Driver[]>({
      status: 'success',
      message: `Se encontraron ${drivers.length} conductores cerca de la ubicación`,
      data: drivers,
    });
  }
}
