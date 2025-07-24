import { Module } from '@nestjs/common';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrmRepository } from './crm.repository';
import { CustomerResolver } from 'src/graphql/resolvers/customer.resolver';

@Module({
  controllers: [CrmController],
  providers: [
    CrmService,
    CrmRepository,
    PrismaService,
    CustomerResolver
  ],
})
export class CrmModule {}