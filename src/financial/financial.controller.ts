import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('financial')
@Controller('financial')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('transactions')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  create(@Body() createTransactionDto: CreateTransactionDto, @User() user) {
    return this.financialService.create(createTransactionDto, user.id);
  }

  @Get('transactions')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'List of transactions' })
  findAll(@User() user) {
    return this.financialService.findAll(user.id);
  }

  @Get('transactions/:id')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction details' })
  findOne(@Param('id') id: string, @User() user) {
    return this.financialService.findOne(+id, user.id);
  }

  @Patch('transactions/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully' })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto, @User() user) {
    return this.financialService.update(+id, updateTransactionDto, user.id);
  }

  @Delete('transactions/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  remove(@Param('id') id: string, @User() user) {
    return this.financialService.remove(+id, user.id);
  }
}