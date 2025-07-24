import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinancialRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTransactionDto & { userId: number; customerId: number }) {
    return this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        description: dto.description,
        category: dto.category,
        user: { connect: { id: dto.userId } },
        customer: { connect: { id: dto.customerId } },
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.transaction.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.transaction.findFirst({ where: { id, userId } });
  }

  async update(id: number, data: UpdateTransactionDto, userId: number) {
    return this.prisma.transaction.update({ where: { id, userId }, data });
  }

  async remove(id: number, userId: number) {
    return this.prisma.transaction.delete({ where: { id, userId } });
  }
}