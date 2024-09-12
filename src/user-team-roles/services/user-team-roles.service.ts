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
    userId: string,
    teamId: string,
    roleId: string,
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
    userId: string,
    teamId: string,
    roleId: string,
  ): Promise<UserTeamRole> {
    return await this.userTeamRolesRepository.updateUserTeamRole(
      userId,
      teamId,
      roleId,
    );
  }

  async deleteUserTeamRole(
    userId: string,
    teamId: string,
    roleId: string,
  ): Promise<DeleteResult> {
    return await this.userTeamRolesRepository.deleteUserTeamRole(
      userId,
      teamId,
      roleId,
    );
  }
}
