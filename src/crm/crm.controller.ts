import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CrmService } from './crm.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('crm')
@Controller('crm')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post('customers')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  create(@Body() createCustomerDto: CreateCustomerDto, @User() user) {
    return this.crmService.create(createCustomerDto, user.id);
  }

  @Get('customers')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of customers' })
  findAll(@User() user) {
    return this.crmService.findAll(user.id);
  }

  @Get('customers/:id')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer details' })
  findOne(@Param('id') id: string, @User() user) {
    return this.crmService.findOne(+id, user.id);
  }

  @Patch('customers/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully' })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto, @User() user) {
    return this.crmService.update(+id, updateCustomerDto, user.id);
  }

  @Delete('customers/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({ status: 200, description: 'Customer deleted successfully' })
  remove(@Param('id') id: string, @User() user) {
    return this.crmService.remove(+id, user.id);
  }
}