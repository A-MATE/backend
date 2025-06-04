import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from 'src/common/@types/user-role.enum';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    email: string,
    password: string,
    teamId: string,
    role: UserRole,
    firstName?: string,
    lastName?: string,
    birthDate?: Date,
    bio?: string,
    avatar?: string,
    isActive: boolean = true,
  ) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: { organization: true },
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    if (!team.organization) {
      throw new NotFoundException(
        `Organization not found for team with ID ${teamId}`,
      );
    }

    return await this.prisma.user.create({
      data: {
        email,
        password,
        role,
        team: { connect: { id: teamId } },
        organization: { connect: { id: team.organization.id } },
        firstName,
        lastName,
        birthDate,
        bio,
        avatar,
        isActive,
      },
    });
  }

  async updateUser(
    id: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    avatar?: PhotoUrls,
    isActive?: boolean,
  ) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(bio && { bio }),
        ...(avatar && { avatar }),
        ...(isActive !== undefined && { isActive }),
      },
    });
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        team: true,
        organization: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOneByEmailAndTeam(email: string, teamId: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
        teamId,
      },
      include: {
        team: true,
        organization: true,
      },
    });
  }

  async getAllUsers(withDeleted: boolean) {
    return await this.prisma.user.findMany({
      where: withDeleted ? {} : { deletedAt: null },
      include: {
        team: true,
        organization: true,
      },
    });
  }

  async softDeleteUser(id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
