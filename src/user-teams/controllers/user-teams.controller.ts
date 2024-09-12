import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteOperationResponseDto } from 'src/common/dtos/delete-operation-response.dto';
import { CreateUserTeamRequestDto } from '../dtos/create-user-team-request';
import { UserTeam } from '../entities/user-team.entity';
import { UserTeamsService } from '../services/user-teams.service';

@Controller('user-teams')
@ApiTags('User Team API')
@ApiBearerAuth('JWT')
export class UserTeamsController {
  constructor(private readonly userTeamsService: UserTeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a user to a team' })
  @ApiResponse({
    status: 201,
    description: 'This endpoint adds a user to a team',
    type: CreateUserTeamRequestDto,
  })
  async addUserToTeam(
    @Body() body: CreateUserTeamRequestDto,
  ): Promise<UserTeam> {
    const { userId, teamId } = body;
    return this.userTeamsService.addUserToTeam(userId, teamId);
  }

  @Get('team/:teamId/users')
  @ApiOperation({ summary: 'Get all users in a team' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint returns all users in a team',
    type: UserTeam,
    isArray: true,
  })
  async getUsersByteamId(@Param('teamId') teamId: string): Promise<UserTeam[]> {
    return this.userTeamsService.getUsersByteamId(teamId);
  }

  @Delete('team/:teamId/users/:userId')
  @ApiOperation({ summary: 'Delete a user from a team' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint deletes a user from a team',
    type: DeleteOperationResponseDto,
  })
  async deleteUserFromTeam(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
    @Query('withSoftDelete') withSoftDelete: boolean = true,
  ): Promise<DeleteOperationResponseDto> {
    if (withSoftDelete) {
      return this.userTeamsService.softDeleteUserFromTeam(userId, teamId);
    } else {
      return this.userTeamsService.hardDeleteUserFromTeam(userId, teamId);
    }
  }
}
