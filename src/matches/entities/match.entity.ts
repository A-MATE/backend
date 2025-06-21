import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { MatchStatus } from '../@types/match-status.enum';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teamId: string;

  @Column()
  organizationId: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  locationId: string;

  @Column()
  homeTeamId: string;

  @Column()
  awayTeamId: string;

  @Column({ nullable: true })
  homeTeamScore: number;

  @Column({ nullable: true })
  awayTeamScore: number;

  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.SCHEDULED,
  })
  status: MatchStatus;

  @Column()
  sport: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
