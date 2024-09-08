import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './controllers/teams.controller';
import { Team } from './entities/team.entity';
import { TeamsRepository } from './repositories/teams.repository';
import { TeamsService } from './services/teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
})
export class TeamsModule {}
