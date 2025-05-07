import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TripService } from '../service/trip.service';
import { CreateTripDto } from '../dto/create-trip.dto';
import { CompleteTripDto } from '../dto/complete-trip.dto';
import { Trip } from '../domain/trip.entity';
import { BaseResponse } from 'src/common/base-response.dto';

@ApiTags('Trips')
@Controller('trips')
export class TripController {
    constructor(private readonly tripService: TripService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una solicitud de viaje' })
    async create(@Body() dto: CreateTripDto): Promise<BaseResponse<Trip>> {
        const result = await this.tripService.create(dto);
        return new BaseResponse({
            status: 'success',
            message: 'Viaje creado exitosamente',
            data: result,
        });
    }

    @Patch(':id/complete')
    @ApiOperation({ summary: 'Completar un viaje existente' })
    async complete(
        @Param('id') id: string,
        @Body() dto: CompleteTripDto,
    ): Promise<BaseResponse<Trip>> {
        const result = await this.tripService.complete(id, dto);
        return new BaseResponse({
            status: 'success',
            message: 'Viaje completado con éxito',
            data: result,
        });
    }

    @Get('active')
    @ApiOperation({ summary: 'Listar todos los viajes activos' })
    async findActives(): Promise<BaseResponse<Trip[]>> {
        const result = await this.tripService.findActives();
        return new BaseResponse({
            status: 'success',
            message: 'Viajes activos obtenidos correctamente',
            data: result,
        });
    }
}