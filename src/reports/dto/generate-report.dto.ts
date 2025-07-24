import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateReportDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsObject()
  data: object;
}