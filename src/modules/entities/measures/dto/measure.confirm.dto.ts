import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class MeasureConfirmDTO {
  @ApiProperty({
    type: String,
    description: 'Measure identifier',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  measure_uuid: string;

  @ApiProperty({
    type: Number,
    description: 'Confirmed measure value',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  confirmed_value: number;
}
