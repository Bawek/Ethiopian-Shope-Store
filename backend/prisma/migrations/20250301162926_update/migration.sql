/*
  Warnings:

  - Made the column `name` on table `MyPage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MyPage" ALTER COLUMN "templateId" DROP DEFAULT,
ALTER COLUMN "name" SET NOT NULL;
DROP SEQUENCE "mypage_templateid_seq";

-- AddForeignKey
ALTER TABLE "MyPage" ADD CONSTRAINT "MyPage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Mytemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
