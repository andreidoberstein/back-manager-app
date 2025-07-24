import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CrmRepository } from './crm.repository';

@Injectable()
export class CrmService {
  constructor(private repository: CrmRepository) {}

  async create(createCustomerDto: CreateCustomerDto, userId: number) {
    return this.repository.create({
      ...createCustomerDto,
      userId,
    });
  }

  async findAll(userId: number) {
    return this.repository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    return this.repository.findOne(id, userId);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto, userId: number) {
    return this.repository.update(id, updateCustomerDto, userId);
  }

  async remove(id: number, userId: number) {
    return this.repository.remove(id, userId);
  }
}