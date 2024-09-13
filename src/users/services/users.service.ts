import { Injectable } from '@nestjs/common';

import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { DeleteOperationResponseDto } from 'src/common/dtos/delete-operation-response.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    email: string,
    password: string,
    teamId: string,
  ): Promise<User> {
    return this.usersRepository.createUser(email, password, teamId);
  }

  async updateUser(
    id: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    avatar?: PhotoUrls,
    isActive?: boolean,
  ): Promise<User> {
    return this.usersRepository.updateUser(
      id,
      firstName,
      lastName,
      bio,
      avatar,
      isActive,
    );
  }

  async getAllUsers(withDeleted: boolean): Promise<User[]> {
    return this.usersRepository.getAllUsers(withDeleted);
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.getUserById(id);
  }

  async softDeleteUser(id: string): Promise<DeleteOperationResponseDto> {
    return this.usersRepository.softDeleteUser(id);
  }

  async hardDeleteUser(id: string): Promise<DeleteOperationResponseDto> {
    return this.usersRepository.hardDeleteUser(id);
  }
}
