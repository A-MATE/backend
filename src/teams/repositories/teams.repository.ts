import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';

@Injectable()
export class TeamsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTeam(
    name: string,
    description: string,
    logo: string,
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
    organizationId: string,
  ) {
    return this.prisma.team.create({
      data: {
        name,
        description,
        logo,
        ageGroup,
        gender,
        organizationId,
      },
    });
  }

  async updateTeam(
    id: string,
    name?: string,
    description?: string,
    logo?: string,
    ageGroup?: TeamAgeCategory,
    gender?: TeamGender,
  ) {
    const existing = await this.prisma.team.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Team with ID ${id} not found`);

    return this.prisma.team.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(logo && { logo }),
        ...(ageGroup && { ageGroup }),
        ...(gender && { gender }),
      },
    });
  }

  async getAllTeams(withDeleted = false) {
    return this.prisma.team.findMany({
      where: withDeleted ? {} : { deletedAt: null },
    });
  }

  async getTeamById(id: string) {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) throw new NotFoundException(`Team with ID ${id} not found`);
    return team;
  }

  async hardDeleteTeamById(id: string) {
    return this.prisma.team.delete({ where: { id } });
  }

  async softDeleteTeamById(id: string) {
    return this.prisma.team.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
