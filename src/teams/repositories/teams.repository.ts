import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Organization } from 'src/organizations/entities/organization.entity';
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
    logo: PhotoUrls,
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
    organization: Organization,
  ): Promise<Team> {
    const newTeam = this.repository.create({
      name,
      description,
      logo,
      ageGroup,
      gender,
      organization,
    });
    return this.repository.save(newTeam);
  }

  async updateTeam(
    id: string,
    name: string,
    description: string,
    logo: PhotoUrls,
    ageGroup: TeamAgeCategory,
    gender: TeamGender,
  ) {
    const updatedTeam = await this.repository.findOneBy({ id });

    if (name) updatedTeam.name = name;
    if (description) updatedTeam.description = description;
    if (logo) updatedTeam.logo = logo;
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

  async getTeamById(id: string): Promise<Team> {
    return this.repository.findOneBy({ id });
  }

  async hardDeleteTeamById(id: string): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }

  async softDeleteTeamById(id: string): Promise<DeleteResult> {
    return this.repository.softDelete({ id });
  }
}
