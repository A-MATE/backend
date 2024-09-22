import { Controller, Get, Param, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { UserRole } from 'src/common/@types/user-role.enum';
import { RolesService } from '../services/roles.service';

@Controller('roles')
@ApiTags('Roles API')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('assign')
  async assignRole() {
    // @Body('role') role: UserRole, // @Body('userId') userId: string,
    // return this.rolesService.assignRole(userId, role);
  }

  @Post('remove')
  async removeRole() {
    // @Body('role') role: UserRole, // @Body('userId') userId: string,
    // return this.rolesService.removeRole(userId, role);
  }

  @Get(':role/users')
  async getUsersByRole(@Param('role') role: UserRole) {
    // return this.rolesService.getUsersByRole(role);
  }
}
