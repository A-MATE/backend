import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  score: string;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];
}
