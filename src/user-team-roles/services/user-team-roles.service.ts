import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserTeamRole } from '../entities/user-team-role';
import { UserTeamRolesRepository } from '../repositories/user-team-roles.repository';

@Injectable()
export class UserTeamRolesService {
  constructor(
    private readonly userTeamRolesRepository: UserTeamRolesRepository,
  ) {}
  async createNewUserTeamRole(
    userId: number,
    teamId: number,
    roleId: number,
  ): Promise<UserTeamRole> {
    // TODO verify if user and team exist
    // TODO verify if role exists

    // TODO create new user team role

    return await this.userTeamRolesRepository.createUserTeamRole(
      userId,
      teamId,
      roleId,
    );
  }

  async updateUserTeamRole(
    userId: number,
    teamId: number,
    roleId: number,
  ): Promise<UserTeamRole> {
    return await this.userTeamRolesRepository.updateUserTeamRole(
      userId,
      teamId,
      roleId,
    );
  }

  async deleteUserTeamRole(
    userId: number,
    teamId: number,
    roleId: number,
  ): Promise<DeleteResult> {
    return await this.userTeamRolesRepository.deleteUserTeamRole(
      userId,
      teamId,
      roleId,
    );
  }
}
