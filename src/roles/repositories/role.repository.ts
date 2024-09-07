import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async createRole(name: string, description?: string): Promise<Role> {
    const newRole = this.repository.create({ name, description });
    return this.repository.save(newRole);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.repository.find();
  }

  async findRoleById(id: number): Promise<Role> {
    return this.repository.findOneBy({ id });
  }

  async updateRole(
    id: number,
    name?: string,
    description?: string,
  ): Promise<Role> {
    const role = await this.repository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    if (name) {
      role.name = name;
    }
    if (description) {
      role.description = description;
    }
    return this.repository.save(role);
  }

  async deleteRole(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
