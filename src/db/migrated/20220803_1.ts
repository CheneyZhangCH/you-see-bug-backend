import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertCharacterMigration implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci`,
    );
  }
}
