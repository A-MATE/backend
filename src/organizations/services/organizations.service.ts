import { Injectable } from '@nestjs/common';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { OrganizationType } from '../@types/organization.types';
import {
  CreateOrganizationRequestDto,
  CreateOrganizationResponseDto,
} from '../dtos/create-organization.dto';
import { OrganizationsRepository } from '../repositories/organizations.repository';
import { ContactRequestDto } from '../dtos/contact.dto';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async createOrganization(
    dto: CreateOrganizationRequestDto,
  ): Promise<CreateOrganizationResponseDto> {
    const org = new Organization();
    org.name = dto.name;
    org.type = dto.type;
    org.logo = dto.logo;
    org.address = dto.address;
    org.contact = {
      email: dto.contact?.email,
      phone: dto.contact?.phone,
      firstName: dto.contact?.firstName,
      lastName: dto.contact?.lastName,
    };

    const saved = await this.organizationsRepository.createOrganization(org);

    return {
      id: saved.id,
      name: saved.name,
      type: saved.type,
      logo: saved.logo,
      address: saved.address,
      contact: saved.contact,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
      isActive: saved.isActive,
      deletedAt: saved.deletedAt,
    };
  }

  async updateOrganization(
    id: string,
    name?: string,
    type?: OrganizationType,
    logo?: PhotoUrls,
    address?: string,
    contact?: ContactRequestDto,
    isActive?: boolean,
  ) {
    return await this.organizationsRepository.updateOrganization(
      id,
      name,
      type,
      logo,
      address,
      contact,
      isActive,
    );
  }

  async getOrganizationById(id: string) {
    return await this.organizationsRepository.getOrganizationById(id);
  }

  async getAllOrganizations(withDeleted: boolean) {
    return await this.organizationsRepository.getAllOrganizations(withDeleted);
  }

  async softDeleteOrganization(id: string) {
    return await this.organizationsRepository.softDeleteOrganization(id);
  }

  async hardDeleteOrganization(id: string) {
    return await this.organizationsRepository.hardDeleteOrganization(id);
  }
}
