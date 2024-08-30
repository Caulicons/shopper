import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Measure } from '../../measures/entities/measure.entity';

@Entity('tb_customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToMany(() => Measure, (measure) => measure.customer_code)
  measurements: Measure[];
}
