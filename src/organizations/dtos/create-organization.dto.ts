import { ApiProperty } from '@nestjs/swagger';
import { OrganizationType } from '../@types/organization.types';
import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: OrganizationType })
  type: OrganizationType;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false })
  logo?: string;
}

export class CreateOrganizationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: OrganizationType })
  type: OrganizationType;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false })
  logo?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false })
  deletedAt?: Date | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ required: false })
  updatedAt: Date | null;
}
