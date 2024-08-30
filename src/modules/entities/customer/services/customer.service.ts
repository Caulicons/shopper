import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create() {
    return await this.customerRepository.save({});
  }

  async findOne(uuid: string) {
    return await this.customerRepository.findOne({
      where: { uuid },
      relations: { measurements: true },
    });
  }
}
