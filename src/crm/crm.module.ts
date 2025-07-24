import { Module } from '@nestjs/common';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrmRepository } from './crm.repository';

@Module({
  controllers: [CrmController],
  providers: [CrmService, CrmRepository, PrismaService],
})
export class CrmModule {}