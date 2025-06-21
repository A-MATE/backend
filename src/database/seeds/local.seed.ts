import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedLocal(dataSource: DataSource): Promise<void> {
  console.log('🚀 Seeding data for LOCAL environment...');

  const orgId = '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f';
  const teamAId = 'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2';
  const teamBId = '2cf9fda0-cab0-4109-a3d9-8adc190ad7e3';
  const teamCId = '3cf9fda0-cab0-4109-a3d9-8adc190ad7e4';
  const hashedPassword = await bcrypt.hash('admin', 10);

  await dataSource.query(`
    INSERT INTO "organizations" (id, name, type, logo, "createdAt", "updatedAt", "isActive")
    VALUES (
      '${orgId}',
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
    VALUES
      ('${teamAId}', 'A-MATE Sport Team A', '${orgId}', '{"thumbnail": "", "large": ""}', NOW(), NOW(), true),
      ('${teamBId}', 'A-MATE Sport Team B', '${orgId}', '{"thumbnail": "", "large": ""}', NOW(), NOW(), true),
      ('${teamCId}', 'A-MATE Sport Team C', '${orgId}', '{"thumbnail": "", "large": ""}', NOW(), NOW(), true)
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
      '${orgId}',
      '${teamAId}',
      NOW(),
      NOW(),
      true
    )
    ON CONFLICT (id) DO NOTHING;
  `);

  await dataSource.query(`
    INSERT INTO "match" (
      id, "teamId", "organizationId", date, "homeTeamId", "awayTeamId",
      "homeTeamScore", "awayTeamScore", status, sport, "createdAt"
    ) VALUES
      (
        gen_random_uuid(), '${teamAId}', '${orgId}', NOW(),
        '${teamAId}', '${teamBId}', 3, 1, 'FINISHED', 'football', NOW()
      ),
      (
        gen_random_uuid(), '${teamAId}', '${orgId}', NOW(),
        '${teamCId}', '${teamAId}', 2, 2, 'FINISHED', 'football', NOW()
      ),
      (
        gen_random_uuid(), '${teamBId}', '${orgId}', NOW(),
        '${teamBId}', '${teamCId}', NULL, NULL, 'SCHEDULED', 'football', NOW()
      )
    ON CONFLICT (id) DO NOTHING;
  `);

  console.log('✅ Local seed completed.');
}
