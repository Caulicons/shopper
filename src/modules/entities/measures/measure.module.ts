import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './entities/measure.entity';
import { MeasureService } from './services/measure.service';
import { MeasureController } from './controllers/measure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Measure])],
  controllers: [MeasureController],
  providers: [MeasureService],
  exports: [TypeOrmModule],
})
export class MeasureModule {}
