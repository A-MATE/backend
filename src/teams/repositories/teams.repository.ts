import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';
import { TeamAgeCategory } from '../@types/team-age-category.types';
import { TeamGender } from '../@types/team-gender.types';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamsRepository {
  constructor(
    @InjectRepository(Team)
    private readonly repository: Repository<Team>,
  ) {}

  async createTeam(
    name: string,
    description: string,
    logos: string[],
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ): Promise<Team> {
    const newTeam = this.repository.create({
      name,
      description,
      logos,
      ageGroup,
      gender,
    });
    return this.repository.save(newTeam);
  }

  async updateTeam(
    teamId: number,
    name: string,
    description: string,
    logos: string[],
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ) {
    const updatedTeam = await this.repository.findOneBy({ id: teamId });

    if (name) updatedTeam.name = name;
    if (description) updatedTeam.description = description;
    if (logos) updatedTeam.logos = logos;
    if (ageGroup) updatedTeam.ageGroup = ageGroup;
    if (gender) updatedTeam.gender = gender;

    return this.repository.save(updatedTeam);
  }

  async getAllTeams(withDeleted: boolean): Promise<Team[]> {
    if (withDeleted) {
      return this.repository.find({ withDeleted });
    }
    return this.repository.find();
  }

  async getTeamById(id: number): Promise<Team> {
    return this.repository.findOneBy({ id });
  }

  async hardDeleteTeamById(id: number): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async softDeleteTeamById(id: number): Promise<DeleteResult> {
    return this.repository.softDelete({ id });
  }
}
