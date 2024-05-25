import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableReviews1716634716012 implements MigrationInterface {
    name = 'UpdateTableReviews1716634716012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Reviews" ("id" SERIAL NOT NULL, "ratings" integer NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "productId" integer, CONSTRAINT "PK_5ae106da7bc18dc3731e48a8a94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_03697b4cf2383ce44b9b0ac3fda" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_8679c285008ea7ff66b93edc0ac" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_8679c285008ea7ff66b93edc0ac"`);
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_03697b4cf2383ce44b9b0ac3fda"`);
        await queryRunner.query(`DROP TABLE "Reviews"`);
    }

}
