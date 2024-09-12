import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeamsController } from './controllers/user-teams.controller';
import { UserTeam } from './entities/user-team.entity';
import { UserTeamsRepository } from './repositories/user-teams.repository';
import { UserTeamsService } from './services/user-teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeam])],
  controllers: [UserTeamsController],
  providers: [UserTeamsService, UserTeamsRepository],
})
export class UserTeamsModule {}
