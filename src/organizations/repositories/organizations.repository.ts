import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizationType } from '../@types/organization.types';

@Injectable()
export class OrganizationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(
    name: string,
    type: OrganizationType,
    address: string,
    logo?: string,
  ) {
    return this.prisma.organization.create({
      data: { name, type, address, ...(logo && { logo }) },
    });
  }

  async updateOrganization(
    id: string,
    name?: string,
    type?: OrganizationType,
    logo?: string,
    isActive?: boolean,
  ) {
    const existing = await this.prisma.organization.findUnique({
      where: { id },
    });
    if (!existing)
      throw new NotFoundException(`Organization with ID ${id} not found`);

    return this.prisma.organization.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(logo && { logo }),
        ...(isActive !== undefined && { isActive }),
      },
    });
  }

  async getOrganizationById(id: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id },
      include: { contact: true },
    });
    if (!org)
      throw new NotFoundException(`Organization with ID ${id} not found`);
    return org;
  }

  async getAllOrganizations(withDeleted: boolean) {
    return this.prisma.organization.findMany({
      where: withDeleted ? {} : { deletedAt: null },
      include: { contact: true },
    });
  }

  async softDeleteOrganization(id: string) {
    return this.prisma.organization.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDeleteOrganization(id: string) {
    return this.prisma.organization.delete({ where: { id } });
  }
}
