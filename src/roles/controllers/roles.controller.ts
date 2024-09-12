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

import { DeleteOperationResponseDto } from 'src/common/dtos/delete-operation-response.dto';
import {
  CreateRoleRequestDto,
  CreateRoleResponseDto,
} from '../dtos/create-role.dto';
import { GetAllRolesResponseDto } from '../dtos/get-all-roles.dto';
import {
  UpdateRoleRequestDto,
  UpdateRoleResponseDto,
} from '../dtos/update-role.dto';
import { RolesService } from '../services/roles.service';

@Controller('roles')
@ApiTags('Roles API')
@ApiBearerAuth('JWT')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 200,
    description:
      'This endpoint creates a new role that can further be assignable to some user',
    type: CreateRoleResponseDto,
  })
  async createNewRole(
    @Body() body: CreateRoleRequestDto,
  ): Promise<CreateRoleResponseDto> {
    const { role, description } = body;
    return this.rolesService.createRole(role, description);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint returns all roles',
    type: [GetAllRolesResponseDto],
  })
  async getAllRoles(): Promise<GetAllRolesResponseDto[]> {
    return this.rolesService.getAllRoles();
  }

  @Patch(':roleId')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint updates a role given its ID',
    type: UpdateRoleResponseDto,
  })
  async updateRoleById(
    @Param('roleId') roleId: string,
    @Body() body: UpdateRoleRequestDto,
  ): Promise<UpdateRoleResponseDto> {
    const { role, description } = body;
    return this.rolesService.updateRoleById(roleId, role, description);
  }

  @Delete(':roleId')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint deletes a role given its ID',
    type: DeleteOperationResponseDto,
  })
  async deleteRoleById(
    @Param('roleId') roleId: string,
  ): Promise<DeleteOperationResponseDto> {
    return this.rolesService.deleteRoleById(roleId);
  }
}
