import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertCharacterMigration implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS user (
        id int not null auto_increment primary key,
        userName varchar(255) not null ,
        password varchar(255) not null ,
        phone long,
        role varchar(255),
        email varchar(255)
      ) ENGINE=InnoDB;`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
