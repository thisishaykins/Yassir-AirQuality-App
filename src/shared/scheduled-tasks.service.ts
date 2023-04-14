import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { AirQualityService } from '../air_quality/air_quality.service';


@Injectable()
export class ScheduledTasksService {
  constructor(
    private readonly airQualityService: AirQualityService,
  ) {}
  private readonly logger = new Logger(ScheduledTasksService.name);
  // private readonly airQualityService = new AirQualityService();

  // List scheduled jobs below
  @Cron('*/60 * * * * *')
  async handleCron() {
    try {
     
      const response = await this.airQualityService.createAirQuality(
        '48.856613',
        '2.352222',
      );
      this.logger.debug(
        'airQualityService cron called at every 60sec with response => ',
        response,
      );
    } catch (error) {
      this.logger.debug(
        'airQualityService cron called and return error exception => ',
        error,
      );
    }
    
  }
}
