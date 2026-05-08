import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTeamIdFromMatch1746720000000 implements MigrationInterface {
  name = 'RemoveTeamIdFromMatch1746720000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "teamId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match" ADD COLUMN "teamId" character varying NOT NULL DEFAULT ''`,
    );
  }
}
