import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CustomerCreateDTO {
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Transform(({ value }: TransformFnParams) => value?.toLowerCase())
  @IsNotEmpty()
  name: string;
}
