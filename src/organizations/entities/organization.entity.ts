import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationType } from '../@types/organization.types';

export class Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

@Entity('organizations')
@Unique(['name'])
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: OrganizationType,
  })
  type: OrganizationType;

  @Column({ type: 'jsonb', nullable: true })
  logo: PhotoUrls;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'jsonb', nullable: true })
  contact: Contact;

  @OneToMany(() => Team, (team) => team.organization)
  teams: Team[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;
}
