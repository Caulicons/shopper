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

  @Get(':customerCode/list')
  customerMeasures(
    @Param('customerCode') customerCode: string,
    @Query('measure_type') measureType: string,
  ) {
    return this.measureService.customer_measures(customerCode, measureType);
  }
}
