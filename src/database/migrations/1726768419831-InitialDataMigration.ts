import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDataMigration1726768419831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Vérifier si la table `organization` est vide
    const organizationCount = await queryRunner.query(
      `SELECT COUNT(*) FROM "organizations";`,
    );
    if (parseInt(organizationCount[0].count, 10) === 0) {
      // Insérer les données dans `organizations`
      await queryRunner.query(`
            INSERT INTO "organizations" (id, name, type, logo, "createdAt", "updatedAt", "isActive")
            VALUES (
              '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f',
              'A-MATE',
              'company',
              '{"small": "logo-small.png", "medium": "logo-medium.png", "large": "logo-large.png"}',
              NOW(),
              NOW(),
              true
            );
          `);
    }

    // Vérifier si la table `team` est vide
    const teamCount = await queryRunner.query(`SELECT COUNT(*) FROM "teams";`);
    if (parseInt(teamCount[0].count, 10) === 0) {
      // Insérer les données dans `teams`
      await queryRunner.query(`
            INSERT INTO "teams" (id, name, "organizationId", "createdAt", "updatedAt", "isActive")
            VALUES (
              'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2',
              'A-MATE Sports',
              '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f',
              NOW(),
              NOW(),
              true
            );
          `);
    }

    // Vérifier si la table `user` est vide
    const userCount = await queryRunner.query(`SELECT COUNT(*) FROM "users";`);
    if (parseInt(userCount[0].count, 10) === 0) {
      // Insérer les données dans `users`
      await queryRunner.query(`
            INSERT INTO "users" (id, email, password, role, "organizationId", "teamId", "createdAt", "updatedAt", "isActive")
            VALUES (
              '6b1acd70-53d0-4897-bea0-f7eb0a5c7e41',
              'a.mate.tech@gmail.com',
              '$2b$10$7ls5zSLSKb2w3PfFENfz/O8J27oCWNNPvPVUcPbwfbXAlK/3FBTmy',
              'superadmin',
              '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f',
              'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2',
              NOW(),
              NOW(),
              true
            );
          `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Supprimer les utilisateurs, équipes et organisations ajoutées
    await queryRunner.query(
      `DELETE FROM "user" WHERE id = '6b1acd70-53d0-4897-bea0-f7eb0a5c7e41';`,
    );
    await queryRunner.query(
      `DELETE FROM "team" WHERE id = 'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2';`,
    );
    await queryRunner.query(
      `DELETE FROM "organization" WHERE id = '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f';`,
    );
  }
}
