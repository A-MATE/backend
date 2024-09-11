import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './controllers/organizations.controller';
import { Organization } from './entities/organization.entity';
import { OrganizationsRepository } from './repositories/organizations.repository';
import { OrganizationsService } from './services/organizations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepository],
})
export class OrganizationsModule {}
