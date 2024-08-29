import { IsBase64, IsIn, IsNotEmpty, IsUUID } from 'class-validator';

export class MeasureRegisterDTO {
  @IsNotEmpty()
  @IsUUID()
  customer_code: string;

  @IsNotEmpty()
  @IsBase64()
  image: string;

  @IsNotEmpty()
  measure_datetime: Date;

  @IsNotEmpty()
  @IsIn(['WATER', 'GAS'])
  measure_type: string;
}
