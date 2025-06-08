import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { DeleteResult, Repository } from 'typeorm';
import { OrganizationType } from '../@types/organization.types';
import { Organization } from '../entities/organization.entity';
import { ContactRequestDto } from '../dtos/contact.dto';
import { UpdateOrganizationResponseDto } from '../dtos/update-organization.dto';

@Injectable()
export class OrganizationsRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) {}
  async createOrganization(organization: Organization): Promise<Organization> {
    return await this.repository.save(organization);
  }

  async updateOrganization(
    id: string,
    name?: string,
    type?: OrganizationType,
    logo?: PhotoUrls,
    address?: string,
    contact?: ContactRequestDto,
    isActive?: boolean,
  ): Promise<UpdateOrganizationResponseDto> {
    const organization = await this.repository.findOneBy({ id });

    if (name) organization.name = name;
    if (type) organization.type = type;
    if (logo) organization.logo = logo;
    if (isActive !== undefined) organization.isActive = isActive;
    if (address) organization.address = address;
    if (contact)
      organization.contact = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
      };

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
