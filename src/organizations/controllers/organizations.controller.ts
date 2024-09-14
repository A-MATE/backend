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

import {
  CreateOrganizationRequestDto,
  CreateOrganizationResponseDto,
} from '../dtos/create-organization.dto';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DeleteOperationResponseDto } from 'src/common/dtos/delete-operation-response.dto';
import { GetOrganizationResponseDto } from '../dtos/get-organization.dto';
import {
  UpdateOrganizationRequestDto,
  UpdateOrganizationResponseDto,
} from '../dtos/update-organization.dto';
import { OrganizationsService } from '../services/organizations.service';

@Controller('organizations')
@ApiTags('Organizations API')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'SUPERADMINS',
    type: CreateOrganizationResponseDto,
  })
  @Roles('superadmin')
  async createOrganization(
    @Body() body: CreateOrganizationRequestDto,
  ): Promise<CreateOrganizationResponseDto> {
    const { name, type, logo } = body;
    return await this.organizationsService.createOrganization(name, type, logo);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS AND ADMINS',
    type: UpdateOrganizationResponseDto,
  })
  @Roles('superadmin', 'admin')
  async updateOrganization(
    @Param('id') id: string,
    @Body() body: UpdateOrganizationRequestDto,
  ): Promise<UpdateOrganizationResponseDto> {
    const { name, type, logo, isActive } = body;
    return await this.organizationsService.updateOrganization(
      id,
      name,
      type,
      logo,
      isActive,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS AND ADMINS',
    type: GetOrganizationResponseDto,
  })
  @Roles('superadmin', 'admin')
  async getOrganizationById(
    @Param('id') id: string,
  ): Promise<GetOrganizationResponseDto> {
    return await this.organizationsService.getOrganizationById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS',
    type: [CreateOrganizationResponseDto],
  })
  @Roles('superadmin')
  async getAllOrganizations(
    @Query('withSoftDeleted') withSoftDeleted: boolean = false,
  ): Promise<CreateOrganizationResponseDto[]> {
    return await this.organizationsService.getAllOrganizations(withSoftDeleted);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization (soft or hard)' })
  @ApiResponse({
    status: 200,
    description: 'SUPERADMINS',
    type: DeleteOperationResponseDto,
  })
  @Roles('superadmin')
  async deleteOrganization(
    @Param('id') id: string,
    @Query('isHardDelete') isHardDelete?: boolean,
  ): Promise<DeleteOperationResponseDto> {
    if (isHardDelete) {
      return await this.organizationsService.hardDeleteOrganization(id);
    } else {
      return await this.organizationsService.softDeleteOrganization(id);
    }
  }
}
