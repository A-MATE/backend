import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationType } from '../@types/organization.types';

@Entity()
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

  @Column('jsonb')
  logo: PhotoUrls;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;
}
