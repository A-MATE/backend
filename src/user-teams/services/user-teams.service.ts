import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserTeam } from '../entities/user-team.entity';
import { UserTeamsRepository } from '../repositories/user-teams.repository';

@Injectable()
export class UserTeamsService {
  constructor(private readonly userTeamsRepository: UserTeamsRepository) {}

  async addUserToTeam(userId: string, teamId: string): Promise<UserTeam> {
    return this.userTeamsRepository.addUserToTeam(userId, teamId);
  }

  async getUsersByteamId(teamId: string): Promise<UserTeam[]> {
    return this.userTeamsRepository.getUsersByteamId(teamId);
  }

  async softDeleteUserFromTeam(
    userId: string,
    teamId: string,
  ): Promise<DeleteResult> {
    return this.userTeamsRepository.softDeleteUserFromTeam(userId, teamId);
  }

  async hardDeleteUserFromTeam(
    userId: string,
    teamId: string,
  ): Promise<DeleteResult> {
    return this.userTeamsRepository.hardDeleteUserFromTeam(userId, teamId);
  }
}
