import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userId', 'teamId', 'roleId'])
export class UserTeamRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  teamId: number;

  @Column()
  roleId: number;
}
