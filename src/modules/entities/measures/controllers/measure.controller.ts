import { Body, Controller, Patch, Post } from '@nestjs/common';
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
}
