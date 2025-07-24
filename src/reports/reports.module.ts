import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportsRepository } from './reports.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/config/redis.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository, PrismaService, RedisService],
})
export class ReportsModule {}