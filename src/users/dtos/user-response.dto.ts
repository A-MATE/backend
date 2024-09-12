import { ApiProperty } from '@nestjs/swagger';
import { PhotoUrls } from 'src/common/@types/logo-urls.type';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  avatar?: PhotoUrls;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date | null;

  @ApiProperty()
  isActive: boolean;
}
