import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteOperationResponseDto } from '../../common/dtos/delete-operation-response.dto';
import {
  CreateTeamRequestDto,
  CreateTeamResponseDto,
} from '../dtos/create-team.dto';
import { GetAllTeamsResponseDto } from '../dtos/get-all-teams.dto';
import {
  UpdateTeamRequestDto,
  UpdateTeamResponseDto,
} from '../dtos/update-team.dto';
import { TeamsService } from '../services/teams.service';

@Controller('teams')
@ApiTags('Teams API')
@ApiBearerAuth('JWT')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({
    status: 201,
    description: 'This endpoint creates a new team',
    type: CreateTeamResponseDto,
  })
  async createTeam(
    @Body() body: CreateTeamRequestDto,
  ): Promise<CreateTeamResponseDto> {
    const { name, description, logos, ageGroup, gender } = body;
    return this.teamsService.createTeam(
      name,
      description,
      logos,
      ageGroup,
      gender,
    );
  }

  @Patch(':teamId')
  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint updates a team',
    type: UpdateTeamRequestDto,
  })
  async updateTeam(
    @Body() body: UpdateTeamRequestDto,
    @Param('teamId') teamId: number,
  ): Promise<UpdateTeamResponseDto> {
    const { name, description, logos, ageGroup, gender } = body;
    return this.teamsService.updateTeam(
      +teamId,
      name,
      description,
      logos,
      ageGroup,
      gender,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint returns all teams',
    type: [GetAllTeamsResponseDto],
  })
  async getAllTeams(): Promise<GetAllTeamsResponseDto[]> {
    // TODO we should keep in my that we eventually need to implement pagination, query parameters, and filtering such as by age, by gender, etc.
    return await this.teamsService.getAllTeams();
  }

  @Delete(':teamId')
  @ApiOperation({ summary: 'Soft delete a team' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint soft deletes a team',
    type: DeleteOperationResponseDto,
  })
  async deleteTeamById(
    @Param('teamId') teamId: string,
  ): Promise<DeleteOperationResponseDto> {
    // TODO add query that allow to soft delete a team
    console.log('====================================');
    console.log('Delete team with id:', teamId);
    console.log('====================================');
    return;
  }
}
