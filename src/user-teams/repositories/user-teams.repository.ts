import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserTeam } from '../entities/user-team.entity';

@Injectable()
export class UserTeamsRepository {
  constructor(
    @InjectRepository(UserTeam)
    private readonly repository: Repository<UserTeam>,
  ) {}

  async addUserToTeam(userId: string, teamId: string): Promise<UserTeam> {
    const userTeam = this.repository.create({ userId, teamId });
    return this.repository.save(userTeam);
  }

  async softDeleteUserFromTeam(
    userId: string,
    teamId: string,
  ): Promise<DeleteResult> {
    return this.repository.softDelete({ userId, teamId });
  }

  async hardDeleteUserFromTeam(
    userId: string,
    teamId: string,
  ): Promise<DeleteResult> {
    return this.repository.delete({ userId, teamId });
  }

  async getUsersByteamId(teamId: string): Promise<UserTeam[]> {
    return await this.repository.find({
      where: { teamId },
      relations: ['user'],
    });
  }
}
