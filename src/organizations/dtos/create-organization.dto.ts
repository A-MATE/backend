import { ApiProperty } from '@nestjs/swagger';
import { LogoUrls } from 'src/common/@types/logo-urls.type';
import { OrganizationType } from '../@types/organization.types';

export class CreateOrganizationRequestDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: OrganizationType,
    description:
      'The type of organization (e.g., Company, Nonprofit, Government)',
    example: 'Company',
  })
  type: OrganizationType;

  @ApiProperty()
  logo?: LogoUrls;
}

export class CreateOrganizationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({
    enum: OrganizationType,
    description:
      'The type of organization (e.g., Company, Nonprofit, Government)',
    example: 'Company',
  })
  type: OrganizationType;

  @ApiProperty()
  logo?: LogoUrls;

  @ApiProperty({
    description: 'The date and time the organization was created',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description:
      'The date and time the organization was deleted (if applicable)',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  deletedAt?: Date | null;

  @ApiProperty({
    description: 'A boolean indicating whether the organization is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'The date and time the organization was last updated',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  updatedAt: Date | null;
}
