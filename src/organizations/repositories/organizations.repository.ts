import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogoUrls } from 'src/common/@types/logo-urls.type';
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
    logo?: LogoUrls,
  ): Promise<CreateOrganizationResponseDto> {
    const newOrganization = this.repository.create({
      name,
      type,
      logo,
    });
    return this.repository.save(newOrganization);
  }

  async updateOrganization(
    id: number,
    name?: string,
    type?: OrganizationType,
    logo?: LogoUrls,
    isActive?: boolean,
  ): Promise<Organization> {
    const organization = await this.repository.findOneBy({ id });

    if (name) organization.name = name;
    if (type) organization.type = type;
    if (logo) organization.logo = logo;
    if (isActive !== undefined) organization.isActive = isActive;

    return this.repository.save(organization);
  }

  async getOrganizationById(id: number): Promise<Organization> {
    return await this.repository.findOne({ where: { id } });
  }

  async getAllOrganizations(withDeleted: boolean): Promise<Organization[]> {
    if (withDeleted) {
      return this.repository.find({ withDeleted });
    }
    return this.repository.find();
  }

  async softDeleteOrganization(id: number): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }

  async hardDeleteOrganization(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
