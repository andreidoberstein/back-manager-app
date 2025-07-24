import { IsArray, IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerGrowthDto {
  @ApiProperty()
  @IsString()
  month: string;

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class RevenueByCategoryDto {
  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}

export class RecentTransactionDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsDate()
  date: Date;
}

export class DashboardStatsDto {
  @ApiProperty()
  @IsNumber()
  totalCustomers: number;

  @ApiProperty()
  @IsNumber()
  activeCustomers: number;

  @ApiProperty()
  @IsNumber()
  totalRevenue: number;

  @ApiProperty()
  @IsNumber()
  monthlyRevenue: number;

  @ApiProperty()
  @IsNumber()
  totalTransactions: number;

  @ApiProperty({ type: [CustomerGrowthDto] })
  @IsArray()
  customerGrowth: CustomerGrowthDto[];

  @ApiProperty({ type: [RevenueByCategoryDto] })
  @IsArray()
  revenueByCategory: RevenueByCategoryDto[];

  @ApiProperty({ type: [RecentTransactionDto] })
  @IsArray()
  recentTransactions: RecentTransactionDto[];
}