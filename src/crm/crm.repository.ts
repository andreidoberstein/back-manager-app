import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CrmRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomerDto & { userId: number }) {
    return this.prisma.customer.create({ data });
  }

  async findAll(userId: number) {
    return this.prisma.customer.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.customer.findFirst({ where: { id, userId } });
  }

  async update(id: number, data: UpdateCustomerDto, userId: number) {
    return this.prisma.customer.update({ where: { id, userId }, data });
  }

  async remove(id: number, userId: number) {
    return this.prisma.customer.delete({ where: { id, userId } });
  }
}