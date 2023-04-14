import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AirQualityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  latitude: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  longitude: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pollution_ts: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pollution_aqius: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pollution_mainus: string = '';

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pollution_aqicn: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pollution_maincn: string = '';
}
