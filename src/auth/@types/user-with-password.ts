import { UserRole } from 'src/common/@types/user-role.enum';

export type UserWithPassword = {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  team: { id: string };
  organization: { id: string };
};
