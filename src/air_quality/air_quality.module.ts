import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AirQualityRepository } from './repository/air_quality.repository';
import { AirQualityController } from './air_quality.controller';
import { AirQualityService } from './air_quality.service';
import { AirQuality } from './entities/air_quality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AirQuality, AirQualityRepository])],
  controllers: [AirQualityController],
  providers: [AirQualityService],
  exports: [AirQualityService],
})
export class AirQualityModule {}
