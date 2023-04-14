import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirQualityModule } from './air_quality/air_quality.module';
import { ScheduledTasksService } from './shared/scheduled-tasks.service';

import * as typeOrmConfig from './typeorm.config';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AirQualityModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, ScheduledTasksService],
})
export class AppModule {}
