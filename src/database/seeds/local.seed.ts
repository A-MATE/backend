import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedLocal(dataSource: DataSource): Promise<void> {
  console.log('🚀 Seeding data for LOCAL environment...');
  const hashedPassword = await bcrypt.hash('admin', 10);

  await dataSource.query(`
    INSERT INTO "organizations" (id, name, type, logo, "createdAt", "updatedAt", "isActive")
    VALUES (
      '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f',
      'A-MATE CLUB',
      'company',
      '{"thumbnail": "", "large": ""}',
      NOW(),
      NOW(),
      true
    )
    ON CONFLICT (id) DO NOTHING;
  `);

  await dataSource.query(`
    INSERT INTO "teams" (id, name, "organizationId", logo, "createdAt", "updatedAt", "isActive")
    VALUES (
      'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2',
      'A-MATE Sport Team',
      '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f',
      '{"thumbnail": "", "large": ""}',
      NOW(),
      NOW(),
      true
    )
    ON CONFLICT (id) DO NOTHING;
  `);

  await dataSource.query(`
    INSERT INTO "users" (
      id, email, password, role, "organizationId", "teamId", "createdAt", "updatedAt", "isActive"
    )
    VALUES (
      '6b1acd70-53d0-4897-bea0-f7eb0a5c7e41',
      'a.mate.tech@gmail.com',
      '${hashedPassword}',
      'superadmin',
      '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f',
      'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2',
      NOW(),
      NOW(),
      true
    )
    ON CONFLICT (id) DO NOTHING;
  `);

  console.log('✅ Local seed completed.');
}
