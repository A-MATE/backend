import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { Team } from 'src/teams/entities/team.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,

    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  async createUser(
    email: string,
    password: string,
    teamId: string,
  ): Promise<User> {
    const team = await this.teamsRepository.findOne({ where: { id: teamId } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
    const newUser = this.repository.create({ email, password, teamId });
    return await this.repository.save(newUser);
  }

  async updateUser(
    id: string,
    firstName?: string,
    lastName?: string,
    bio?: string,
    avatar?: PhotoUrls,
    isActive?: boolean,
  ): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (isActive !== undefined) user.isActive = isActive;

    return await this.repository.save(user);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }

  async getAllUsers(withDeleted: boolean): Promise<User[]> {
    return await this.repository.find({ withDeleted });
  }

  async softDeleteUser(id: string): Promise<DeleteResult> {
    return this.repository.softDelete(id);
  }

  async hardDeleteUser(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
