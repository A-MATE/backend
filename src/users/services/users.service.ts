import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserAuthDto } from 'src/auth/dtos/user-auth.dto';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { UserRole } from 'src/common/@types/user-role.enum';
import { DeleteOperationResponseDto } from 'src/common/dtos/delete-operation-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    email: string,
    password: string,
    teamId: string,
  ): Promise<UserResponseDto> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const role = UserRole.USER;

    const user = await this.usersRepository.createUser(
      email,
      hashedPassword,
      teamId,
      role,
    );

    return plainToInstance(UserResponseDto, {
      ...user,
      teamId: user.team.id,
      organizationId: user.team.organization.id,
    });
  }

  async updateUser(
    id: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    avatar?: PhotoUrls,
    isActive?: boolean,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.updateUser(
      id,
      firstName,
      lastName,
      bio,
      avatar,
      isActive,
    );

    return plainToInstance(UserResponseDto, {
      ...user,
      teamId: user.team.id,
      organizationId: user.team.organization.id,
    });
  }

  async getAllUsers(withDeleted: boolean): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.getAllUsers(withDeleted);
    return users.map((user) =>
      plainToInstance(UserResponseDto, {
        ...user,
        teamId: user.team.id,
        organizationId: user.organization.id,
      }),
    );
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.getUserById(id);
    return plainToInstance(UserResponseDto, {
      ...user,
      teamId: user.team.id,
      organizationId: user.organization.id,
    });
  }

  async getUserByEmailAndTeam(
    email: string,
    teamId: string,
  ): Promise<UserAuthDto> {
    const user = await this.usersRepository.findOneByEmailAndTeam(
      email,
      teamId,
    );

    if (!user) {
      throw new NotFoundException(
        `User with email ${email} and team ID ${teamId} not found`,
      );
    }
    return {
      ...user,
      teamId: user.team.id,
      organizationId: user.organization.id,
    };
  }

  async softDeleteUser(id: string): Promise<DeleteOperationResponseDto> {
    return this.usersRepository.softDeleteUser(id);
  }

  async hardDeleteUser(id: string): Promise<DeleteOperationResponseDto> {
    return this.usersRepository.hardDeleteUser(id);
  }
}
