import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'This endpoint creates a new organization',
    type: CreateOrganizationResponseDto,
  })
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
    description: 'This endpoint updates an existing organization',
    type: UpdateOrganizationResponseDto,
  })
  async updateOrganization(
    @Param('id', ParseIntPipe) id: number,
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
    description: 'This endpoint retrieves an organization by ID',
    type: GetOrganizationResponseDto,
  })
  async getOrganizationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetOrganizationResponseDto> {
    return await this.organizationsService.getOrganizationById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint retrieves all organizations',
    type: [CreateOrganizationResponseDto],
  })
  async getAllOrganizations(
    @Query('withSoftDeleted') withSoftDeleted: boolean = false,
  ): Promise<CreateOrganizationResponseDto[]> {
    return await this.organizationsService.getAllOrganizations(withSoftDeleted);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization (soft or hard)' })
  @ApiResponse({
    status: 200,
    description: 'This endpoint deletes an organization (soft or hard)',
    type: DeleteOperationResponseDto,
  })
  async deleteOrganization(
    @Param('id', ParseIntPipe) id: number,
    @Query('isHardDelete') isHardDelete?: boolean,
  ): Promise<DeleteOperationResponseDto> {
    if (isHardDelete) {
      return await this.organizationsService.hardDeleteOrganization(id);
    } else {
      return await this.organizationsService.softDeleteOrganization(id);
    }
  }
}
