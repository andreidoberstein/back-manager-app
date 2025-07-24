import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ReportsService } from '../../reports/reports.service';
import { GenerateReportDto } from '../../reports/dto/generate-report.dto';
import { Report } from '../../reports/entities/report.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Resolver(() => Report)
@UseGuards(JwtAuthGuard)
export class ReportResolver {
  constructor(private reportsService: ReportsService) {}

  @Mutation(() => Report)
  async generateReport(
    @Args('input') input: GenerateReportDto,
    @Context() context,
  ) {
    return this.reportsService.generate(input, context.req.user.id);
  }

  @Query(() => [Report])
  async reports(@Context() context) {
    return this.reportsService.findAll(context.req.user.id);
  }
}