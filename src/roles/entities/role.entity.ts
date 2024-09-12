import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '../@types/roles.types';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: RoleEnum;

  @Column({ nullable: false })
  description: string;
}
