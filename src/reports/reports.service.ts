import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { GenerateReportDto } from './dto/generate-report.dto';
import { RedisService } from '../config/redis.service';

@Injectable()
export class ReportsService {
  constructor(
    private repository: ReportsRepository,
    private redisService: RedisService,
  ) {}

  async generate(generateReportDto: GenerateReportDto, userId: number) {
    const cacheKey = `report:${userId}:${generateReportDto.title}`;
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const report = await this.repository.create({
      title: generateReportDto.title,
      data: generateReportDto.data,
      userId,
    });

    await this.redisService.set(cacheKey, JSON.stringify(report), 3600);
    return report;
  }

  async findAll(userId: number) {
    return this.repository.findAll(userId);
  }
}