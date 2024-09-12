import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserTeamRole } from '../entities/user-team-role';

@Injectable()
export class UserTeamRolesRepository {
  constructor(
    @InjectRepository(UserTeamRole)
    private readonly repository: Repository<UserTeamRole>,
  ) {}

  async createUserTeamRole(
    userId: string,
    teamId: string,
    roleId: string,
  ): Promise<UserTeamRole> {
    const newUserTeamRole = this.repository.create({ userId, teamId, roleId });
    return this.repository.save(newUserTeamRole);
  }

  async updateUserTeamRole(
    userId: string,
    teamId: string,
    roleId: string,
  ): Promise<UserTeamRole> {
    const updatedTeamRole = await this.repository.findOneBy({
      userId,
      teamId,
      roleId,
    });

    updatedTeamRole.roleId = roleId;
    return this.repository.save(updatedTeamRole);
  }

  async deleteUserTeamRole(
    userId: string,
    teamId: string,
    roleId: string,
  ): Promise<DeleteResult> {
    return await this.repository.delete({ userId, teamId, roleId });
  }
}
