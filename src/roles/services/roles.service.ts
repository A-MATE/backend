import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RolesRepository } from '../repositories/role.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRole(newRole: string, description: string): Promise<Role> {
    return await this.rolesRepository.createRole(newRole, description);
  }

  async getAllRoles(): Promise<Promise<Role[]>> {
    return await this.rolesRepository.findAllRoles();
  }

  async updateRoleById(
    id: string,
    role: string,
    description: string,
  ): Promise<Role> {
    return await this.rolesRepository.updateRole(id, role, description);
  }

  async deleteRoleById(id: string): Promise<DeleteResult> {
    return await this.rolesRepository.deleteRole(id);
  }
}
