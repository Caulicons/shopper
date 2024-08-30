import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './entities/measure.entity';
import { MeasureService } from './services/measure.service';
import { MeasureController } from './controllers/measure.controller';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/services/customer.service';
import { GeminiModule } from '../../gemini/gemini.module';
import { GeminiService } from '../../gemini/services/gemini.services';

@Module({
  imports: [TypeOrmModule.forFeature([Measure]), CustomerModule, GeminiModule],
  controllers: [MeasureController],
  providers: [MeasureService, CustomerService, GeminiService],
  exports: [TypeOrmModule],
})
export class MeasureModule {}
