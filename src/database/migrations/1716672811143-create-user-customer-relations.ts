import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserCustomerRelations1716672811143 implements MigrationInterface {
    name = 'CreateUserCustomerRelations1716672811143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "customer_id_seq"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('"user_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "customer_id_seq" OWNED BY "customer"."id"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "id" SET DEFAULT nextval('"customer_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createdAt"`);
    }

}
