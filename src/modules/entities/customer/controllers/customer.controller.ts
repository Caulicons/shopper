import { Controller, Post } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  async create() {
    return this.customerService.create();
  }
}
