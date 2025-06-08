// src/database/seed.ts
import 'reflect-metadata';
import AppDataSource from './data-source';

import { Organization } from '../organizations/entities/organization.entity';
import { Team } from '../teams/entities/team.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from 'src/common/@types/user-role.enum';

async function seed() {
  await AppDataSource.initialize();

  const orgRepo = AppDataSource.getRepository(Organization);
  const teamRepo = AppDataSource.getRepository(Team);
  const userRepo = AppDataSource.getRepository(User);

  // Seed Organization
  const orgId = '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f';
  const existingOrg = await orgRepo.findOneBy({ id: orgId });

  if (!existingOrg) {
    const org = new Organization();
    org.id = orgId;
    org.name = 'A-MATE';
    org.type = 'company' as any;
    org.logo = {
      thumbnail: '',
      large: '',
    };
    org.isActive = true;

    await orgRepo.save(org);
    console.log('Organization seeded');
  } else {
    console.log('Organization already exists');
  }

  // Seed Team
  const teamId = 'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2';
  const existingTeam = await teamRepo.findOneBy({ id: teamId });

  if (!existingTeam) {
    const team = new Team();
    team.id = teamId;
    team.name = 'A-MATE Sports';
    team.organization = { id: orgId } as any;
    team.logo = {
      thumbnail: '',
      large: '',
    };
    team.isActive = true;

    await teamRepo.save(team);
    console.log('Team seeded');
  } else {
    console.log('Team already exists');
  }

  // Seed User
  const userId = '6b1acd70-53d0-4897-bea0-f7eb0a5c7e41';
  const existingUser = await userRepo.findOneBy({ id: userId });

  if (!existingUser) {
    const user = new User();
    user.id = userId;
    user.email = 'a.mate.tech@gmail.com';
    user.password =
      '$2a$10$nLt5z0aFSh0BujucihtvH.SD1I/ZWj3CjOaD3PSAtW6A1vdJsGhES';
    user.role = UserRole.SUPERADMIN; // remplace par ta valeur enum correcte
    user.organization = { id: orgId } as any;
    user.team = { id: teamId } as any;
    user.isActive = true;

    await userRepo.save(user);
    console.log('User seeded');
  } else {
    console.log('User already exists');
  }

  await AppDataSource.destroy();
}

seed()
  .then(() => console.log('Seeding complete'))
  .catch((err) => {
    console.error('Seeding failed', err);
    process.exit(1);
  });
