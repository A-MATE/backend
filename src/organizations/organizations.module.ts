import { Module } from '@nestjs/common';

import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationsRepository } from './repositories/organizations.repository';
import { OrganizationsService } from './services/organizations.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepository],
})
export class OrganizationsModule {}
