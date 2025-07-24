import { Resolver, Query, Context } from '@nestjs/graphql';
import { DashboardService } from '../../dashboard/dashboard.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { DashboardStats } from 'src/dashboard/types/dashboard-stats.type';
import { DashboardStatsDto } from 'src/dashboard/dto/dashboard-stats.dto';

@Resolver(() => DashboardStatsDto)
@UseGuards(JwtAuthGuard)
export class DashboardResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(() => DashboardStats)
  async dashboardStats(@Context() context) {
    return this.dashboardService.getDashboardStats(context.req.user.id);
  }
}