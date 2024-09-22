import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { DeleteResult, Repository } from 'typeorm';
import { OrganizationType } from '../@types/organization.types';
import { CreateOrganizationResponseDto } from '../dtos/create-organization.dto';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationsRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) {}

  async createOrganization(
    name: string,
    type: OrganizationType,
  ): Promise<CreateOrganizationResponseDto> {
    const newOrganization = this.repository.create({
      name,
      type,
    });
    return this.repository.save(newOrganization);
  }

  async updateOrganization(
    id: string,
    name?: string,
    type?: OrganizationType,
    logo?: PhotoUrls,
    isActive?: boolean,
  ): Promise<Organization> {
    const organization = await this.repository.findOneBy({ id });

    if (name) organization.name = name;
    if (type) organization.type = type;
    if (logo) organization.logo = logo;
    if (isActive !== undefined) organization.isActive = isActive;

    return this.repository.save(organization);
  }

  async getOrganizationById(id: string): Promise<Organization> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAllOrganizations(withDeleted: boolean): Promise<Organization[]> {
    if (withDeleted) {
      return this.repository.find({ withDeleted });
    }
    return this.repository.find();
  }

  async softDeleteOrganization(id: string): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }

  async hardDeleteOrganization(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
