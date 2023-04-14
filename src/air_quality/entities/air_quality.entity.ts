import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AirQuality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: BigInt;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  latitude: string;

  @Column({ type: 'varchar' })
  longitude: string;

  @Column()
  pollution_ts: Date;

  @Column({ type: 'integer' })
  pollution_aqius: number;

  @Column({ type: 'varchar' })
  pollution_mainus: string;

  @Column({ type: 'integer' })
  pollution_aqicn: number;

  @Column({ type: 'varchar' })
  pollution_maincn: string;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
