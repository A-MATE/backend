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
import { CreateRoleDto } from '../dtos/create-role.dto';
import { Role } from '../entities/role.entity';
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
    type: String,
  })
  async createNewRole(@Body() body: CreateRoleDto): Promise<Role> {
    const { role, description } = body;
    return this.rolesService.createRole(role, description);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint returns all roles',
    type: [Object],
  })
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint updates a role given its ID',
    type: String,
  })
  async updateRoleById(
    @Param('id') id: string,
    @Body() Body: CreateRoleDto,
  ): Promise<Role> {
    const roleId = parseInt(id, 10);
    const { role, description } = Body;
    if (isNaN(roleId)) {
      throw new Error('Invalid ID format');
    }
    return this.rolesService.updateRoleById(roleId, role, description);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint deletes a role given its ID',
    type: String,
  })
  async deleteRoleById(@Param('id') id: string): Promise<string> {
    const roleId = parseInt(id, 10);
    if (isNaN(roleId)) {
      throw new Error('Invalid ID format');
    }
    return this.rolesService.deleteRoleById(roleId);
  }
}
