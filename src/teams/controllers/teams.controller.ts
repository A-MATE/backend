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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DeleteOperationResponseDto } from '../../common/dtos/delete-operation-response.dto';
import {
  CreateTeamRequestDto,
  CreateTeamResponseDto,
} from '../dtos/create-team.dto';
import { GetAllTeamsResponseDto } from '../dtos/get-all-teams.dto';
import { GetTeamByIdResponseDto } from '../dtos/get-one-team.dto';
import {
  UpdateTeamRequestDto,
  UpdateTeamResponseDto,
} from '../dtos/update-team.dto';
import { TeamsService } from '../services/teams.service';

@Controller('teams')
@ApiTags('Teams API')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({
    status: 201,
    description: 'SUPERADMINS',
    type: CreateTeamResponseDto,
  })
  @Roles('superadmin')
  async createTeam(
    @Body() body: CreateTeamRequestDto,
  ): Promise<CreateTeamResponseDto> {
    const { name, description, logo, ageGroup, gender, organizationId } = body;
    return this.teamsService.createTeam(
      name,
      description,
      logo,
      ageGroup,
      gender,
      organizationId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS',
    type: [GetAllTeamsResponseDto],
  })
  @Roles('superadmin')
  async getAllTeams(
    @Query('withSoftDeleted') withSoftDeleted?: boolean,
  ): Promise<GetAllTeamsResponseDto[]> {
    // TODO we should keep in my that we eventually need to implement pagination, query parameters, and filtering such as by age, by gender, etc.
    return await this.teamsService.getAllTeams(withSoftDeleted);
  }

  @Get(':teamId')
  @ApiOperation({ summary: 'Get a team by ID' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint returns a team by ID',
    type: GetTeamByIdResponseDto,
  })
  async getTeamById(
    @Param('teamId') teamId: string,
  ): Promise<UpdateTeamResponseDto> {
    return await this.teamsService.getTeamById(teamId);
  }

  @Patch(':teamId')
  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS AND ADMINS',
    type: UpdateTeamRequestDto,
  })
  @Roles('superadmin', 'admin')
  async updateTeam(
    @Body() body: UpdateTeamRequestDto,
    @Param('teamId') teamId: string,
  ): Promise<UpdateTeamResponseDto> {
    const { name, description, logo, ageGroup, gender } = body;
    return this.teamsService.updateTeam(
      teamId,
      name,
      description,
      logo,
      ageGroup,
      gender,
    );
  }

  @Delete(':teamId')
  @ApiOperation({ summary: 'Delete a team' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS',
    type: DeleteOperationResponseDto,
  })
  @Roles('superadmin')
  async deleteTeamById(
    @Param('teamId') teamId: string,
    @Query('hard') hard?: boolean,
  ): Promise<DeleteOperationResponseDto> {
    if (hard) {
      return await this.teamsService.hardDeleteTeamById(teamId);
    } else {
      return await this.teamsService.softDeleteTeamById(teamId);
    }
  }
}
