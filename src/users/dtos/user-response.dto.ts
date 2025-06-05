import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'src/common/@types/user-role.enum';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: UserRole;

  @ApiProperty()
  @Expose()
  teamId: string;

  @ApiProperty()
  @Expose()
  organizationId: string;

  @ApiProperty()
  @Expose()
  firstName?: string;

  @ApiProperty()
  @Expose()
  lastName?: string;

  @ApiProperty()
  @Expose()
  birthDate?: Date;

  @ApiProperty()
  @Expose()
  bio?: string;

  @ApiProperty()
  @Expose()
  avatar?: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  deletedAt?: Date | null;

  @Exclude()
  password?: string;

  @Exclude()
  team?: any;

  @Exclude()
  organization?: any;
}
