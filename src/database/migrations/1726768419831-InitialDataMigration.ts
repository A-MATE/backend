import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class InitialDataMigration1726768419831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'organizations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['company', 'club', 'school', 'charity'],
          },
          {
            name: 'logo',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'teams',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'ageGroup',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'logo',
            type: 'jsonb',
          },
          {
            name: 'organizationId',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['organizationId'],
            referencedTableName: 'organizations',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: false,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'varchar',
          },
          {
            name: 'organizationId',
            type: 'uuid',
          },
          {
            name: 'teamId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['organizationId'],
            referencedTableName: 'organizations',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['teamId'],
            referencedTableName: 'teams',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({
        columnNames: ['email', 'teamId'],
      }),
    );

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

    await queryRunner.query(`
          INSERT INTO "teams" (id, name, "organizationId", logo, "createdAt", "updatedAt", "isActive")
          VALUES (
            'e1cf9fda-cab0-4109-a3d9-8adc190ad7e2',
            'A-MATE Sports',
            '1ca50e17-7e06-47a2-a7a8-2e4207d7a36f',
            '{"thumbnail": "", "large": ""}',
            NOW(),
            NOW(),
            true
          );
        `);

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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('teams');
    await queryRunner.dropTable('organizations');
  }
}
