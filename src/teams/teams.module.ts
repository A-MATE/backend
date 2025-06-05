import { Module } from '@nestjs/common';

import { TeamsController } from './controllers/teams.controller';
import { TeamsService } from './services/teams.service';
import { TeamsRepository } from './repositories/teams.repository';

import { OrganizationsRepository } from 'src/organizations/repositories/organizations.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository, OrganizationsRepository],
})
export class TeamsModule {}
