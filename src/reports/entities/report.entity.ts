import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Report {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  data: any;

  @Field(() => Int)
  userId: number;

  @Field()
  createdAt: Date;
}