import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { RoleEnum } from '../@types/roles.types';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async createRole(name: string, description?: string): Promise<Role> {
    const newRole = this.repository.create({
      name: RoleEnum[name],
      description,
    });
    return this.repository.save(newRole);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.repository.find();
  }

  async findRoleById(id: string): Promise<Role> {
    return this.repository.findOneBy({ id });
  }

  async updateRole(
    id: string,
    name?: string,
    description?: string,
  ): Promise<Role> {
    const role = await this.repository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    if (name) {
      role.name = RoleEnum[name];
    }
    if (description) {
      role.description = description;
    }
    return this.repository.save(role);
  }

  async deleteRole(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
