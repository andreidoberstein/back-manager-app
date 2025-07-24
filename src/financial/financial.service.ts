import { Injectable } from '@nestjs/common';
import { FinancialRepository } from './financial.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class FinancialService {
  constructor(private repository: FinancialRepository) {}

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    return this.repository.create({
      ...createTransactionDto,
      userId,
    });
  }

  async findAll(userId: number) {
    return this.repository.findAll(userId);
  }

  async findOne(id: number, userId: number) {
    return this.repository.findOne(id, userId);
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto, userId: number) {
    return this.repository.update(id, updateTransactionDto, userId);
  }

  async remove(id: number, userId: number) {
    return this.repository.remove(id, userId);
  }
}