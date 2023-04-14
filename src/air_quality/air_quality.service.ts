import {
  HttpException,
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import axios from 'axios';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { AirQualityQueryDto } from './dto/air_quality_query.dto';
import { AirQualityFilterDto } from './dto/air_quality_filter.dto';
import { AirQualityRepository } from './repository/air_quality.repository';
import { AirQualityDto } from './dto/air_quality.dto';
import { AirQuality } from './entities/air_quality.entity';

@Injectable()
export class AirQualityService {
  private logger = new Logger(AirQualityService.name);

  constructor(
    @InjectRepository(AirQuality)
    private repository: Repository<AirQuality>,
    @InjectRepository(AirQualityRepository)
    private todoRepository: AirQualityRepository,
  ) {}

  logMessage(function_name: string, error: string, code: number) {
    return `Error in function (${function_name}) with error code ${code} is ${error}`;
  }

  // Gets & return NearCity pollution data from IQAIR API
  async getAirQuality(airQualityQuery: AirQualityQueryDto) {
    try {
      const response = await axios({
        method: 'GET',
        data: null,
        url: `${process.env.IQAIR_API_URL}/nearest_city?lat=${airQualityQuery.latitude}&lon=${airQualityQuery.longitude}&key=${process.env.IQAIR_API_KEY}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.data.status == 'success') {
        return {
          Result: {
            Pollution: response.data.data.current.pollution,
          },
        };
      } else {
        return response.data;
      }
    } catch (error) {
      this.logger.error(
        this.logMessage(
          'getAirQuality',
          error.response.statusText,
          error.response.status,
        ),
      );

      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  // Gets NearCity data from IQAIR API
  async getNearCity(latitude: string, longitude: string) {
    try {
      const response = await axios({
        method: 'GET',
        data: null,
        url: `${process.env.IQAIR_API_URL}/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.IQAIR_API_KEY}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error(
        this.logMessage(
          'getAirQuality',
          error.response ? error.response.statusText : error,
          error.response ? error.response.status : 408,
        ),
      );

      throw error;
    }
  }

  // create a airQuality item in DB
  async createAirQuality(
    latitude: string,
    longitude: string,
  ): Promise<AirQuality> {
    try {
      const response = await this.getNearCity(latitude, longitude);

      if (response.status == 'success') {
        // create an AirQuality Object
        const airQuality: AirQuality = new AirQuality();

        airQuality.city = response.data.city;
        airQuality.latitude = response.data.location.coordinates[1];
        airQuality.longitude = response.data.location.coordinates[0];
        airQuality.pollution_ts = new Date(response.data.current.pollution.ts);
        airQuality.pollution_aqius = response.data.current.pollution.aqius;
        airQuality.pollution_mainus = response.data.current.pollution.mainus;
        airQuality.pollution_aqicn = response.data.current.pollution.aqicn;
        airQuality.pollution_maincn = response.data.current.pollution.maincn;

        return await this.repository.save(airQuality);
      } else {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  // Filter all records by date... Returns data from DB
  async filterAirQualities(airQualityFilterDto: AirQualityFilterDto) {
    try {
      return this.repository.find({
        where: {
          // pollution_ts: Between(
          //   new Date(airQualityFilterDto.date),
          //   new Date(airQualityFilterDto.date),
          // ),
        },
        order: { id: 'DESC' },
        take: 100,
      });
    } catch (error) {
      this.logger.error(
        this.logMessage(
          'filterAirQualities',
          error.response ? error.response.statusText : error,
          error.response ? error.response.status : 500,
        ),
      );

      throw error;
    }
  }
}
