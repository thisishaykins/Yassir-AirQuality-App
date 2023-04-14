import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AirQualityService } from './air_quality.service';
import { AirQualityQueryDto } from './dto/air_quality_query.dto';
import { AirQualityFilterDto } from './dto/air_quality_filter.dto';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @ApiOperation({ summary: 'Get air quality' })
  @ApiResponse({
    description:
      'To get current Air Quality details for a particular location using latitude and longitude',
  })
  @Get()
  getAirQualityIndex(@Query() airQualityQuery: AirQualityQueryDto) {
    return this.airQualityService.getAirQuality(airQualityQuery);
  }

  @ApiOperation({ summary: 'Filter air qualities' })
  @ApiResponse({
    description:
      'To get all Air Qualities within a particular date...',
  })
  @Get('/search')
  filterAirQualities(@Query() airQualityFilterDto: AirQualityFilterDto) {
    return this.airQualityService.filterAirQualities(airQualityFilterDto);
  }
}
