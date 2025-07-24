import { Injectable } from '@nestjs/common';
import { GenerateReportDto } from './dto/generate-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: GenerateReportDto & { userId: number }) {
    return this.prisma.report.create({ data });
  }

  async findAll(userId: number) {
    return this.prisma.report.findMany({ where: { userId } });
  }
}