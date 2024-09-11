import { Injectable } from '@nestjs/common';
import { LogoUrls } from 'src/common/@types/logo-urls.type';
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
    logo?: LogoUrls,
  ): Promise<CreateOrganizationResponseDto> {
    return await this.organizationsRepository.createOrganization(
      name,
      type,
      logo,
    );
  }

  async updateOrganization(
    id: number,
    name?: string,
    type?: OrganizationType,
    logo?: LogoUrls,
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

  async getOrganizationById(id: number) {
    return await this.organizationsRepository.getOrganizationById(id);
  }

  async getAllOrganizations(withDeleted: boolean) {
    return await this.organizationsRepository.getAllOrganizations(withDeleted);
  }

  async softDeleteOrganization(id: number) {
    return await this.organizationsRepository.softDeleteOrganization(id);
  }

  async hardDeleteOrganization(id: number) {
    return await this.organizationsRepository.hardDeleteOrganization(id);
  }
}
