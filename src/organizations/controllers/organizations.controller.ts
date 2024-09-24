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
import { DeleteOperationResponseDto } from 'src/common/dtos/delete-operation-response.dto';

import {
  CreateOrganizationRequestDto,
  CreateOrganizationResponseDto,
} from '../dtos/create-organization.dto';
import { GetOrganizationResponseDto } from '../dtos/get-organization.dto';
import {
  UpdateOrganizationRequestDto,
  UpdateOrganizationResponseDto,
} from '../dtos/update-organization.dto';
import { OrganizationsService } from '../services/organizations.service';

@Controller('organizations')
@ApiTags('Organizations API')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    type: CreateOrganizationResponseDto,
  })
  async createOrganization(
    @Body()
    body: CreateOrganizationRequestDto,
  ): Promise<CreateOrganizationResponseDto> {
    const { name, type } = body;
    return await this.organizationsService.createOrganization(name, type);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiResponse({
    status: 200,
    type: UpdateOrganizationResponseDto,
  })
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
    type: GetOrganizationResponseDto,
  })
  async getOrganizationById(
    @Param('id') id: string,
  ): Promise<GetOrganizationResponseDto> {
    return await this.organizationsService.getOrganizationById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
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
    type: DeleteOperationResponseDto,
  })
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
