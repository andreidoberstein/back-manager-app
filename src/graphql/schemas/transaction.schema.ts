import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field()
  description: string;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}