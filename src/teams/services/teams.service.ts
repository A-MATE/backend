import { Injectable } from '@nestjs/common';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';
import { CreateTeamResponseDto } from '../dtos/create-team.dto';
import { GetAllTeamsResponseDto } from '../dtos/get-all-teams.dto';
import { TeamsRepository } from '../repositories/teams.repository';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async createTeam(
    name: string,
    description: string,
    logos: string[],
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ): Promise<CreateTeamResponseDto> {
    return await this.teamsRepository.createTeam(
      name,
      description,
      logos,
      ageGroup,
      gender,
    );
  }

  async updateTeam(
    teamId: number,
    name: string,
    description: string,
    logos: string[],
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ): Promise<CreateTeamResponseDto> {
    return await this.teamsRepository.updateTeam(
      teamId,
      name,
      description,
      logos,
      ageGroup,
      gender,
    );
  }
  async getAllTeams(): Promise<GetAllTeamsResponseDto[]> {
    return await this.teamsRepository.getAllTeams();
  }
  async getTeamById(id: number) {}
  async deleteTeamById(id: number) {}
  async softDeleteTeamById(id: number) {}
}
