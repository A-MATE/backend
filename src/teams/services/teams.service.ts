import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { OrganizationsRepository } from 'src/organizations/repositories/organizations.repository';
import { DeleteResult } from 'typeorm';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';
import { CreateTeamResponseDto } from '../dtos/create-team.dto';
import { GetAllTeamsResponseDto } from '../dtos/get-all-teams.dto';
import { TeamsRepository } from '../repositories/teams.repository';
import { GetTeamByIdResponseDto } from '../dtos/get-one-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly organizationsRepository: OrganizationsRepository,
  ) {}

  async createTeam(
    name: string,
    description: string,
    logo: PhotoUrls,
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
    organizationId: string,
  ): Promise<CreateTeamResponseDto> {
    const organization =
      await this.organizationsRepository.getOrganizationById(organizationId);
    if (!organization) {
      throw new NotFoundException(
        `Organization with ID ${organizationId} not found`,
      );
    }

    const team = await this.teamsRepository.createTeam(
      name,
      description,
      logo,
      ageGroup,
      gender,
      organization,
    );

    return plainToInstance(CreateTeamResponseDto, {
      ...team,
      organizationId: organization.id,
    });
  }

  async updateTeam(
    teamId: string,
    name: string,
    description: string,
    logo: PhotoUrls,
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ): Promise<CreateTeamResponseDto> {
    const team = await this.teamsRepository.updateTeam(
      teamId,
      name,
      description,
      logo,
      ageGroup,
      gender,
    );

    return {
      ...team,
      organizationId: team.organization.id,
    };
  }

  async getAllTeams(
    withSoftDeleted: boolean = false,
  ): Promise<GetAllTeamsResponseDto[]> {
    const teams = await this.teamsRepository.getAllTeams(withSoftDeleted);

    return teams.map((team) =>
      plainToInstance(GetAllTeamsResponseDto, {
        ...team,
        organizationId: team.organization.id,
      }),
    );
  }

  async getTeamById(id: string): Promise<GetTeamByIdResponseDto> {
    const team = await this.teamsRepository.getTeamById(id);
    if (!team) {
      throw new NotFoundException(`Team not found for team with ID ${id}`);
    }

    return plainToInstance(GetTeamByIdResponseDto, {
      ...team,
      organizationId: team.organization.id,
    });
  }

  async hardDeleteTeamById(id: string): Promise<DeleteResult> {
    return await this.teamsRepository.hardDeleteTeamById(id);
  }

  async softDeleteTeamById(id: string): Promise<DeleteResult> {
    return await this.teamsRepository.softDeleteTeamById(id);
  }
}
