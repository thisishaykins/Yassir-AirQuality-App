import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';

export class AirQualityFilterDto {
  @ApiProperty({required: false})
  // @IsNotEmpty()
  @IsOptional()
  @IsDate()
  date: Date;
}
