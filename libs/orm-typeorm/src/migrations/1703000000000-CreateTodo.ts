import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodo1703000000000 implements MigrationInterface {
  name = 'CreateTodo1703000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "typeorm"`);
    await queryRunner.query(
      `CREATE TABLE "typeorm"."todo" ("id" SERIAL NOT NULL, "content" character varying(100) NOT NULL, "complete" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_todo_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "typeorm"."todo"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "typeorm"`);
  }
}
