import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Measure } from '../entities/measure.entity';
import { Repository } from 'typeorm';
import { MeasureRegisterDTO } from '../dto/measure.register.dto';
import { MeasureConfirmDTO } from '../dto/measure.confirm.dto';

@Injectable()
export class MeasureService {
  constructor(
    @InjectRepository(Measure)
    private readonly measureRepository: Repository<Measure>,
  ) {}

  async upload({}: MeasureRegisterDTO) {}

  async confirm({}: MeasureConfirmDTO) {}

  async customer_measures() {}
}
