import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './dashboard.repository';
import { RedisService } from '../config/redis.service';
import { DashboardController } from './dashboard/dashboard.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository, PrismaService, RedisService],
})
export class DashboardModule {}