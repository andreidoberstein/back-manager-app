import { Injectable } from '@nestjs/common';
import { DashboardStatsDto, CustomerGrowthDto, RevenueByCategoryDto, RecentTransactionDto } from './dto/dashboard-stats.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardRepository {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: number): Promise<DashboardStatsDto> {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30));
    const sixMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const [totalCustomers, activeCustomers, totalRevenueResult, monthlyRevenueResult, totalTransactions, customerGrowthData, revenueByCategoryData, recentTransactionsData] = await Promise.all([
      // Total de clientes
      this.prisma.customer.count({ where: { userId } }),

      // Clientes ativos (com transações nos últimos 30 dias)
      this.prisma.customer.count({
        where: {
          userId,
          transactions: { some: { createdAt: { gte: thirtyDaysAgo } } },
        },
      }),

      // Receita total
      this.prisma.transaction.aggregate({
        where: { userId },
        _sum: { amount: true },
      }),

      // Receita do último mês
      this.prisma.transaction.aggregate({
        where: { userId, createdAt: { gte: startOfMonth } },
        _sum: { amount: true },
      }),

      // Total de transações
      this.prisma.transaction.count({ where: { userId } }),

      // Crescimento de clientes (últimos 6 meses, manual)
      this.prisma.customer.findMany({
        where: { userId, createdAt: { gte: sixMonthsAgo } },
        select: { createdAt: true },
      }).then(customers => {
        const growth = customers.reduce((acc, customer) => {
          const monthYear = customer.createdAt.toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
          acc[monthYear] = (acc[monthYear] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        return Object.entries(growth).map(([month, count]) => ({ month, count } as CustomerGrowthDto));
      }),

      // Receita por categoria (manual)
      this.prisma.transaction.findMany({
        where: { userId },
        select: { category: true, amount: true },
      }).then(transactions => {
        const categories = transactions.reduce((acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + (t.amount || 0);
          return acc;
        }, {} as Record<string, number>);
        return Object.entries(categories).map(([category, amount]) => ({ category, amount } as RevenueByCategoryDto));
      }),

      // Transações recentes
      this.prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, description: true, amount: true, category: true, createdAt: true },
      }).then(transactions => transactions.map(t => ({
        id: t.id,
        description: t.description,
        category: t.category || t.description, // Fallback para descrição se category for nulo
        amount: t.amount || 0,
        type: t.amount >= 0 ? 'INCOME' : 'EXPENSE',
        date: t.createdAt,
      } as RecentTransactionDto))),
    ]);

    const totalRevenue = totalRevenueResult._sum.amount || 0;
    const monthlyRevenue = monthlyRevenueResult._sum.amount || 0;

    return {
      totalCustomers,
      activeCustomers,
      totalRevenue,
      monthlyRevenue,
      totalTransactions,
      customerGrowth: customerGrowthData,
      revenueByCategory: revenueByCategoryData,
      recentTransactions: recentTransactionsData,
    } as DashboardStatsDto;
  }
}