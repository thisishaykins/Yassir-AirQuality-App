import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class AirQualityQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  latitude: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  longitude: string = '';
}
