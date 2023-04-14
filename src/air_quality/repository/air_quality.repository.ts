import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

import { AirQualityDto } from "../dto/air_quality.dto";
import { AirQuality } from "../entities/air_quality.entity";

@EntityRepository(AirQuality)
export class AirQualityRepository extends Repository<AirQuality> {
  async createAirQuality(airQualityDto: AirQualityDto): Promise<AirQuality> {
    try {
      const {
        city,
        latitude,
        longitude,
        pollution_ts,
        pollution_aqius,
        pollution_mainus,
        pollution_aqicn,
        pollution_maincn,
      } = airQualityDto;

      const airQuality = new AirQuality();

      airQuality.city = city;
      airQuality.latitude = latitude;
      airQuality.longitude = longitude;
      airQuality.pollution_ts = pollution_ts;
      airQuality.pollution_aqius = pollution_aqius;
      airQuality.pollution_mainus = pollution_mainus;
      airQuality.pollution_aqicn = pollution_aqicn;
      airQuality.pollution_maincn = pollution_maincn;

      await airQuality.save();

      return airQuality;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async filterByDate(date: string) {
    const query = this.createQueryBuilder();

    query.where('created_at = :dateVal', { dateVal: date });
    query.orderBy('created_at', 'DESC');

    const airQualities = await query.getMany();
    return airQualities;
  }
}

