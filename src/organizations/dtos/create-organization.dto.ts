import { ApiProperty } from '@nestjs/swagger';
import { ContactDto, ContactRequestDto } from './contact.dto';
import { OrganizationType } from '../@types/organization.types';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';

export class CreateOrganizationRequestDto {
  @ApiProperty({
    description: 'The name of the organization',
    example: 'Tech Innovations Inc.',
  })
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
  @ApiProperty({
    description: 'Contact information for the organization',
    type: ContactRequestDto,
    required: false,
  })
  contact?: ContactRequestDto;
}

export class CreateOrganizationResponseDto {
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

  @ApiProperty()
  address?: string;

  @ApiProperty({ type: ContactDto })
  contact: ContactDto;

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
