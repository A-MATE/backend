import { ApiProperty } from '@nestjs/swagger';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

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
