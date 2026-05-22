/*
  Warnings:

  - You are about to drop the column `templateId` on the `Page` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_templateId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "templateId";
