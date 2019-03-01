import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class Flight {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsBoolean()
  delayed?: boolean;
}
