import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'src/common/@types/user-role.enum';

@Exclude()
export class UserAuthDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty({ enum: UserRole })
  @Expose()
  role: UserRole;

  @ApiProperty()
  @Expose()
  teamId: string;

  @ApiProperty()
  @Expose()
  organizationId: string;

  @ApiProperty({ required: false })
  @Expose()
  firstName?: string;

  @ApiProperty({ required: false })
  @Expose()
  lastName?: string;

  @ApiProperty({ required: false })
  @Expose()
  birthDate?: Date;

  @ApiProperty({ required: false })
  @Expose()
  bio?: string;

  @ApiProperty({ required: false })
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

  @ApiProperty({ required: false })
  @Expose()
  deletedAt?: Date | null;

  @Expose()
  team?: any;

  @Expose()
  organization?: any;
}
