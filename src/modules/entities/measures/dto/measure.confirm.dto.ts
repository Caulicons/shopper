import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class MeasureConfirmDTO {
  @IsNotEmpty()
  @IsUUID()
  measure_uuid: string;

  @IsNotEmpty()
  @IsNumber()
  confirmed_value: number;
}
