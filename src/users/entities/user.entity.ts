import { ApiProperty } from '@nestjs/swagger';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../common/@types/user-role.enum';

@Entity('users')
@Unique(['email', 'team'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  role: UserRole;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'organizationId' })
  @ApiProperty({ type: () => Organization })
  organization?: Organization;

  @ManyToOne(() => Team, (team) => team.users, { nullable: true })
  @JoinColumn({ name: 'teamId' })
  @ApiProperty({ type: () => Team })
  team?: Team;

  @Column({ nullable: true })
  @ApiProperty()
  firstName?: string;

  @Column({ nullable: true })
  @ApiProperty()
  lastName?: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty()
  birthDate?: Date;

  @Column({ nullable: true })
  @ApiProperty()
  bio?: string;

  @Column('jsonb', { nullable: true })
  @ApiProperty()
  avatar?: PhotoUrls;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @ApiProperty()
  deletedAt?: Date | null;

  @Column({ default: true })
  @ApiProperty()
  isActive: boolean;
}
