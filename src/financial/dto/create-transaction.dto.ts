import { IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  category?: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  customerId: number;
}
