import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('tb_measures')
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  measure_uuid: string;

  @Column({ nullable: false })
  measure_datetime: Date;

  @Column({ nullable: false, enum: ['WATER', 'GAS'] })
  measure_type: string;

  @Column({ nullable: false })
  measure_value: number;

  @Column({ default: false })
  has_confirmed: boolean;

  @Column()
  image_url: string;

  @ManyToOne(() => Customer, (customer) => customer.measurements, {
    onDelete: 'CASCADE',
  })
  customer_code: Customer;
}
