import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { FinancialRepository } from './financial.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FinancialController],
  providers: [FinancialService, FinancialRepository, PrismaService],
})
export class FinancialModule {}