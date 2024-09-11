import { Injectable } from '@nestjs/common';
import { LogoUrls } from 'src/common/@types/logo-urls.type';
import { DeleteResult } from 'typeorm';
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
    logo: LogoUrls,
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ): Promise<CreateTeamResponseDto> {
    return await this.teamsRepository.createTeam(
      name,
      description,
      logo,
      ageGroup,
      gender,
    );
  }

  async updateTeam(
    teamId: number,
    name: string,
    description: string,
    logo: LogoUrls,
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ): Promise<CreateTeamResponseDto> {
    return await this.teamsRepository.updateTeam(
      teamId,
      name,
      description,
      logo,
      ageGroup,
      gender,
    );
  }
  async getAllTeams(
    withSoftDeleted: boolean = false,
  ): Promise<GetAllTeamsResponseDto[]> {
    return await this.teamsRepository.getAllTeams(withSoftDeleted);
  }

  async getTeamById(id: number) {
    return await this.teamsRepository.getTeamById(id);
  }

  async hardDeleteTeamById(id: number): Promise<DeleteResult> {
    return await this.teamsRepository.hardDeleteTeamById(id);
  }
  async softDeleteTeamById(id: number): Promise<DeleteResult> {
    return await this.teamsRepository.softDeleteTeamById(id);
  }
}
