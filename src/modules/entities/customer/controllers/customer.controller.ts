import { Controller, Post } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post('create')
  async create() {
    return this.customerService.create();
  }
}
