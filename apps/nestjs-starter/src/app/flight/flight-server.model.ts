import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Flight } from '@flight-app/shared';

export class FlightServer implements Flight {
  @ApiProperty({
    type: Number,
    description: 'Starts with 0. Increments automatically when new flights will be created'
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  from: string;

  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  delayed?: boolean;
}
