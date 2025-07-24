import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class CustomerGrowth {
  @Field()
  month: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class RevenueByCategory {
  @Field()
  category: string;

  @Field(() => Float)
  amount: number;
}

@ObjectType()
export class RecentTransaction {
  @Field(() => Int)
  id: number;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field(() => Float)
  amount: number;

  @Field()
  type: string;

  @Field()
  date: Date;
}

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  totalCustomers: number;

  @Field(() => Int)
  activeCustomers: number;

  @Field(() => Float)
  totalRevenue: number;

  @Field(() => Float)
  monthlyRevenue: number;

  @Field(() => Int)
  totalTransactions: number;

  @Field(() => [CustomerGrowth])
  customerGrowth: CustomerGrowth[];

  @Field(() => [RevenueByCategory])
  revenueByCategory: RevenueByCategory[];

  @Field(() => [RecentTransaction])
  recentTransactions: RecentTransaction[];
}