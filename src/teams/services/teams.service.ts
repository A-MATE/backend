import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrganizationsRepository } from 'src/organizations/repositories/organizations.repository';
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
    logo: string,
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
      organizationId,
    );

    return plainToInstance(CreateTeamResponseDto, team);
  }

  async updateTeam(
    teamId: string,
    name?: string,
    description?: string,
    logo?: string,
    ageGroup?: TeamAgeCategory,
    gender?: TeamGender,
  ): Promise<CreateTeamResponseDto> {
    const team = await this.teamsRepository.updateTeam(
      teamId,
      name,
      description,
      logo,
      ageGroup,
      gender,
    );

    return plainToInstance(CreateTeamResponseDto, team);
  }

  async getAllTeams(
    withSoftDeleted = false,
  ): Promise<GetAllTeamsResponseDto[]> {
    const teams = await this.teamsRepository.getAllTeams(withSoftDeleted);
    return teams.map(team => plainToInstance(GetAllTeamsResponseDto, team));
  }

  async getTeamById(id: string): Promise<CreateTeamResponseDto> {
    const team = await this.teamsRepository.getTeamById(id);
    if (!team) {
      throw new NotFoundException(`Team not found for ID ${id}`);
    }

    return plainToInstance(CreateTeamResponseDto, team);
  }

  async softDeleteTeamById(id: string): Promise<GetTeamByIdResponseDto> {
    const team = await this.teamsRepository.softDeleteTeamById(id);
    return plainToInstance(GetTeamByIdResponseDto, team);
  }

  async hardDeleteTeamById(id: string): Promise<GetTeamByIdResponseDto> {
    const team = await this.teamsRepository.hardDeleteTeamById(id);
    return plainToInstance(GetTeamByIdResponseDto, team);
  }
}
