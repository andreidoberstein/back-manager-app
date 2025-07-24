import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { RedisService } from '../config/redis.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
  constructor(
    private repository: DashboardRepository,
    private redisService: RedisService,
  ) {}

  async getDashboardStats(userId: number): Promise<DashboardStatsDto> {
    const cacheKey = `dashboard:stats:${userId}`;
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const stats = await this.repository.getStats(userId);

    await this.redisService.set(cacheKey, JSON.stringify(stats), 300); // Cache por 5 minutos
    return stats;
  }
}