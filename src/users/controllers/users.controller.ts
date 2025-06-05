import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { UpdateUserRequestDto } from '../dtos/update-user-request.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users API')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserResponseDto,
  })
  async createUser(
    @Body() body: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const { email, password, teamId } = body;
    return await this.usersService.createUser(email, password, teamId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserResponseDto,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const { firstName, lastName, bio, avatar, isActive } = body;
    console.log('body', body);

    return await this.usersService.updateUser(
      id,
      firstName,
      lastName,
      bio,
      avatar,
      isActive,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponseDto],
  })
  async getAllUsers(
    @Query('withSoftDeleted') withSoftDeleted: boolean = false,
  ): Promise<UserResponseDto[]> {
    return await this.usersService.getAllUsers(withSoftDeleted);
  }

  // TODO add get all users by team ID for admins and superadmins
  // Should be implemented in the module Teams (GET:/teams/users)
  // TODO add get all users by organization ID for admins and superadmins
  // Should be implemented in the module Organizations (GET:/organizations/users)

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID',
    type: UserResponseDto,
  })
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    console.log('id', id);

    const result = await this.usersService.getUserById(id);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete or soft delete a user' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS',
    type: UserResponseDto,
  })
  async deleteUser(
    @Param('id') id: string,
    @Query('isHardDelete') isHardDelete?: boolean,
  ): Promise<UserResponseDto> {
    if (isHardDelete) {
      return await this.usersService.hardDeleteUser(id);
    } else {
      return await this.usersService.softDeleteUser(id);
    }
  }
}
