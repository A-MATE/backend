import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Organization } from 'src/organizations/entities/organization.entity'; // Assurez-vous d'importer Organization
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('jsonb')
  logo: PhotoUrls;

  @Column({ nullable: true })
  ageGroup: TeamAgeCategory;

  @Column({ nullable: true })
  gender: TeamGender;

  @OneToMany(() => User, (user: User) => user.team)
  users: User[];

  @ManyToOne(() => Organization, (organization) => organization.teams)
  organization: Organization;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
