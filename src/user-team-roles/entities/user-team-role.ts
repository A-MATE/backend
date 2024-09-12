import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userId', 'teamId', 'roleId'])
export class UserTeamRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  teamId: string;

  @Column()
  roleId: string;
}
