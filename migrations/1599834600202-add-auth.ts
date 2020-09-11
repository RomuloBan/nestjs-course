import {MigrationInterface, QueryRunner} from "typeorm";

export class addAuth1599834600202 implements MigrationInterface {
    name = 'addAuth1599834600202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(70)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
