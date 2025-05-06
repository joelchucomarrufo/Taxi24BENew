import { Body, Controller, Get, Param, Post, Patch, } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerService } from '../service/passenger.service';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { Passenger } from '../domain/passenger.entity';
import { BaseResponse } from 'src/common/base-response.dto';
import { UpdatePassengerLocationStatusDto } from '../dto/update-passenger-location-status.dto';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengerController {
    constructor(private readonly passengerService: PassengerService) { }

    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo pasajero' })
    async create(
        @Body() dto: CreatePassengerDto,
    ): Promise<BaseResponse<Passenger>> {
        const created = await this.passengerService.create(dto);
        return new BaseResponse({
            status: 'success',
            message: 'Pasajero creado exitosamente',
            data: created,
        });
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los pasajeros' })
    async findAll(): Promise<BaseResponse<Passenger[]>> {
        const list = await this.passengerService.findAll();
        return new BaseResponse({
            status: 'success',
            message: 'Listado obtenido correctamente',
            data: list,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar pasajero por ID' })
    async findById(@Param('id') id: string): Promise<BaseResponse<Passenger>> {
        const result = await this.passengerService.findById(id);
        return new BaseResponse({
            status: 'success',
            message: 'Pasajero encontrado',
            data: result,
        });
    }

    @Patch(':id/location-status')
    @ApiOperation({ summary: 'Actualizar ubicación y estado del pasajero' })
    async updateLocationAndStatus(
        @Param('id') id: string,
        @Body() dto: UpdatePassengerLocationStatusDto,
    ): Promise<BaseResponse<Passenger>> {
        try {
            const updated = await this.passengerService.updateLocationAndStatus(id, dto);
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

}