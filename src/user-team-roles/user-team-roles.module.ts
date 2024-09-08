import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamRolesController } from './controllers/user-team-roles.controller';
import { UserTeamRole } from './entities/user-team-role';
import { UserTeamRolesRepository } from './repositories/user-team-roles.repository';
import { UserTeamRolesService } from './services/user-team-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeamRole])],
  controllers: [UserTeamRolesController],
  providers: [UserTeamRolesService, UserTeamRolesRepository],
})
export class UserTeamRolesModule {}
