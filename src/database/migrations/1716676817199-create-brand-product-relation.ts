import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBrandProductRelation1716676817199 implements MigrationInterface {
    name = 'CreateBrandProductRelation1716676817199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createdAt"`);
    }

}