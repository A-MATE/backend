import { Injectable } from '@nestjs/common';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { OrganizationType } from '../@types/organization.types';
import { CreateOrganizationResponseDto } from '../dtos/create-organization.dto';
import { OrganizationsRepository } from '../repositories/organizations.repository';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async createOrganization(
    name: string,
    type: OrganizationType,
  ): Promise<CreateOrganizationResponseDto> {
    return await this.organizationsRepository.createOrganization(name, type);
  }

  async updateOrganization(
    id: string,
    name?: string,
    type?: OrganizationType,
    logo?: PhotoUrls,
    isActive?: boolean,
  ) {
    return await this.organizationsRepository.updateOrganization(
      id,
      name,
      type,
      logo,
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
