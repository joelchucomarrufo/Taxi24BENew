import { Controller, Get, Param } from '@nestjs/common';
import { BillingService } from '../service/billing.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base-response.dto';
import { Billing } from '../domain/billing.entity';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas las facturas' })
    async findAll(): Promise<BaseResponse<Billing[]>> {
        const result = await this.billingService.findAll();
        return new BaseResponse({
            status: 'success',
            message: 'Listado de facturas generado correctamente',
            data: result,
        });
    }

    @Get(':tripId')
    @ApiOperation({ summary: 'Obtener factura por ID de viaje' })
    async findByTrip(@Param('tripId') tripId: string): Promise<BaseResponse<Billing>> {
        const result = await this.billingService.findByTrip(tripId);
        return new BaseResponse({
            status: 'success',
            message: 'Factura encontrada',
            data: result,
        });
    }
}