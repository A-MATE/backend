import { ApiProperty } from '@nestjs/swagger';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { OrganizationType } from '../@types/organization.types';
import { ContactRequestDto } from './contact.dto';

export class UpdateOrganizationRequestDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({
    enum: OrganizationType,
    description:
      'The type of organization (e.g., Company, Nonprofit, Government)',
    example: 'Company',
    required: false,
  })
  type?: OrganizationType;

  @ApiProperty({ required: false })
  logo?: PhotoUrls;

  @ApiProperty({
    description: 'The address of the organization',
    example: '123 Main St, Anytown, USA',
    required: false,
  })
  address?: string;

  @ApiProperty({ type: ContactRequestDto, required: false })
  contact?: ContactRequestDto;

  @ApiProperty({ required: false })
  isActive?: boolean;
}

export class UpdateOrganizationResponseDto {
  @ApiProperty()
  id: string;

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
  logo?: PhotoUrls;

  @ApiProperty({
    description: 'The address of the organization',
    example: '123 Main St, Anytown, USA',
    required: false,
  })
  address?: string;

  @ApiProperty({ type: ContactRequestDto, required: false })
  contact?: ContactRequestDto;

  @ApiProperty({
    description: 'The date and time the organization was created',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the organization was last updated',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'A boolean indicating whether the organization is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description:
      'The date and time the organization was deleted (if applicable)',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  deletedAt?: Date | null;
}
