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
          { name: 'name', type: 'varchar' },
          {
            name: 'type',
            type: 'enum',
            enum: ['company', 'club', 'school', 'charity'],
          },
          { name: 'logo', type: 'jsonb', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'NOW()' },
          { name: 'updatedAt', type: 'timestamp', default: 'NOW()' },
          { name: 'isActive', type: 'boolean', default: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
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
          { name: 'name', type: 'varchar' },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'ageGroup', type: 'varchar', isNullable: true },
          { name: 'gender', type: 'varchar', isNullable: true },
          { name: 'logo', type: 'jsonb' },
          { name: 'organizationId', type: 'uuid' },
          { name: 'createdAt', type: 'timestamp', default: 'NOW()' },
          { name: 'updatedAt', type: 'timestamp', default: 'NOW()' },
          { name: 'isActive', type: 'boolean', default: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
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
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'role', type: 'varchar' },
          { name: 'organizationId', type: 'uuid' },
          { name: 'teamId', type: 'uuid', isNullable: true },
          { name: 'firstName', type: 'varchar', isNullable: true },
          { name: 'lastName', type: 'varchar', isNullable: true },
          { name: 'bio', type: 'text', isNullable: true },
          { name: 'avatar', type: 'jsonb', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'NOW()' },
          { name: 'updatedAt', type: 'timestamp', default: 'NOW()' },
          { name: 'isActive', type: 'boolean', default: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('teams');
    await queryRunner.dropTable('organizations');
  }
}
