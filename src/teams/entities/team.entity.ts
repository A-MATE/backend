import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  logos: string[];

  @Column({ nullable: true })
  ageGroup: TeamAgeCategory;

  @Column({ nullable: true })
  gender: TeamGender;
}
