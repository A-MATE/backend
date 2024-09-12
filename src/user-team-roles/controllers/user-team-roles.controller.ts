import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteOperationResponseDto } from 'src/common/dtos/delete-operation-response.dto';
import {
  CreateUserTeamRoleDto,
  CreateUserTeamRoleResponseDto,
} from '../dtos/create-user-team-role.dto';
import {
  UpdateUserTeamRoleDto,
  UpdateUserTeamRoleResponseDto,
} from '../dtos/update-user-team-role.dto';
import { UserTeamRolesService } from '../services/user-team-roles.service';

@Controller('users/:userId/teams/:teamId/roles')
@ApiTags('User Team Roles API')
@ApiBearerAuth('JWT')
export class UserTeamRolesController {
  constructor(private readonly userTeamRolesService: UserTeamRolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user-team / role realtionship' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint assigns a role to a user within an app context',
    type: CreateUserTeamRoleResponseDto,
  })
  async createNewUserTeamRole(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
    @Body() body: CreateUserTeamRoleDto,
  ): Promise<CreateUserTeamRoleResponseDto> {
    const { roleId } = body;
    return this.userTeamRolesService.createNewUserTeamRole(
      userId,
      teamId,
      roleId,
    );
  }

  @Patch()
  @ApiOperation({ summary: 'Update a user-team / role realtionship' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint updates a role to a user within an app context',
    type: UpdateUserTeamRoleResponseDto,
  })
  async updateUserTeamRole(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
    @Body() body: UpdateUserTeamRoleDto,
  ): Promise<UpdateUserTeamRoleResponseDto> {
    const { roleId } = body;
    return this.userTeamRolesService.updateUserTeamRole(userId, teamId, roleId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user-team / role realtionship' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint deletes a role to a user within an app context',
    type: DeleteOperationResponseDto,
  })
  async deleteUserTeamRole(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
    @Param('roleId') roleId: string,
  ): Promise<DeleteOperationResponseDto> {
    return this.userTeamRolesService.deleteUserTeamRole(userId, teamId, roleId);
  }
}
