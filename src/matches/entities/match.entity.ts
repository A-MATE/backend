import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  teamId: string;

  @Column({ nullable: false })
  organizationId: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  locationId: string;

  @Column({ nullable: false })
  homeTeamId: string;

  @Column({ nullable: false })
  awayTeamId: string;

  @Column({ nullable: true })
  homeTeamScore: number;

  @Column({ nullable: true })
  awayTeamScore: number;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: false })
  sport: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
