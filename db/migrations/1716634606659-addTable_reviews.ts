import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableReviews1716634606659 implements MigrationInterface {
    name = 'AddTableReviews1716634606659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review_entity" ("id" SERIAL NOT NULL, "ratings" integer NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "productId" integer, CONSTRAINT "PK_5a7a10bab252068bd06d10d49e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_ceb4e109201f618032fa5483d3f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_8ffb1a0a6126420cd14f8f28385" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_8ffb1a0a6126420cd14f8f28385"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_ceb4e109201f618032fa5483d3f"`);
        await queryRunner.query(`DROP TABLE "review_entity"`);
    }

}
