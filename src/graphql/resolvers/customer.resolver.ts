import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CrmService } from '../../crm/crm.service';
import { CreateCustomerDto } from '../../crm/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../crm/dto/update-customer.dto';
import { Customer } from '../../crm/entities/customer.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Resolver(() => Customer)
@UseGuards(JwtAuthGuard)
export class CustomerResolver {
  constructor(private crmService: CrmService) {}

  @Mutation(() => Customer)
  async createCustomer(
    @Args('input') input: CreateCustomerDto,
    @Context() context,
  ) {
    return this.crmService.create(input, context.req.user.id);
  }

  @Query(() => [Customer])
  async customers(@Context() context) {
    return this.crmService.findAll(context.req.user.id);
  }
}