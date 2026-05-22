/*
  Warnings:

  - The primary key for the `MyPage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MyPage" DROP CONSTRAINT "MyPage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MyPage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MyPage_id_seq";
