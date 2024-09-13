import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organizations/entities/organization.entity';
import { OrganizationsRepository } from 'src/organizations/repositories/organizations.repository';
import { TeamsController } from './controllers/teams.controller';
import { Team } from './entities/team.entity';
import { TeamsRepository } from './repositories/teams.repository';
import { TeamsService } from './services/teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Organization])],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository, OrganizationsRepository],
})
export class TeamsModule {}
