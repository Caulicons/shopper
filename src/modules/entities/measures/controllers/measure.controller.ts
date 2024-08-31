import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MeasureConfirmDTO } from '../dto/measure.confirm.dto';
import { MeasureRegisterDTO } from '../dto/measure.register.dto';
import { MeasureService } from '../services/measure.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Measures')
@Controller()
export class MeasureController {
  constructor(private measureService: MeasureService) {}
  @Post('upload')
  uploadMeasurements(
    @Body()
    body: MeasureRegisterDTO,
  ) {
    return this.measureService.upload(body);
  }

  @Patch('confirm')
  confirmMeasurements(
    @Body()
    body: MeasureConfirmDTO,
  ) {
    return this.measureService.confirm(body);
  }

  @ApiQuery({
    name: 'measure_type',
    description: 'Measure type can only be WATER or GAS',
    type: String,
    required: false,
  })
  @Get(':customerCode/list')
  customerMeasures(
    @Param('customerCode') customerCode: string,
    @Query('measure_type') measureType: string,
  ) {
    return this.measureService.customer_measures(customerCode, measureType);
  }
}
