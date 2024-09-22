import { PhotoUrls } from 'src/common/@types/logo-urls.type';
import { UserRole } from 'src/common/@types/user-role.enum';

import { Organization } from 'src/organizations/entities/organization.entity';
import { Team } from 'src/teams/entities/team.entity';

export class UserAuthDto {
  id: string;
  email: string;
  role: UserRole;
  teamId: string;
  organizationId: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  bio?: string;
  avatar?: PhotoUrls;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  deletedAt?: Date | null;
  password?: string;
  team?: Team;
  organization?: Organization;
}
